import {Employee, Employees} from 'types/employees';
import {MESSAGE_ERROR} from 'reducers/employeeSlice';
import api from 'api';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ls from 'helpers/ls';

export type ResponseError = {
  status: number;
  title: string;
  traceId: string;
  type: string;
};

export type EmployeeResponse<T> = T | ResponseError;

export type EmployeesResponse = EmployeeResponse<Employees>

const initializeEmployee = createAsyncThunk<Employee[], void, {rejectValue: {error: string}}>(
  'app/initializeEmployee',
  async (_, thunkApi) => {
    try {
      let employees;

      const cachedEmployees = ls.getData();

      if (cachedEmployees?.entities) {
        employees = cachedEmployees.ids.map((id) => cachedEmployees.entities[id]);
      } else {
        const response = await api.app.getEmployees();

        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        employees = await response.json();
      }

      // Background request for updating a cache
      api.app.getEmployees()
        .then(response => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }

          return response.json();
        })
        .then(employees => {
          if (!Array.isArray(employees)) {
            throw new Error(JSON.stringify(employees));
          }

          ls.setData(employees);
          return employees;
        }).catch((e) => {
          console.error(e);
        });

      // when status 200 and error
      if (!Array.isArray(employees)) {
        throw new Error(JSON.stringify(employees));
      }

      ls.setData(employees);

      return employees;
    } catch (e) {
      const error = e as Error;
      console.error(error.message);
      return thunkApi.rejectWithValue({error: MESSAGE_ERROR});
    }
  }
);

const deleteEmployee = createAsyncThunk<string, string, { rejectValue: { error: string } }
>('app/deleteEmployee', async (id, thunkApi) => {
  try {
    api.app
      .deleteEmployees(id)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        ls.deleteEmployeeById(id);

        return response;
      })
      // TODO
      .catch((e) => {
        console.error(e);
      });

    return id;
  } catch (e) {
    const error = e as Error;
    console.error(error.message);
    return thunkApi.rejectWithValue({error: MESSAGE_ERROR});
  }
});
export {
  initializeEmployee,
  deleteEmployee
};

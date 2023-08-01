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
        employees = await api.app.getEmployees();
      }

      api.app.getEmployees().then(employees => {
        if (!Array.isArray(employees)) {
          throw new Error(JSON.stringify(employees));
        }

        ls.setData(employees);
        return employees;
      }).catch((e) => {
        console.error(e);
      });

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

export {
  initializeEmployee
};

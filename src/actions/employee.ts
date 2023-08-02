import {Employee, Employees} from 'types/employees';
import {MESSAGE_ERROR, actions} from 'reducers/employeeSlice';
import {State} from 'types';
import api from 'api';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ls from 'helpers/ls';
import {store} from '../index';

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

      if (cachedEmployees?.ids) {
        employees = cachedEmployees.ids.map((id) => cachedEmployees.entities[id]);
      } else {
        const response = await api.app.getEmployees();

        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        employees = await response.json();
      }

      // Background request for updating a cache
      api.app
        .getEmployees()
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }

          return response.json();
        })
        .then((employees) => {
          if (!Array.isArray(employees)) {
            throw new Error(JSON.stringify(employees));
          }

          ls.setData(employees);
          return employees;
        })
        .catch((e) => {
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

const deleteEmployee = createAsyncThunk<string, string, { rejectValue: { error: string }, state: State}
>('app/deleteEmployee', async (id, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const oldEmployee = state.employees.entities[id];

    api.app
      .deleteEmployee(id)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        ls.deleteEmployeeById(id);

        return response;
      })
      .catch((e) => {
        console.error(e);
        store.dispatch(actions.deleteEmployeeReject(oldEmployee));
      });

    return id;
  } catch (e) {
    const error = e as Error;
    console.error(error.message);
    return thunkApi.rejectWithValue({error: MESSAGE_ERROR});
  }
});

const addEmployee = createAsyncThunk<Employee, Employee, { rejectValue: { error: string } }
>('app/addEmployee', async (employee, thunkApi) => {
  try {
    api.app
      .addEmployee(employee)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        ls.addEmployee(employee);

        return response;
      })
      .catch((e) => {
        console.error(e);
        store.dispatch(actions.addEmployeeReject(employee));
      });

    return employee;
  } catch (e) {
    const error = e as Error;
    console.error(error.message);
    return thunkApi.rejectWithValue({error: MESSAGE_ERROR});
  }
});

const updateEmployee = createAsyncThunk<Employee, Employee, { rejectValue: { error: string }, state: State }
>('app/updateEmployee', async (employee, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const oldEmployee = state.employees.entities[employee.employeeId];

    api.app
      .updateEmployee(employee)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        ls.updateEmployee(employee);

        return response;
      })
      .catch((e) => {
        console.error(e);
        store.dispatch(actions.updateEmployeeReject(oldEmployee));
      });

    return employee;
  } catch (e) {
    const error = e as Error;
    console.error(error.message);
    return thunkApi.rejectWithValue({error: MESSAGE_ERROR});
  }
});

export {initializeEmployee, deleteEmployee, addEmployee, updateEmployee};

import {Employee, Employees} from 'types/employees';
import {MESSAGE_ERROR} from 'reducers/employeeSlice';
import api from 'api';
import {createAsyncThunk} from '@reduxjs/toolkit';

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
      const employees = await api.app.getEmployees();

      if (!Array.isArray(employees)) {
        throw new Error(JSON.stringify(employees));
      }

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

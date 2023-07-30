import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {Employee} from 'types/employees';
import {initializeEmployee} from 'actions/employee';
import {State} from 'types';

export const MESSAGE_ERROR = 'Что-то пошло не так...';

export const employeesAdapter = createEntityAdapter<Employee>({
  selectId: (employee) => employee.employeeId
});

export const initialState = employeesAdapter.getInitialState<{status: string; error: null | string}>({
  status: 'idle',
  error: null
});

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeEmployee.fulfilled, (state, action) => {
        employeesAdapter.upsertMany(state, action);
        state.status = 'succeeded';
      })
      .addCase(initializeEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initializeEmployee.rejected, (state, action) => {
        state.status = 'error';
        if (action.payload?.error) {
          state.error = action.payload?.error;
        }
      });
  }
});

export default employeeSlice.reducer;

export const actions = {...employeeSlice.actions, initializeEmployee};

export const {
  selectAll: selectAllEmployees,
  selectById: selectEmployeeById,
  selectIds: selectEmployeeIds

} = employeesAdapter.getSelectors((state: State) => state.employees);

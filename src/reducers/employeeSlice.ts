import {
  addEmployee,
  deleteEmployee,
  initializeEmployee,
  updateEmployee
} from 'actions/employee';
import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {Employee} from 'types/employees';

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
  initialState,
  reducers: {
    deleteEmployeeReject: (state, action) => {
      state.status = 'asyncReject';
      employeesAdapter.addOne(state, action.payload);
    },
    addEmployeeReject: (state, action) => {
      state.status = 'asyncReject';
      employeesAdapter.removeOne(state, action.payload);
    },
    updateEmployeeReject: (state, action) => {
      state.status = 'asyncReject';
      state.entities[action.payload.employeeId] = action.payload;
    }
  },
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
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        employeesAdapter.removeOne(state, action.payload);
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        employeesAdapter.addOne(state, action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.entities[action.payload.employeeId] = action.payload;
      });
  }
});

export default employeeSlice.reducer;

export const actions = {
  ...employeeSlice.actions,
  initializeEmployee,
  deleteEmployee,
  addEmployee,
  updateEmployee
};

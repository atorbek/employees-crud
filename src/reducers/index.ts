import {combineReducers} from 'redux';
import employees from 'reducers/employeeSlice';

export const root = combineReducers({
  employees
});

export default root;

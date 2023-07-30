import employees from './employees';
import {EmployeesResponse} from 'actions/employee';

type ApiType = {
  app: {
    getEmployees: () => Promise<EmployeesResponse>;
  };
};

const Api: ApiType = {
  app: {
    getEmployees: () => Promise.resolve(employees)
  }
};

export default Api;

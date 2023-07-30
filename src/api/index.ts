import {EmployeesResponse} from 'actions/employee';
// import {isDevelopmentMode, needStubs} from 'helpers/utils';
// import stubApi from 'stubs/api';

const URL = 'https://reactapi.bsite.net/api/Employee';

const initializeApi = () => {
  // if (isDevelopmentMode() && needStubs()) {
  //   return stubApi;
  // }

  return {
    app: {
      getEmployees: async (): Promise<EmployeesResponse> => {
        const employees = await fetch(URL);

        return employees.json();
      }
    }
  };
};

export default initializeApi();

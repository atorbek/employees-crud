import {EmployeeResponse, EmployeesResponse} from 'actions/employee';
import {Employee} from 'types/employees';
// import {isDevelopmentMode, needStubs} from 'helpers/utils';
// import stubApi from 'stubs/api';

const URL = 'https://reactapi.bsite.net/api/Employee';

const initializeApi = () => {
  // if (isDevelopmentMode() && needStubs()) {
  //   return stubApi;
  // }

  return {
    app: {
      getEmployees: async (): Promise<Response> => {
        const employees = await fetch(URL);

        return employees;
      },
      deleteEmployees: async (id: string): Promise<Response> => {
        const response = await fetch(URL + '/' + id, {
          method: 'DELETE'
        });

        return response;
      },
      updateEmployees: async (id: string): Promise<Response> => {
        const response = await fetch(URL + '/' + id, {
          method: 'PUT'
        });

        return response;
      },
      addEmployees: async (employee: Employee): Promise<Response> => {
        const response = await fetch(URL, {
          method: 'POST',
          body: JSON.stringify(employee)
        });

        return response;
      }
    }
  };
};

export default initializeApi();

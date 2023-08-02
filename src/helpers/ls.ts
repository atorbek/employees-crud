import {Employee, Employees} from 'types/employees';
import {WrappedStateObjects} from 'types';

const APP_NAME = 'employees-crud';

const getData = (): WrappedStateObjects<Employee> => {
  const lsData = localStorage.getItem(APP_NAME) || '{}';
  return JSON.parse(lsData);
};

const setData = (employees: Employees) => {
  const normalizedData = employees.reduce<WrappedStateObjects<Employee>>(
    (acc, employee) => {
      acc.entities[`${employee.employeeId}`] = employee;
      acc.ids.push(`${employee.employeeId}`);

      return acc;
    },
    {entities: {}, ids: []}
  );

  localStorage.setItem(APP_NAME, JSON.stringify(normalizedData));
};

const addEmployee = (employee: Employee) => {
  const data = getData();

  data.entities[employee.employeeId] = employee;
  data.ids.push(`${employee.employeeId}`);

  localStorage.setItem(APP_NAME, JSON.stringify(data));
};

const deleteEmployeeById = (id: string) => {
  const data = getData();

  if (data.entities[id]) {
    delete data.entities[id];
    data.ids = data.ids.filter((eId) => eId !== `${id}`);
  }

  localStorage.setItem(APP_NAME, JSON.stringify(data));
};

const updateEmployee = (employee: Employee) => {
  const data = getData();
  data.entities[employee.employeeId] = employee;

  localStorage.setItem(APP_NAME, JSON.stringify(data));
};

export default {
  getData,
  setData,
  addEmployee,
  updateEmployee,
  deleteEmployeeById
};

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

const addEmployeeById = (id: string, employee: Employee) => {
  const data = getData();

  data.entities[id] = employee;
  data.ids.push(id);

  localStorage.setItem(APP_NAME, JSON.stringify(data));
};

const deleteEmployeeById = (id: string) => {
  const data = getData();

  if (data.entities[id]) {
    delete data.entities[id];
    data.ids.filter(eId => eId !== id);
  }

  localStorage.setItem(APP_NAME, JSON.stringify(data));
};

const updateEmployeeById = (id: string, employee: Employee) => {
  const data = getData();
  data.entities[id] = employee;

  localStorage.setItem(APP_NAME, JSON.stringify(data));
};

export default {
  getData,
  setData,
  addEmployeeById,
  deleteEmployeeById,
  updateEmployeeById
};

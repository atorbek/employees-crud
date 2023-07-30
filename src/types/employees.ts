
export type Employee = {
  employeeId: number;
  firstName: string;
  lastName: string;
  birthday: string;
  height: number;
  [key: string]: any;
};

export type Employees = Employee[];

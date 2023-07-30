import React, {FC} from 'react';
import useAppData from 'hooks/useAppData';

const App: FC = () => {
  const employees = useAppData();

  const renderRow = (employeeId: string) => {
    const employee = employees.entities[employeeId];

    return (
      <tr key={employeeId}>
        {Object.keys(employee).map((prop, i) => <td key={i}>{employee[prop]}</td>)}
      </tr>
    );
  };

  const renderHead = () => {
    const employee = employees.entities[0];

    if (employee) {
      return Object.keys(employee[0])
        .map((prop, i) => <th key={i}>{prop}</th>);
    }
  };

  const renderBody = () => {
    return employees.ids.map(renderRow);
  };

  if (employees.status === 'reject') {
    return <>Что-то пошло не так...</>;
  }

  if (employees.status === 'loading') {
    return <>Загрузка пользователей...</>;
  }

  if (!employees.ids.length) {
    return <>Список пользователей пустой</>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>{renderHead()}</tr>
        </thead>
        <tbody>
          {renderBody()}
        </tbody>
      </table>
    </div>
  );
};

export default App;

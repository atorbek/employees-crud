import {
  Table as ChakraTable,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import React, {FC} from 'react';
import {Props} from './types';

const Table: FC<Props> = ({employees}) => {
  const renderRow = (employeeId: string) => {
    const employee = employees.entities[employeeId];

    return (
      <Tr key={employeeId}>
        {Object.keys(employee).map((prop, i) => <Td key={i}>{employee[prop]}</Td>)}
      </Tr>
    );
  };

  const renderHead = () => {
    const employee = employees.entities[0];

    if (employee) {
      return Object.keys(employee[0])
        .map((prop, i) => <Th key={i}>{prop}</Th>);
    }
  };

  const renderBody = () => {
    return employees.ids.map(renderRow);
  };

  return (
    <TableContainer>
      <ChakraTable size='sm'>
        <TableCaption>Employees</TableCaption>
        <Thead>
          {renderHead()}
        </Thead>
        <Tbody>
          {renderBody()}
        </Tbody>
        <Tfoot>
          {renderHead()}
        </Tfoot>
      </ChakraTable>
    </TableContainer>
  );
};

export default Table;

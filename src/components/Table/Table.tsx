import {
  Table as ChakraTable,
  Icon,
  IconButton,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead
  , Tr
} from '@chakra-ui/react';
import React, {FC} from 'react';
import {MdOutlineModeEditOutline} from 'react-icons/md';
import {IoIosClose} from 'react-icons/io';
import {Props} from './types';
import { Tooltip } from '@chakra-ui/react'


const Table: FC<Props> = ({employees}) => {
  const renderRow = (employeeId: string) => {
    const employee = employees.entities[employeeId];

    return (
      <Tr key={employeeId}>
        {Object.keys(employee).map((prop, i) => <Td key={i}>{employee[prop]}</Td>)}
        <Td>
          <Tooltip label='Edit employee'>
          <IconButton
            isRound={true}
            size='sm'
            variant='outline'
            aria-label='Done'
            fontSize='20px'
            colorScheme="orange"
            mr="5px"
            icon={<Icon as={MdOutlineModeEditOutline} />}
          />
          </Tooltip>
          <Tooltip label='Delete employee'>
            <IconButton
              isRound={true}
              size='sm'
              variant='outline'
              aria-label='Done'
              fontSize='20px'
              colorScheme="red"
              icon={<Icon as={IoIosClose} />}
            />
          </Tooltip>
         
          </Td>
      </Tr>
    );
  };

  const renderHead = () => {
    const employeeId = employees.ids[0];
    const employee = employees.entities[employeeId];

    if (employee) {
      return Object.keys(employee)
        .map((prop, i) => <Th key={i}>{prop}</Th>)
    }
  };

  const renderBody = () => {
    return employees.ids
      .map(renderRow);
  };

  return (
    <TableContainer>
      <ChakraTable size='sm'>
        <TableCaption>Employees</TableCaption>
        <Thead>
          {renderHead()}
          <Th>Actions</Th>
        </Thead>
        <Tbody>
          {renderBody()}
        </Tbody>
        <Tfoot>
          {renderHead()}
          <Th>Actions</Th>
        </Tfoot>
      </ChakraTable>
    </TableContainer>
  );
};

export default Table;

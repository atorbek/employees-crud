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
  , Tooltip
  , Tr
} from '@chakra-ui/react';
import React, {FC} from 'react';
import {IoIosClose} from 'react-icons/io';
import {MdOutlineModeEditOutline} from 'react-icons/md';
import {Props} from './types';
import {actions} from 'reducers/employeeSlice';
import {useDispatch} from 'react-redux';

const Table: FC<Props> = ({employees}) => {
  const dispatch = useDispatch();

  const handleDeleteEmployee = (id: string) => () => {
    dispatch(actions.deleteEmployee(id));
  };

  const renderRow = (employeeId: string) => {
    const employee = employees.entities[employeeId];

    return (
      <Tr key={employeeId}>
        {Object.keys(employee).map((prop, i) => <Td key={i}>{employee[prop]}</Td>)}
        <Td>
          <Tooltip label='Edit employee'>
            <IconButton
              aria-label='Done'
              colorScheme="orange"
              fontSize='20px'
              icon={<Icon as={MdOutlineModeEditOutline} />}
              isRound={true}
              mr="5px"
              size='sm'
              variant='outline'
            />
          </Tooltip>
          <Tooltip label='Delete employee'>
            <IconButton
              aria-label='Done'
              colorScheme="red"
              fontSize='20px'
              icon={<Icon as={IoIosClose} />}
              isRound={true}
              size='sm'
              variant='outline'
              onClick={handleDeleteEmployee(employeeId)}
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
        .map((prop, i) => <Th key={i}>{prop}</Th>);
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
          <Tr>
            {renderHead()}
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {renderBody()}
        </Tbody>
        <Tfoot>
          <Tr>
            {renderHead()}
            <Th>Actions</Th>
          </Tr>
        </Tfoot>
      </ChakraTable>
    </TableContainer>
  );
};

export default Table;

import {
  Alert,
  AlertIcon,
  Center,
  HStack,
  Icon,
  IconButton,
  Input,
  Spinner,
  Tooltip,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import React, {FC, useState} from 'react';
import {Employee} from 'types/employees';
import {IoIosAdd} from 'react-icons/io';
import Modal from 'components/Modal';
import Table from 'components/Table';
import {actions} from 'reducers/employeeSlice';
import useAppData from 'hooks/useAppData';
import {useDispatch} from 'react-redux';

const App: FC = () => {
  const dispatch = useDispatch();
  const employees = useAppData();

  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    height: 0,
    employeeId: 0
  });

  const {isOpen, onOpen, onClose} = useDisclosure();

  const [actionType, setActionType] = useState<'add' | 'update'>('add');

  const handleSave = (employee: Employee) => {
    if (actionType === 'add') {
      // @ts-ignore
      dispatch(actions.addEmployee(employee));
    } else if (actionType === 'update') {
      // @ts-ignore
      dispatch(actions.updateEmployee(employee));
    }

    onClose();
  };

  const handleAddEmployee = () => {
    setActionType('add');
    onOpen();
  };

  const handleUpdateEmployee = (employee: Employee) => {
    setEmployee(employee);
    setActionType('update');
    onOpen();
  };

  const renderModal = () => {
    return (
      <Modal
        employee={employee}
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleSave}
      />
    );
  };

  const renderAlertError = () => {
    if (employees.status === 'asyncReject') {
      return (
        <Alert status='error'>
          <AlertIcon />
          Something wrong with employees actions..
        </Alert>
      );
    }
  };

  if (employees.status === 'reject') {
    return (
      <Center h='100px'>
        Что-то пошло не так...
      </Center>
    );
  }

  if (employees.status === 'loading') {
    return (
      <Center h='100px'>
        <Spinner size='md' />
      </Center>
    )
    ;
  }

  if (!employees.ids.length) {
    return (
      <Center h='100px'>
        <Spinner size='md' />
      </Center>
    );
  }

  return (
    <>
      {renderModal()}
      <VStack
        align='center'
        mt="20px"
        spacing={4}
      >
        <HStack spacing={2}>
          <Tooltip label='Add employee'>
            <IconButton
              aria-label='Done'
              colorScheme="green"
              fontSize='20px'
              icon={<Icon as={IoIosAdd} />}
              isRound={true}
              size='sm'
              variant='outline'
              onClick={handleAddEmployee}
            />
          </Tooltip>
          <Input
            borderRadius="full"
            placeholder='Search by name'
            size="sm"
          />
        </HStack>
        {renderAlertError()}
        <Table
          employees={employees}
          onUpdateEmployee={handleUpdateEmployee}/>
      </VStack>
    </>
  );
};

export default App;

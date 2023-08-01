import {
  Center,
  HStack,
  Icon,
  IconButton,
  Input,
  Spinner,
  Tooltip,
  VStack
} from '@chakra-ui/react';
import React, {FC, useState} from 'react';
import {IoIosAdd} from 'react-icons/io';
import Modal from 'components/Modal';
import Table from 'components/Table';
import useAppData from 'hooks/useAppData';

const App: FC = () => {
  const employees = useAppData();

  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
  };

  const handleClose = () => {
    setIsModal(false);
  };

  const renderModal = () => {
    if (isModal) {
      return (
        <Modal
          isOpen={isModal}
          onClose={handleClose}
        />
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
              onClick={openModal}
            />
          </Tooltip>
          <Input
            borderRadius="full"
            placeholder='Search by name'
            size="sm" />
        </HStack>
        <Table employees={employees} />
      </VStack>
    </>
  );
};

export default App;

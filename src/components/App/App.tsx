import {Button, Center, HStack, Icon, IconButton, Input, Spinner, Stack, VStack} from '@chakra-ui/react';
import React, {FC} from 'react';
import Table from 'components/Table';
import useAppData from 'hooks/useAppData';
import { IoIosAdd } from 'react-icons/io';


const App: FC = () => {
  const employees = useAppData();

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
    <VStack 
    mt="20px"
    spacing={4}
    align='center'
    >
      <HStack spacing={4}>
        <IconButton
          isRound={true}
          size='sm'
          variant='outline'
          aria-label='Done'
          fontSize='20px'
          colorScheme="green"
          icon={<Icon as={IoIosAdd} />}
        />
        <Input placeholder='Basic usage' size="sm" borderRadius="full" />
      </HStack>
      <Table employees={employees} />
    </VStack>
);
};

export default App;

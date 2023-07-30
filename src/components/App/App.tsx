import {Center, Spinner} from '@chakra-ui/react';
import React, {FC} from 'react';
import Table from 'components/Table';
import useAppData from 'hooks/useAppData';

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
    <Table employees={employees}/>
  );
};

export default App;

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  Modal as ModalChakra,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Employee} from 'types/employees';
import {Props} from './types';

const Modal: FC<Props> = ({isOpen, onSave, onClose, employee}) => {
  console.log(employee);
  const [employeeFields, setEmployeeFields] = useState<Employee>(employee);

  useEffect(() => {
    setEmployeeFields(employee);
  }, [employee]);

  const handleSave = () => {
    onSave(employeeFields);
  };

  const handleChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    let value: number | string = e.target.value;

    if (name === 'height') {
      value = +value;
    }

    setEmployeeFields({...employeeFields, [name]: value});
  };

  return (
    <ModalChakra
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Employee</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>First name</FormLabel>
            <Input
              placeholder='First name'
              value={employeeFields.firstName}
              onChange={handleChange('firstName')}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Last name</FormLabel>
            <Input
              placeholder='Last name'
              value={employeeFields.lastName}
              onChange={handleChange('lastName')}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Birthday</FormLabel>
            <Input
              placeholder='Birthday'
              type='date'
              value={employeeFields.birthday}
              onChange={handleChange('birthday')}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Height</FormLabel>
            <Input
              placeholder='Height'
              type='number'
              value={employeeFields.height || ''}
              onChange={handleChange('height')}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='blue'
            mr={3}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </ModalChakra>
  );
};

export default Modal;

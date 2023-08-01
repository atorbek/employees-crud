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
import React, {FC} from 'react';
import {Props} from './types';

const Modal: FC<Props> = ({isOpen, onClose, employee = null}) => {
  return (
    <ModalChakra
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add or update employee</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>First name</FormLabel>
            <Input placeholder='First name'/>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Last name</FormLabel>
            <Input placeholder='Last name' />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Birthday</FormLabel>
            <Input placeholder='Birthday' />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Height</FormLabel>
            <Input placeholder='Height' />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='blue'
            mr={3}>
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </ModalChakra>
  );
};

export default Modal;

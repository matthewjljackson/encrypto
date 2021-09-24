import * as React from 'react';
import { FaSun, FaMoon } from "react-icons/fa";
import { Box, Heading, HStack } from '@chakra-ui/layout';
import { IconButton, useColorMode } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  // ModalHeader,
  // ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

interface IModalProps {
}

const Register: React.FunctionComponent<IModalProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button mr={{ base: 0, sm: '1rem', md: '2rem'}} onClick={onOpen} fontSize={{ base: 'sm', sm: 'lg', md: 'xl'}}>register</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <Button>close</ Button>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Register;

import * as React from 'react';
import { FaSun, FaMoon } from "react-icons/fa";
import { Box, Heading, HStack } from '@chakra-ui/layout';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
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

const Login: React.FunctionComponent<IModalProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bgColor = useColorModeValue('whiteAlpha', 'gray.800');
  const fontColor = useColorModeValue('black', 'whiteAlpha');
  return (
    <>
      <Button mr={{ base: 0, sm: '0.8rem', md: '1.5rem'}} fontSize={{ base: 'sm', sm: 'lg', md: 'xl'}} onClick={onOpen} textColor={fontColor} colorScheme={bgColor}>login</Button>

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

export default Login;

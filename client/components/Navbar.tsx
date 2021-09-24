import { FaSun, FaMoon } from "react-icons/fa";
import * as React from 'react';
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
import Modal1 from "./Modal";


interface INavbarProps {
}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  // const { user, setUser } = useContext(UserContext);
  const { colorMode, toggleColorMode } = useColorMode();
  // const [ successful, setSuccessful ] = React.useState(false);
  // console.log(onClose)
  return (
    <HStack mt={3} mb={3} justify={'space-between'} >
      <Heading ml='2rem' >Encrypto</Heading>
      <Box>
        <IconButton
          onClick={toggleColorMode}
          aria-label="{ icon: Element; }"
          icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
          isRound={true}
          size="lg"
          mr='2rem'
          // bgColor='teal'
        />
      
      <Modal1 />
    </Box>
    </HStack>
  );
};

export default Navbar;

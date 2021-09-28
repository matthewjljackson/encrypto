import { FaSun, FaMoon } from "react-icons/fa";
import { IconButton, useColorMode, Button } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { Heading, HStack, Spacer, Text } from '@chakra-ui/layout';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import Logout from "./Logout";

interface INavbarProps {
}

const Navbar: FunctionComponent<INavbarProps> = (props) => {

  const { colorMode, toggleColorMode } = useColorMode();
  const { user, setUser } = useContext(UserContext);

  return (
    <HStack w='100%' mt={3} pb={3} mb={3} justify='space-between' borderBottom='2px' borderColor="gray.200">
      <Heading fontSize={{ base: 'lg', sm: '2xl', md: '4xl'}} ml={{ base: 0, sm: '1rem', md: '2rem'}} >Encrypto</Heading>
      <HStack>
        <Text fontWeight='bold' fontStyle='italic'>welcome {user.username}</ Text>
        <Spacer />
        <Logout />
        <IconButton onClick={toggleColorMode} aria-label="{ icon: Element; }" icon={colorMode === "light" ? <FaMoon /> : <FaSun />} isRound={true} mr={{ base: 0, sm: '1rem', md: '2rem'}} size='lg' />
      </HStack>
    </HStack>
  );
};

export default Navbar;

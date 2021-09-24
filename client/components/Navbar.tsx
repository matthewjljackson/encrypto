import { FaSun, FaMoon } from "react-icons/fa";
import { FunctionComponent } from 'react';
import { Box, Heading, HStack } from '@chakra-ui/layout';
import { IconButton, useColorMode } from '@chakra-ui/react';
import Login from "./Login";
import Register from "./Register";

interface INavbarProps {
}

const Navbar: FunctionComponent<INavbarProps> = (props) => {

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack mt={3} pb={3} mb={3} justify='space-between' borderBottom='2px' borderColor="gray.200">
      <Heading fontSize={{ base: 'lg', sm: '2xl', md: '4xl'}} ml={{ base: 0, sm: '1rem', md: '2rem'}} >Encrypto</Heading>
      <Box>
        <IconButton onClick={toggleColorMode} aria-label="{ icon: Element; }" icon={colorMode === "light" ? <FaSun /> : <FaMoon />} isRound={true} mr={{ base: 0, sm: '1rem', md: '2rem'}} size='lg' />
      <Login />
      <Register />
    </Box>
    </HStack>
  );
};

export default Navbar;

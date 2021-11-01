import { FaSun, FaMoon } from 'react-icons/fa';
import { FunctionComponent } from 'react';
import { Box, Heading, HStack } from '@chakra-ui/layout';
import { IconButton, useColorMode } from '@chakra-ui/react';
import Login from './Login';
import Register from './Register';

const Navbar: FunctionComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack
      w='100%'
      mt={3}
      pb={3}
      mb={3}
      justify='space-between'
      borderBottom='2px'
      borderColor='gray.200'>
      <Heading
        fontSize={{ base: 'lg', sm: '2xl', md: '4xl' }}
        ml={{ base: 0, sm: '1rem', md: '2rem' }}>
        Encrypto
      </Heading>
      <Box>
        <Login />
        <Register />
        <IconButton
          onClick={toggleColorMode}
          aria-label='{ icon: Element; }'
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          isRound={true}
          mr={{ base: 0, sm: '1rem', md: '2rem' }}
          size='lg'
        />
      </Box>
    </HStack>
  );
};

export default Navbar;

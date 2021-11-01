import { FunctionComponent, useState, FormEvent } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { useContext } from 'react';
import { Heading, VStack } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { UserContext } from '../context/UserContext';

const Register: FunctionComponent = () => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState("We'll never share your data.");
  const [messageColor, setMessageColor] = useState('gray');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const tealColor = useColorModeValue('teal.500', '#81E6D9');
  const textColor = useColorModeValue('white', 'black');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setUser({ username: data.username, id: data.id });
          onClose();
          setPassword('');
          setUsername('');
          setMessage("We'll never share your data.");
          setMessageColor('gray');
          router.push('/dashboard');
        } else if (data.errors.username) {
          setMessage(data.errors.username);
          setMessageColor('red');
        } else if (data.errors.password) {
          setPassword('');
          setMessage(data.errors.password);
          setMessageColor('red');
        }
      })
      .catch((err) => console.log('blah', err));
  }

  return (
    <>
      <Button
        mr={{ base: 0, sm: '0.8rem', md: '1.5rem' }}
        fontSize={{ base: 'sm', sm: 'lg', md: 'xl' }}
        onClick={onOpen}>
        register
      </Button>

      <Modal
        isOpen={isOpen}
        isCentered
        onClose={() => {
          onClose();
          setMessage("We'll never share your data.");
          setMessageColor('gray');
          setPassword('');
          setUsername('');
        }}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={(e) => handleSubmit(e)}>
              <VStack mt='1rem' borderRadius='0.5rem' spacing={4} pt='15' pb='30' maxW='400'>
                <Heading>Register</Heading>
                <FormControl id='username' isRequired w='70%'>
                  <FormLabel>Username</FormLabel>
                  <Input
                    borderColor='teal'
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl id='password' isRequired w='70%'>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type='password'
                    value={password}
                    borderColor='teal'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FormHelperText color={messageColor}>{message}</FormHelperText>
                </FormControl>
                <Button type='submit' textColor={textColor} bgColor={tealColor}>
                  create account
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Register;

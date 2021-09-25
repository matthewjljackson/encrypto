import { FunctionComponent, useState, FormEvent } from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Heading, VStack } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { Button, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { IUser } from '../interfaces/IUser';
import { useRouter } from 'next/router';

interface ILoginProps {
}

const Login: FunctionComponent<ILoginProps> = (props) => {

  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState("We'll never share your data.");
  const [messageColor, setMessageColor] = useState("gray");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('whiteAlpha', 'gray.800');
  const fontColor = useColorModeValue('black', 'whiteAlpha');

  function handleSubmit(e:FormEvent) {
    e.preventDefault();
    fetch('http://localhost:3001/login', {
      credentials: "include",
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.id) {
        setUser({username: data.username, id: data.id})
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
    .catch(err => console.log('blah',err))
  }
  console.log(user)

  return (
    <>
      <Button mr={{ base: 0, sm: '0.8rem', md: '1.5rem'}} fontSize={{ base: 'sm', sm: 'lg', md: 'xl'}} onClick={onOpen} textColor={fontColor} colorScheme={bgColor}>login</Button>

      <Modal isOpen={isOpen} isCentered onClose={() => {onClose(); setMessage("We'll never share your data.");setMessageColor('gray');setPassword(''); setUsername('');}}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={(e) => handleSubmit(e)}>
              <VStack mt='1rem'  borderRadius='0.5rem' spacing={4} pt='15' pb='30' maxW='400' >
                <Heading>Login</Heading>
                <FormControl id="username" isRequired  w='70%'>
                  <FormLabel>Username</FormLabel>
                  <Input borderColor='teal'type="text"  value={username} onChange={(e)=>setUsername(e.target.value)} />
                </FormControl>
                <FormControl id="password" isRequired w='70%'>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" value={password} borderColor='teal' onChange={(e)=>setPassword(e.target.value)}/>
                  <FormHelperText color={messageColor}>{message}</FormHelperText>
              </FormControl>
              <Button type='submit' colorScheme='teal'>Sign in</Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;

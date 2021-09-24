import { FunctionComponent, useState, FormEvent } from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useContext } from 'react';
import { Heading, VStack } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { Button, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';


interface IModalProps {
}

const Register: FunctionComponent<IModalProps> = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loadState, setLoadState] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  function handleSubmit(e:FormEvent) {
    e.preventDefault();
    console.log(username, password);
    setPassword('');
    setUsername('');
  }
  return (
    <>
      <Button mr={{ base: 0, sm: '0.8rem', md: '1.5rem'}} fontSize={{ base: 'sm', sm: 'lg', md: 'xl'}} onClick={onOpen}>register</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={(e) => handleSubmit(e)}>
              <VStack mt='1rem'  borderRadius='0.5rem' spacing={4} pt='15' pb='30' maxW='400' >
                <Heading>Register</Heading>
                <FormControl id="username" isRequired  w='70%'>
                  <FormLabel>Username</FormLabel>
                  <Input borderColor='teal'type="text"  value={username} onChange={(e)=>setUsername(e.target.value)} />
                </FormControl>
                <FormControl id="password" isRequired w='70%'>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" value={password} borderColor='teal' onChange={(e)=>setPassword(e.target.value)}/>
                  <FormHelperText>We'll never share your data.</FormHelperText>
              </FormControl>
              <Button type='submit' isLoading={loadState} loadingText='creating account' onClick={onClose} colorScheme='teal'>create account</Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Register;

import { FunctionComponent } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Button} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { VStack, HStack, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/router';

interface ILogoutProps {
}

const Logout: FunctionComponent<ILogoutProps> = (props) => {

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleClick () {
    router.push('/');
  }

  return (
    <>
      <Button mr={{ base: 0, sm: '0.8rem', md: '1.5rem'}} fontSize={{ base: 'sm', sm: 'lg', md: 'xl'}} onClick={onOpen}>logout</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pt='30' pb='30'>
            <VStack spacing={50}>
              <Text fontSize='xl' fontWeight='bold' pt={10}>Are you sure you would like to logout?</Text>
              <HStack spacing={20}>
                <Button fontWeight='bold' w='90%' size='lg' onClick={handleClick}>Yes</Button>
                <Button fontWeight='bold' size='lg' w='90%' onClick={onClose}>No</Button>
              </ HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Logout;

import { useState, FunctionComponent } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button, IconButton, FormControl, FormLabel, FormHelperText
} from "@chakra-ui/react";
import { FaTimes, FaPlus } from "react-icons/fa";
import { Heading, VStack, HStack } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
// import { Button, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';


interface INewPositionProps {
}

const NewPosition: FunctionComponent<INewPositionProps> = (props) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [symbol, setSymbol] = useState('');
  const [openPrice, setOpenPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  function handleSubmit() {

  }

  return (
    <>
      <IconButton aria-label="{ icon: Element; }" onClick={onOpen} icon={<FaPlus />} colorScheme='blue' size='sm' />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add position</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
          <form onSubmit={() => handleSubmit()}>
                {/* <Heading>Add position</Heading> */}
              <VStack pb='2rem'>
                <HStack mt='1rem'  borderRadius='0.5rem' spacing={4} pt='15' pb='30' maxW='400' >
                  <FormControl id="symbol" isRequired>
                    <FormLabel>Symbol</FormLabel>
                    <Input borderColor='teal'type="text"  value={symbol} onChange={(e)=>setSymbol(e.target.value)} />
                  </FormControl>
                  <FormControl id="openPrice" isRequired>
                    <FormLabel>Open price</FormLabel>
                    <Input type="text" value={openPrice} borderColor='teal' onChange={(e)=>setOpenPrice(e.target.value)}/>
                    {/* <FormHelperText color={messageColor}>{message}</FormHelperText> */}
                </FormControl>
                <FormControl id="quantity" isRequired>
                    <FormLabel>Quantity</FormLabel>
                    <Input borderColor='teal'type="text"  value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
                  </FormControl>
                </HStack>
                <Button type='submit' onClick={onClose}  colorScheme='teal'>Add</Button>
              </VStack >
            </form>

          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
};

export default NewPosition;

import { useState, FunctionComponent, FormEvent } from 'react';
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
import { FaPlus } from "react-icons/fa";
import { VStack, HStack } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



interface INewPositionProps {
  setNewEntry: any,
  newEntry: number
}

const NewPosition: FunctionComponent<INewPositionProps> = ({ setNewEntry, newEntry }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [symbol, setSymbol] = useState('');
  const [openPrice, setOpenPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  function handleSubmit(e:FormEvent) {
    e.preventDefault();
    console.log({ symbol, openPrice, quantity, startDate: startDate.getTime() })
    fetch('http://localhost:3001/coins', {
      credentials: "include",
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ symbol, openPrice, quantity, startDate: startDate.getTime() })
    })
    .then(res => res.json())
    .then(data => {
        onClose();
        setSymbol('');
        setOpenPrice('');
        setQuantity('');
        setStartDate(new Date());
        setNewEntry(newEntry + 1);
    })
    .catch(err => console.log('blah',err))
  }

  return (
    <>
      <IconButton aria-label="{ icon: Element; }" onClick={onOpen} icon={<FaPlus />} colorScheme='blue' size='sm' />

      <Modal isOpen={isOpen} onClose={() => {onClose(); setSymbol(''); setOpenPrice(''); setQuantity(''); setStartDate(new Date())}} isCentered>
        <ModalOverlay />
        <ModalContent maxW="56rem">
          <ModalHeader>Add position</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
          <form onSubmit={(e) => handleSubmit(e)}>
              <VStack pb='2rem'>
                <HStack mt='1rem'  borderRadius='0.5rem' spacing={4} pt='15' pb='30' mr={0}>
                  <FormControl id="symbol" isRequired>
                    <FormLabel>Symbol</FormLabel>
                    <Input borderColor='teal'type="text" w='10rem'  value={symbol} onChange={(e)=>setSymbol(e.target.value)} />
                  </FormControl>
                  <FormControl id="openPrice" isRequired>
                    <FormLabel>Open price</FormLabel>
                    <Input w='10rem' type="text" value={openPrice} borderColor='teal' onChange={(e)=>setOpenPrice(e.target.value)}/>
                  </FormControl>
                  <FormControl id="quantity" isRequired>
                    <FormLabel>Quantity</FormLabel>
                    <Input w='10rem' borderColor='teal'type="text"  value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
                  </FormControl>
                  <FormControl id="quantity" isRequired>
                    <FormLabel>Open date</FormLabel>
                    <Input w='10rem' borderColor='teal' as={DatePicker} selected={startDate} onSelect={(date:any) => setStartDate(date)} />
                  </FormControl>
                </HStack>
                <Button type='submit' onClick={onClose} w='8rem' colorScheme='teal'>Add</Button>
              </VStack >
            </form>

          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
};

export default NewPosition;

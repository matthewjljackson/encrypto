import * as React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { FaTimes, FaPlus } from "react-icons/fa";
import { IconButton, useColorMode, Button } from '@chakra-ui/react';
import NewPosition from './NewPosition';

interface IPositionsTableProps {
}

const PositionsTable: React.FunctionComponent<IPositionsTableProps> = (props) => {

  function handleClick() {
    console.log('hello')
  }

  return (
    <Table variant="striped" colorScheme="teal">
  <TableCaption>Your positions</TableCaption>
  <Thead>
    <Tr>
      <Th>Symbol</Th>
      <Th>last price</Th>
      <Th>open price</Th>
      <Th>last date</Th>
      <Th>quantity</Th>
      <Th>value</Th>
      <Th>P/L(%)</Th>
      <Th>
      <NewPosition />
      </Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>feet</Td>
      <Td>centimetres (cm)</Td>
      <Td isNumeric>30.48</Td>
      <Td>centimetres (cm)</Td>
      <Td isNumeric>30.48</Td>
      <Td>centimetres (cm)</Td>
      <Td isNumeric>30.48</Td>
      <Td>
      <IconButton aria-label="{ icon: Element; }" onClick={handleClick} icon={<FaTimes/>} colorScheme='red' size='sm' />
      </Td>
    </Tr>
    <Tr>
      <Td>feet</Td>
      <Td>centimetres (cm)</Td>
      <Td isNumeric>30.48</Td>
      <Td>centimetres (cm)</Td>
      <Td isNumeric>30.48</Td>
      <Td>centimetres (cm)</Td>
      <Td isNumeric>30.48</Td>
      <Td>
      <IconButton aria-label="{ icon: Element; }" onClick={handleClick} icon={<FaTimes />} colorScheme='red' size='sm' />
      </Td>
    </Tr>
    <Tr>
      <Td>feet</Td>
      <Td>centimetres (cm)</Td>
      <Td isNumeric>30.48</Td>
      <Td>centimetres (cm)</Td>
      <Td isNumeric>30.48</Td>
      <Td>centimetres (cm)</Td>
      <Td isNumeric>30.48</Td>
      <Td>
      <IconButton aria-label="{ icon: Element; }" onClick={handleClick} icon={<FaTimes />} colorScheme='red' size='sm' />
      </Td>
    </Tr>
  </Tbody>
</Table>
  );
};

export default PositionsTable;

import { FunctionComponent} from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { FaTimes, FaPlus } from "react-icons/fa";
import { IconButton, useColorMode, Button, useColorModeValue } from '@chakra-ui/react';
import NewPosition from './NewPosition';
import { ICoin } from '../interfaces/ICoin';
import { Text, HStack } from '@chakra-ui/react'

interface IPositionsTableProps {
  coins:ICoin[],
  userCoins: any,
  setNewEntry: any,
  newEntry: number
}

const PositionsTable: FunctionComponent<IPositionsTableProps> = ({ newEntry, setNewEntry, userCoins }) => {

  const greenColor = useColorModeValue('green','#9AE6B4');
  const redColor = useColorModeValue('red','#FEB2B2' );

  function commafy( num:number ) {
    let str = num.toString().split('.');
    if (str[0].length >= 3) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return str.join('.');
  }

  function twoDecimalPlaces(num: number) {
    return Math.round(num * 100) / 100
  }

  function handleClick(coin:any) {
    console.log(coin)
    fetch('http://localhost:3001/coins', {
      credentials: "include",
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ _id: coin._id })
    })
    .then(res => res.json())
    .then((data:any) => setNewEntry(newEntry + 1))
    .catch(err => console.log('blah',err))
  }
  return (
    <Table variant="striped" colorScheme="gray">
      <TableCaption>Your positions</TableCaption>
      <Thead>
        <Tr>
          <Th>Symbol</Th>
          <Th>last price</Th>
          <Th>open price</Th>
          <Th>open date</Th>
          <Th>quantity</Th>
          <Th>value</Th>
          <Th>P/L(%)</Th>
          <Th>
          <NewPosition newEntry={newEntry} setNewEntry={setNewEntry} />
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {userCoins && userCoins.map((coinData:any) => {
          const date = new Date(coinData.timestamp);
          const currentValue = coinData.quantity * coinData.lastPrice;
          const openValue = coinData.quantity * coinData.openPrice;
          const percentChange = (currentValue-openValue)/openValue*100
          return (<Tr key={coinData.symbol} value={coinData}>
          <Td>{coinData.symbol}</Td>
          <Td>${commafy(Math.round(coinData.lastPrice * 100) / 100)}</Td>
          <Td>${commafy(coinData.openPrice)}</Td>
          <Td>{date.toDateString().slice(4,10)}</Td>
          <Td isNumeric>{coinData.quantity}</Td>
          <Td isNumeric>{commafy(twoDecimalPlaces(coinData.lastPrice * coinData.quantity))}</Td>
          <Td>
              <Text>${commafy(Math.round((currentValue-openValue) * 100) / 100)}</Text>
              <Text color={(percentChange>0) ? greenColor : redColor} >({commafy(Math.round(percentChange * 100) / 100)}%)</Text>
            </Td>
          <Td>
          <IconButton aria-label="{ icon: Element; }" onClick={() => handleClick(coinData)} icon={<FaTimes/>} colorScheme='red' size='sm' />
          </Td>
        </Tr>)}
        )}
      </Tbody>
    </Table>
  );
};

export default PositionsTable;

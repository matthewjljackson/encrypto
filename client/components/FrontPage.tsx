import { FunctionComponent } from 'react';
import {  HStack, Text } from '@chakra-ui/layout';
import { Image } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { ICoin } from '../interfaces/ICoin';

interface IFrontPageProps {
  coins: ICoin[]
}

const FrontPage: FunctionComponent<IFrontPageProps> = ({ coins }) => {

  function commafy( num:number ) {
    let str = num.toString().split('.');
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return str.join('.');
  }

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Price (24h %)</Th>
          <Th display={{ base: 'none', md: "table-cell"}}>Market cap</Th>
        </Tr>
      </Thead>
      <Tbody>
        {coins && coins.map((coin:any) => ( 
          <Tr key={coin.name}>
            <Td>
              <HStack>
                <Image p={1} borderRadius="full" boxSize={{ base: "35px", sm: "40px", md: "45px" }} src={coin.logo_url} alt="coin logo"/>
                <Text fontSize={{ base: 'xs', sm: 'md', md: 'lg'}}>{coin.name} / {coin.symbol}</Text>
              </HStack>
            </Td>
            <Td>
              <Text fontSize={{ base: 'xs', sm: 'lg'}}>${commafy(Math.round(coin.price * 100) / 100)}</ Text>
              <Text fontSize={{ base: 'xs', sm: 'sm'}} color={(coin["1d"].price_change_pct*100)>0 ? 'green' : 'red'}>{Math.round(coin["1d"].price_change_pct * 10000)/100}%</Text>
            </Td>
            <Td display={{ base: 'none', md: "table-cell"}} fontSize={{ base: 'sm', md: 'lg'}}>${commafy(coin.market_cap)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default FrontPage;

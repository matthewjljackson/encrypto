import { FunctionComponent, useEffect, useState, useContext } from 'react';
import {  HStack, Text } from '@chakra-ui/layout';
import { Image } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, useColorModeValue } from "@chakra-ui/react";
import { ICoin } from '../interfaces/ICoin';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { UserContext } from '../context/UserContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface IFrontPageProps {
  coins: ICoin[],
  idStr?: string,
  sparkData?:any
}

const FrontPage: FunctionComponent<IFrontPageProps> = ({ coins, idStr }) => {

  const greenColor = useColorModeValue('green','#9AE6B4' );
  const redColor = useColorModeValue('red','#FEB2B2' );
  function commafy( num:number ) {
    let str = num.toString().split('.');
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return str.join('.');
  }

  const { user, setUser } = useContext(UserContext);
  const [ sparkData, setSparkData ] = useState<any>(null)

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        fetch(`https://api.nomics.com/v1/currencies/sparkline?key=a3cf70e3536652995126958f3ac6eb8fefadbc08&ids=${idStr}&start=2021-09-20T00%3A00%3A00Z`)
        .then( res => res.json())
        .then((data:any) => {
          const x = data.reduce((a:any, v:any) => ({ ...a, [v.currency]: v}), {});
          setSparkData(x)
        })
        .catch(err => console.log('uh oh'))
      }, 1000)
    }
  }, [])

  const router = useRouter();
  function handleClick(coin: any) {
    router.push(`/coin/${coin.id}`)
    // console.log(coin)
  }

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Price (24h %)</Th>
          <Th display={{ base: 'none', md: "table-cell"}}>Market cap</Th>
          <Th display={user ? 'table-cell' : 'none'} >Market Trend (1W)</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sparkData && coins.map((coin:any) => {
          let sparkArr:any;
          if (user) {
            sparkArr = sparkData[coin.id].prices;
            sparkArr = sparkArr.map((price:any) => Number(price))
          }
          return (     
            <Tr onClick={() => handleClick(coin)} transition='all .2s ease-in-out' key={coin.id} _hover={{ 
              transform: 'scale(1.03)',
              border: '1px solid lightgrey'
              }}>
              <Td>
                <HStack>
                  <Image p={1} borderRadius="full" boxSize={{ base: "35px", sm: "40px", md: "45px" }} src={coin.logo_url} alt="coin logo"/>
                  <Text fontSize={{ base: 'xs', sm: 'md', md: 'lg'}}>{coin.name} / {coin.symbol}</Text>
                </HStack>
              </Td>
              <Td>
                <Text fontSize={{ base: 'xs', sm: 'lg'}}>${commafy(Math.round(coin.price * 100) / 100)}</ Text>
                <Text fontSize={{ base: 'xs', sm: 'sm'}} color={(coin["1d"].price_change_pct*100)>0 ? greenColor : redColor}>{Math.round(coin["1d"].price_change_pct * 10000)/100}%</Text>
              </Td>
              <Td display={{ base: 'none', md: "table-cell"}} fontSize={{ base: 'sm', md: 'lg'}}>${commafy(coin.market_cap)}</Td>
              <Td display={user ? 'table-cell' : 'none'}>
                <Sparklines data={sparkArr} svgWidth={200} height={90}>
                  <SparklinesLine color={coin["1d"].price_change> 0 ? greenColor : redColor} />
                </Sparklines>
              </Td>
            </Tr>
          )}
        )}
      </Tbody>
    </Table>
  );
};

export default FrontPage;

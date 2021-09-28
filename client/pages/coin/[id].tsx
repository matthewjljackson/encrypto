import { Box, Container, Heading, HStack, Text, VStack } from '@chakra-ui/layout';
import { Image } from "@chakra-ui/react";
import type { NextPage } from 'next';
import { GetStaticProps, GetServerSideProps } from 'next';
import Head from 'next/head';
import UserNav from '../../components/UserNav';
import dynamic from "next/dynamic";
const Chart: any = dynamic(() => import("../../components/Chart"), {
  ssr: false
});
import { useEffect, useState, FunctionComponent } from 'react';
import TimeTable from '../../components/TimeTable';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { useColorModeValue } from '@chakra-ui/color-mode';

export const getServerSideProps: GetServerSideProps = async (context:any) => {
  const id = context.params.id;
  const res = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=a3cf70e3536652995126958f3ac6eb8fefadbc08&ids=${id}&convert=USD`)
  const data = await res.json();
    console.log(data)
  return {
    props: {coin: data}
  }
}

interface IHomeProps {
  coin:any
}

const Details: NextPage<IHomeProps> = ({ coin }) => {

  const [ sparkData, setSparkData ] = useState<any>(null);
  const [ miniSpark, setMiniSpark ] = useState<any>(null);
  const greenColor = useColorModeValue('green','#9AE6B4');
  const redColor = useColorModeValue('red','#FEB2B2' );

  useEffect(() => {
    setTimeout(() => {
      fetch(`https://api.nomics.com/v1/currencies/sparkline?key=a3cf70e3536652995126958f3ac6eb8fefadbc08&ids=${coin[0].id}&start=2017-04-14T00%3A00%3A00Z`)
      .then(res => res.json())
      .then((data:any) => {
        const slicer = data[0].prices.length-30
        setMiniSpark(data[0].prices.slice(slicer))
        let x = [];
        for (let i=0; i<data[0].prices.length; i++) {
          x.push({ time: data[0].timestamps[i], value: data[0].prices[i] })
        }
        setSparkData(x);
      })
      .catch(err => console.log(err.message))
    }, 600)
  }, [coin])

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

  return (
    <Container maxW='container.lg' display='flex' flexDirection='column'>
      <Head>
        <title>Details</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <UserNav />
      <VStack spacing={35} mt={5}>
        <HStack w='90%'>
        <VStack w='100%'>
          <HStack w='100%' alignItems='flex-end'>
            <Image src={coin[0].logo_url} borderRadius='full' borderColor='whiteAlpha.500' boxSize="60px" alt='logo' />
              <Heading size='3xl' >{coin[0].name}</Heading>
              <Text pb={1} alignSelf='flex-end' fontSize='2xl'>({coin[0].id})</Text>
          </HStack>
          <HStack  w='100%'>
          <Text fontSize='3xl' w='90%'>${commafy(twoDecimalPlaces(coin[0].price))}</Text>
          </HStack>
        </VStack>
              {miniSpark && <Sparklines data={miniSpark} svgWidth={550} svgHeight={120}>
                <SparklinesLine color={coin[0]["30d"].price_change> 0 ? greenColor : redColor} style={{ fill: "none" }} />
              </Sparklines>}
        </HStack>
        <Box alignItems='flex-end' w='90%'>
          <TimeTable coin={coin}/>
        </Box>
        <HStack pt={50} spacing={100}>
          <VStack>
            <Heading size='md'>Market cap</Heading>
            <Text>${commafy(twoDecimalPlaces(coin[0].market_cap))}</Text>
          </VStack>
          <VStack>
            <Heading size='md'>Circulating supply</Heading>
            <Text>{commafy(twoDecimalPlaces(coin[0].circulating_supply))}</Text>
          </VStack>
          <VStack>
            <Heading size='md'>All time high</Heading>
            <Text>${commafy(twoDecimalPlaces(coin[0].high))}</Text>
          </VStack>
        </HStack>
        <Box pb={100} pt={50}>
          {sparkData && <Chart sparkCoins={sparkData} />}
        </Box>
      </VStack>
    </Container>
  )
}

export default Details
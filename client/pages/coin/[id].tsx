import { Container, Heading, HStack, Text, VStack } from '@chakra-ui/layout';
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
import { FaTaxi } from 'react-icons/fa';

export const getServerSideProps: GetServerSideProps = async (context:any) => {
  const id = context.params.id;
  const res = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=a3cf70e3536652995126958f3ac6eb8fefadbc08&ids=${id}&interval=1d&convert=USD`)
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

  useEffect(() => {
    console.log(coin)
    console.log(coin[0].id)
    setTimeout(() => {
      fetch(`https://api.nomics.com/v1/currencies/sparkline?key=a3cf70e3536652995126958f3ac6eb8fefadbc08&ids=${coin[0].id}&start=2017-04-14T00%3A00%3A00Z`)
      .then(res => res.json())
      .then((data:any) => {
        console.log('dat', data[0])
        let x = [];
        for (let i=0; i<data[0].prices.length; i++) {
          x.push({ time: data[0].timestamps[i], value: data[0].prices[i] })
        }
        setSparkData(x);
        console.log('bbb',sparkData)
      })
      .catch(err => console.log(err.message))
    }, 500)
  }, [])

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
        <HStack>
          <Image src={coin[0].logo_url} borderRadius='full' boxSize="100px" alt='logo' />
          <Heading>{coin[0].name}</Heading>
          <Text>({coin[0].id})</Text>
        </HStack>
          <Text>${commafy(twoDecimalPlaces(coin[0].price))}</Text>
          {sparkData && <Chart sparkCoins={sparkData} />}
    </Container>
  )
}

export default Details
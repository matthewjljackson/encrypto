import type { NextPage } from 'next';
import { Container, VStack } from '@chakra-ui/layout';
import { GetServerSideProps } from 'next';
import { ICoin } from '../interfaces/ICoin';
import Home1 from '../components/FrontPage';
import Navbar from '../components/Navbar';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.req)
  const res = await fetch('https://api.nomics.com/v1/currencies/ticker?key=a3cf70e3536652995126958f3ac6eb8fefadbc08&interval=1d&convert=USD&per-page=100&page=1')
  const data: ICoin[] = await res.json();
  return {
    props: {coins: data}
  }
}

interface IHomeProps {
  coins: ICoin[]
}

const Home: NextPage<IHomeProps> = ({ coins }) => {
  return (
    <VStack>
      <Container p={0} m={0} w={{ base: '100%'}} maxW='container.lg'>
        <Head>
          <title>Home</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Navbar />
        <Home1 coins={coins} />
      </Container>
    </VStack>
  )
}

export default Home

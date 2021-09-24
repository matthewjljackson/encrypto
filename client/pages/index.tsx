import type { NextPage } from 'next';
import { Container } from '@chakra-ui/layout';
import { GetServerSideProps } from 'next';
import { ICoin } from '../interfaces/ICoin';
import Home1 from '../components/Home';

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
    <Container maxW='container.lg' >
      <Home1 coins={coins} />
    </Container>
  )
}

export default Home

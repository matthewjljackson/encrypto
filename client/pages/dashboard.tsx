import type { NextPage } from 'next';
import { Container, VStack } from '@chakra-ui/layout';
import { GetServerSideProps } from 'next';
import { ICoin } from '../interfaces/ICoin';
import Home1 from '../components/FrontPage';
import UserNav from '../components/UserNav';
import Head from 'next/head';
import Portfolio from '../components/Portfolio';
import Positions from '../components/Positions';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch('https://api.nomics.com/v1/currencies/ticker?key=a3cf70e3536652995126958f3ac6eb8fefadbc08&interval=1d&convert=USD&per-page=100&page=1')
  const data: ICoin[] = await res.json();
  return {
    props: {coins: data}
  }
}

interface IHomeProps {
  coins: ICoin[]
}

const Dashboard: NextPage<IHomeProps> = ({ coins }) => {

  const { user } = useContext(UserContext);
  const [ userCoins, setUserCoins ] = useState<any>(null);
  const [ newEntry, setNewEntry ] = useState<number>(0);
  const [ openAll, setOpenAll ] = useState<number>(0);
  const [ currentAll, setCurrentAll ] = useState<number>(0);
  

  useEffect(() => {
    console.log('blah',user)
    fetch('http://localhost:3001/coins', {
      credentials: "include",
      method: "GET",
      headers: {"Content-Type": "application/json"},
    })
    .then(res => res.json())
    .then((data:any) => {
      console.log('initial',openAll, currentAll);
      let curr = 0;
      let ope = 0;
      for (let j=0; j < data.length; j++) {
        for (let i=0; i < coins.length; i++) {
          if (data[j].symbol === coins[i].symbol) {
            data[j].lastPrice = coins[i].price;
            curr = curr + data[j].lastPrice * data[j].quantity;
            ope = ope + data[j].openPrice * data[j].quantity
            break;
          }
        }
      }
        setUserCoins(data);
        setOpenAll(ope);
        setCurrentAll(curr);
      })
  }, [newEntry])

  return (
    <Container maxW='container.lg' display='flex' flexDirection='column'>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <UserNav />
      <Portfolio currentAll={currentAll} />
      <Positions coins={coins} newEntry={newEntry} setNewEntry={setNewEntry} userCoins={userCoins}/>
      <Home1 coins={coins} />
    </Container>
  )
}

export default Dashboard;
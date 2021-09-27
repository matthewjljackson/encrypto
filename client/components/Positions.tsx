import * as React from 'react';
import { VStack, Text, HStack } from '@chakra-ui/layout';
import PositionsTable from './PositionsTable'
import { ICoin } from '../interfaces/ICoin';

interface IPortfolioProps {
  coins:ICoin[],
  userCoins:any[],
  setNewEntry: any,
  newEntry: number
}

const Positions: React.FunctionComponent<IPortfolioProps> = ({ newEntry, coins, userCoins, setNewEntry }) => {
  return (
    <VStack minH='20vh' boxShadow='xl' m='1rem' border='2px' borderColor='gray.200' borderRadius='0.5rem' maxW='container.lg' justifyContent='center'>
      <PositionsTable newEntry={newEntry} setNewEntry={setNewEntry} coins={coins} userCoins={userCoins}/>
    </VStack>
  );
};

export default Positions;

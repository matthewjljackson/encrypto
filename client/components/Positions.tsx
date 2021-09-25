import * as React from 'react';
import { VStack, Text, HStack } from '@chakra-ui/layout';
import PositionsTable from './PositionsTable'

interface IPortfolioProps {
}

const Positions: React.FunctionComponent<IPortfolioProps> = (props) => {
  return (
    <VStack minH='20vh' boxShadow='xl' m='1rem' border='2px' borderColor='gray.200' borderRadius='0.5rem' maxW='container.lg' justifyContent='center'>
      <PositionsTable />
    </VStack>
  );
};

export default Positions;

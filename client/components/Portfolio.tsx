import { VStack, Text, HStack } from '@chakra-ui/layout';
import * as React from 'react';

interface IPortfolioProps {
  currentAll:number,
  openAll: number,
  dayOldPrice: any
}

const Portfolio: React.FunctionComponent<IPortfolioProps> = ({ currentAll, openAll, dayOldPrice }) => {

  function twoDecimalPlaces(num: number) {
    return Math.round(num * 100) / 100
  }

  function commafy( num:number ) {
    let str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return str.join('.');
  }
  const allTimePercentChange = (currentAll-openAll)/openAll*100;

  return (
    <VStack h='20vh' boxShadow='xl' m='1rem' border='2px' borderColor='gray.200' borderRadius='0.5rem' maxW='container.lg' justifyContent='center'>
      <VStack w='80%' align='flex-start'>
      <Text fontSize='md'>Main portfolio</Text>
      <Text fontSize='3xl'>${commafy(twoDecimalPlaces(currentAll))}</Text>
      </VStack>
      <HStack w='80%' justifyContent='space-between'>
        <Text fontSize='md'>24h change</Text>
        <HStack>
          <Text fontSize='xl'>${commafy(twoDecimalPlaces(dayOldPrice.price))}</Text>
          <Text fontSize='md' color={(dayOldPrice.price>0) ? 'green' : 'red'}>{commafy(twoDecimalPlaces(dayOldPrice.pct))}%</Text>
        </HStack>
      </HStack>
      <HStack w='80%' justifyContent='space-between'>
        <Text fontSize='md'>all time change</Text>
        <HStack>
          <Text fontSize='xl'>${commafy(twoDecimalPlaces(currentAll - openAll))}</Text>
          <Text fontSize='md' color={(allTimePercentChange>0) ? 'green' : 'red'}>{commafy(twoDecimalPlaces(allTimePercentChange))}%</Text>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default Portfolio;

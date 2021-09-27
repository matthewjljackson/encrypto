import { VStack, Text, HStack } from '@chakra-ui/layout';
import * as React from 'react';

interface IPortfolioProps {
  currentAll:number
}

const Portfolio: React.FunctionComponent<IPortfolioProps> = ({ currentAll }) => {

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

  return (
    <VStack h='20vh' boxShadow='xl' m='1rem' border='2px' borderColor='gray.200' borderRadius='0.5rem' maxW='container.lg' justifyContent='center'>
      <VStack w='80%' align='flex-start'>
      <Text fontSize='md'>Main portfolio</Text>
      <Text fontSize='3xl'>${commafy(twoDecimalPlaces(currentAll))}</Text>
      </VStack>
      <HStack w='80%' justifyContent='space-between'>
        <Text fontSize='md'>24h change</Text>
        <Text fontSize='md'>24h change number</Text>
      </HStack>
      <HStack w='80%' justifyContent='space-between'>
        <Text fontSize='md'>all time change</Text>
        <Text fontSize='md'>all time change number</Text>
      </HStack>
    </VStack>
  );
};

export default Portfolio;

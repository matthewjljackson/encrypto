import { VStack, Text, HStack } from '@chakra-ui/layout';
import * as React from 'react';

interface IPortfolioProps {
}

const Portfolio: React.FunctionComponent<IPortfolioProps> = (props) => {
  return (
    <VStack h='20vh' boxShadow='xl' m='1rem' border='2px' borderColor='gray.200' borderRadius='0.5rem' maxW='container.lg' justifyContent='center'>
      <VStack w='80%' align='flex-start'>
      <Text fontSize='md'>Main portfolio</Text>
      <Text fontSize='3xl'>$ some number</Text>
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

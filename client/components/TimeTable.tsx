import * as React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { ICoin } from '../interfaces/ICoin';
import { useColorModeValue } from '@chakra-ui/react'

interface ITimeTableProps {
  coin:any
}

const TimeTable: React.FunctionComponent<ITimeTableProps> = ({ coin }) => {

  const greenColor = useColorModeValue('green','#9AE6B4');
  const redColor = useColorModeValue('red','#FEB2B2' );

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
    <Table variant="simple" w='40%'>
      <Thead>
        <Tr>
          <Th>1H</Th>
          <Th>1D</Th>
          <Th>1M</Th>
          <Th>1Y</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td color={(coin[0]['1d'].price_change_pct>0) ? greenColor : redColor}>{commafy(twoDecimalPlaces(coin[0]['1d'].price_change_pct*100))}%</Td>
          <Td color={(coin[0]['7d'].price_change_pct>0) ? greenColor : redColor}>{commafy(twoDecimalPlaces(coin[0]['7d'].price_change_pct*100))}%</Td>
          <Td color={(coin[0]['30d'].price_change_pct>0) ? greenColor : redColor}>{commafy(twoDecimalPlaces(coin[0]['30d'].price_change_pct*100))}%</Td>
          <Td color={(coin[0]['365d'].price_change_pct>0) ? greenColor : redColor}>{commafy(twoDecimalPlaces(coin[0]['365d'].price_change_pct*100))}%</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default TimeTable;

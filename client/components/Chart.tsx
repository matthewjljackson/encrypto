import { createChart, ColorType, LastPriceAnimationMode } from "lightweight-charts";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/layout";

const data = [
  { time: '2018-12-01', value: 32.51 },
  { time: '2018-12-02', value: 31.11 },
  { time: '2018-12-03', value: 27.02 },
  { time: '2018-12-04', value: 27.32 },
  { time: '2018-12-05', value: 25.17 },
  { time: '2018-12-06', value: 28.89 },
  { time: '2018-12-07', value: 25.46 },
  { time: '2018-12-08', value: 23.92 },
  { time: '2018-12-09', value: 22.68 },
  { time: '2018-12-10', value: 22.67 },
  { time: '2018-12-11', value: 27.57 },
  { time: '2018-12-12', value: 24.11 },
  { time: '2018-12-13', value: 30.74 },
];

interface IChartProps {
  sparkCoins:any
}

const Chart: FunctionComponent<IChartProps> = ({ sparkCoins }) => {

  const chartRef = useRef<any>(null);
  useEffect(() => {
    const chart = createChart(chartRef.current, { width: 700, height: 500 });
    const lineSeries = chart.addLineSeries({
      color: '#FFFFFF',
      lineWidth: 2,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 6,
      crosshairMarkerBorderColor: '#1A202C',
      crosshairMarkerBackgroundColor: '#FFFFFF',
      lastPriceAnimation: LastPriceAnimationMode.Continuous,
    });
    lineSeries.setData(sparkCoins);
    chart.applyOptions({
      layout: {
        background: {
            type: ColorType.VerticalGradient,
            topColor: '#1A202C',
            bottomColor: '#1A202C',
        },
        textColor: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Calibri',
      },
      grid: {
        vertLines: {
            visible: false
        },
        horzLines: {
          visible: false
        }
      }
    });
    // console.log('dog', sparkCoins)
  }, []);

  return <Box borderRadius='md' ref={chartRef} />

};

export default Chart;
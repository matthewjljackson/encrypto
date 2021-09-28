import { createChart, ColorType, LastPriceAnimationMode } from "lightweight-charts";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/layout";

interface IChartProps {
  sparkCoins:any
}

const Chart: FunctionComponent<IChartProps> = ({ sparkCoins }) => {

  const chartRef = useRef<any>(null);
  useEffect(() => {
    const chart = createChart(chartRef.current, { width: 700, height: 700 });
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
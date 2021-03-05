import React from 'react';
import Chart from './Chart';
import { useStats } from 'contexts/stats';

export default () => {
  const { mktCapChartData: data } = useStats();
  return <Chart {...{ data }} yAxisLabelFormatter={y => `$${y}`} title={'MARKET CAP'} />;
};

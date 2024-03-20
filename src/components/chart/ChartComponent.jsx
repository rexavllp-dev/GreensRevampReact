"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import Chart from 'react-apexcharts'

// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });    

const ChartComponent = ({ options, series }) => {
  return <Chart options={options} series={series}  type="bar" />;
};

export default ChartComponent;  
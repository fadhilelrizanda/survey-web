/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Bar } from "react-chartjs-2";

interface StackedBarChartProps {
  data: any;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({ data }) => {
  const options = {
    plugins: {
      title: {
        display: true,
        text: "True/False Distribution for Each Question",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default StackedBarChart;

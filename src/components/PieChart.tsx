// src/components/PieChart.js
import { Pie } from "react-chartjs-2";

interface PieChartProps {
  chartData: any;
  text_data: string;
}

const PieChart: React.FC<PieChartProps> = ({ chartData, text_data }) => {
  return (
    <div className="chart-container">
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: text_data,
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;

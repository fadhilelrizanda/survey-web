/* eslint-disable @typescript-eslint/no-explicit-any */
import PieChart from "../../components/PieChart";
import StackedBarChart from "../../components/StackedBarChart";

interface VisualGraphProps {
  pieChartData: any;
  stackedBarChartData: any;
}

const VisualGraph: React.FC<VisualGraphProps> = ({
  pieChartData,
  stackedBarChartData,
}) => {
  return (
    <>
      <div className="row">
        <h4 className="text-center mt-2 mb-5">Statistik</h4>
        <div className="col-md-4">
          <div className="graph">
            <PieChart
              chartData={pieChartData}
              text_data={"Statistik Persebaran Score"}
            />
          </div>
        </div>
        <div className="col-md-8">
          <div className="graph">
            <StackedBarChart data={stackedBarChartData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default VisualGraph;

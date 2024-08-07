import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
function Success() {
  const location = useLocation();
  const { score: data_score } = location.state || { score: 0 };
  console.log(data_score);
  return (
    <>
      <div className="container-fluid">
        <Navbar />
      </div>
      <div className="container">
        <div className="row">
          <h3>Nilai Beresiko {data_score}</h3>
        </div>
      </div>
    </>
  );
}

export default Success;

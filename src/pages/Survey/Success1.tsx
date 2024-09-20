import Navbar from "../../components/Navbar";
import "react-circular-progressbar/dist/styles.css";
import "./Success.css";
import CardSuccess from "./CardSuccess";
function SuccessSikat() {
  const data_score_string1 = sessionStorage.getItem("s0Score");
  const data_score1 = parseInt(data_score_string1 || "0");

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <CardSuccess title="Test" data_score={data_score1} />
        </div>
      </div>
    </>
  );
}

export default SuccessSikat;

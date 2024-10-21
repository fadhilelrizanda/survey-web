import Navbar from "../../components/Navbar";
import "react-circular-progressbar/dist/styles.css";
import "./Success.css";
import CardSuccess from "./CardSuccess";
function SuccessSikat() {
  const data_score_string1 = sessionStorage.getItem("s2Score");
  const data_score1 = parseInt(data_score_string1 || "0");

  const data_score_string11 = sessionStorage.getItem("s22Score");
  const data_score11 = parseInt(data_score_string11 || "0");

  const data_score_string111 = sessionStorage.getItem("s222Score");
  const data_score111 = parseInt(data_score_string111 || "0");

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <CardSuccess title="Keterangan Nilai" data_score={data_score1} />
          <CardSuccess title="Keterangan Nilai" data_score={data_score11} />
          <CardSuccess title="Keterangan Nilai" data_score={data_score111} />
        </div>
      </div>
    </>
  );
}

export default SuccessSikat;

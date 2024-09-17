import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Success.css";
function Success() {
  const data_score_string = sessionStorage.getItem("s0Score");
  const data_score = parseInt(data_score_string || "0");
  // let { score: data_score } = location.state || { score: 0 };
  // data_score = data_score * 5;

  // Function to determine the description based on the score range
  const getDescription = (score: number) => {
    if (score >= 0 && score <= 20) {
      return "Sangat Beresiko";
    } else if (score > 20 && score <= 40) {
      return "Kurang Baik";
    } else if (score > 40 && score <= 60) {
      return "Cukup";
    } else if (score > 60 && score <= 80) {
      return "Baik";
    } else if (score > 80 && score <= 100) {
      return "Sangat Baik";
    } else {
      return "Nilai tidak valid";
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 card-score">
            <h3 className="text-center">Nilai Beresiko</h3>
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card">
                  <div className="chart-progress">
                    <CircularProgressbar
                      value={data_score}
                      text={`${data_score}%`}
                      styles={buildStyles({
                        pathColor: `rgba(62, 152, 199, ${data_score / 100})`,
                        textColor: "#f88",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-center">Keterangan Hasil</h5>
                    <hr />
                    <p className="card-text text-center">
                      Nilai Anda: <strong>{getDescription(data_score)}</strong>
                    </p>

                    {/* Table for detailed score explanation */}
                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>Rentang Nilai</th>
                          <th>Keterangan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>0 - 20</td>
                          <td>Sangat Beresiko</td>
                        </tr>
                        <tr>
                          <td>21 - 40</td>
                          <td>Kurang Baik</td>
                        </tr>
                        <tr>
                          <td>41 - 60</td>
                          <td>Cukup</td>
                        </tr>
                        <tr>
                          <td>61 - 80</td>
                          <td>Baik</td>
                        </tr>
                        <tr>
                          <td>81 - 100</td>
                          <td>Sangat Baik</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="text-center">
                      <Link to="/" className="btn btn-primary mt-3">
                        Isi Survey Lainnya
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Success;

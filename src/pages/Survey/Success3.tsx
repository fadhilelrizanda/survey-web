import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Success.css";
function SuccessSikat() {
  const data_score_string1 = sessionStorage.getItem("s2Score");
  const data_score1 = parseInt(data_score_string1 || "0");

  const data_score_string11 = sessionStorage.getItem("s22Score");
  const data_score11 = parseInt(data_score_string11 || "0");

  const data_score_string111 = sessionStorage.getItem("s222Score");
  const data_score111 = parseInt(data_score_string111 || "0");
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
            <h3 className="text-center">Nilai Beresiko Demokratis</h3>
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card">
                  <div className="chart-progress">
                    <CircularProgressbar
                      value={data_score1}
                      text={`${data_score1}%`}
                      styles={buildStyles({
                        pathColor: `rgba(62, 152, 199, ${data_score1})`,
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
                      Nilai Anda: <strong>{getDescription(data_score1)}</strong>
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

          <div className="col-md-8 card-score">
            <h3 className="text-center">Nilai Beresiko Otoriter</h3>
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card">
                  <div className="chart-progress">
                    <CircularProgressbar
                      value={data_score11}
                      text={`${data_score11}%`}
                      styles={buildStyles({
                        pathColor: `rgba(62, 152, 199, ${data_score11})`,
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
                      Nilai Anda:{" "}
                      <strong>{getDescription(data_score11)}</strong>
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

          <div className="col-md-8 card-score">
            <h3 className="text-center">Nilai Beresiko Permisif</h3>
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card">
                  <div className="chart-progress">
                    <CircularProgressbar
                      value={data_score111}
                      text={`${data_score111}`}
                      styles={buildStyles({
                        pathColor: `rgba(62, 152, 199, ${data_score111})`,
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
                      Nilai Anda:{" "}
                      <strong>{getDescription(data_score111)}</strong>
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

export default SuccessSikat;

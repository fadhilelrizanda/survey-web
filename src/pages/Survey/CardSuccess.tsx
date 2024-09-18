import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Success.css";

interface CardSuccessProp {
  title: string;
  data_score: number;
}

import { getDescription } from "../../utils/utils";
import TableSuccess from "./TableSuccess";
const CardSuccess: React.FC<CardSuccessProp> = ({ title, data_score }) => {
  return (
    <>
      <div className="col-md-8 card-score">
        <h3 className="text-center">{title}</h3>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="chart-progress">
                <CircularProgressbar
                  value={data_score}
                  text={`${data_score}%`}
                  styles={buildStyles({
                    pathColor: `rgba(62, 152, 199, ${data_score})`,
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

                <TableSuccess />

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
    </>
  );
};

export default CardSuccess;

import "./CardSurvey.css";
import { Link } from "react-router-dom";
interface CardSurveyProps {
  imgSurvey: string;
  title: string;
  text: string;
  inverse: boolean;
  alignRight?: boolean;
  route: string;
  state: boolean;
}

const CardSurvey: React.FC<CardSurveyProps> = ({
  imgSurvey,
  title,
  text,
  inverse,
  alignRight = false,
  route,
  state,
}) => {
  const blankWhiteImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgMBA0cfHZkAAAAASUVORK5CYII=";
  const useBlankImage = true; // Set to true to use blank white images

  return (
    <div className={`card-survey-container ${alignRight ? "right" : ""}`}>
      <div className="row card-survey">
        {inverse === false && (
          <>
            <div className="col-md-8 text-section col-12 order-1 order-md-0">
              <h4>{title}</h4>
              <p>{text}</p>
              {state ? (
                <Link to="#">
                  <button className="btn btn-success">Sudah Diisi</button>
                </Link>
              ) : (
                <Link to={route}>
                  <button className="btn btn-primary">Lakukan Survey</button>
                </Link>
              )}
            </div>
            <div className="col-md-4 img-section col-12 order-0 order-md-1">
              <img
                src={useBlankImage ? blankWhiteImage : imgSurvey}
                className="img-fluid"
                alt=""
              />
            </div>
          </>
        )}
        {inverse === true && (
          <>
            <div className="col-md-4 col-12 img-section">
              <img
                src={useBlankImage ? blankWhiteImage : imgSurvey}
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="col-md-8 col-12 text-section">
              <h4>{title}</h4>
              <p>{text}</p>
              {state ? (
                <Link to="#">
                  <button className="btn btn-success">Sudah Diisi</button>
                </Link>
              ) : (
                <Link to={route}>
                  <button className="btn btn-primary">Lakukan Survey</button>
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardSurvey;

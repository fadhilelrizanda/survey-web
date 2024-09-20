import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import imgMilk from "../assets/images/survey/Milk.jpg";
// import imgBrush from "../assets/images/survey/menyikat.png";
import imgParenting from "../assets/images/survey/parenting.png";
import imgTeeth from "../assets/images/survey/Teeth.png";
function Survey() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Navbar />
        </div>
      </div>
      <div className="container mt-5">
        <div className="row card-survey justify-content-center mt-5">
          <h3 className="mb-5">Pilih survey yang ingin anda lakukan</h3>
          <div className="card col-3 mx-3">
            <img className="card-img-top" src={imgMilk} alt="Card image cap" />
            <div className="card-body">
              <h4>Survey Pemberian Susu Formula</h4>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <Link to="/surveya">
                <button className="btn btn-primary">Ambil Survey</button>
              </Link>
            </div>
          </div>
          {/* <div className="card col-3">
            <img className="card-img-top" src={imgBrush} alt="Card image cap" />
            <div className="card-body">
              <p className="card-text">
                <h4>Survey Menyikat Gigi</h4>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
                <Link to="/surveyb">
                  <button className="btn btn-primary">Ambil Survey</button>
                </Link>
              </p>
            </div>
          </div> */}
          <div className="card col-3 mx-3">
            <img
              className="card-img-top"
              src={imgParenting}
              alt="Card image cap"
            />
            <div className="card-body">
              <h4>Survey Pola Asuh Orangtua</h4>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.{" "}
              </p>
              <Link to="/surveyc">
                <button className="btn btn-primary">Ambil Survey</button>
              </Link>
            </div>
          </div>
          <div className="card col-3 mx-3">
            <img className="card-img-top" src={imgTeeth} alt="Card image cap" />
            <div className="card-body">
              <h4>Survey Pola Asuh Orang Tua 2</h4>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.{" "}
              </p>
              <Link to="/surveyd">
                <button className="btn btn-primary">Ambil Survey</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Survey;

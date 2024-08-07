import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
function Survey() {
  return (
    <>
      <div className="container-fluid">
        <Navbar />
      </div>
      <div className="container mt-5">
        <div className="row card-survey justify-content-center mt-5">
          <h3 className="mb-5">Pilih survey yang ingin anda lakukan</h3>
          <div className="card col-3">
            <img
              className="card-img-top"
              src=".../100px180/?text=Image cap"
              alt="Card image cap"
            />
            <div className="card-body">
              <p className="card-text">
                <h4>Survey Pemberian Susu Formula</h4>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
                <Link to="/surveya">
                  <button>Ambil Survey</button>
                </Link>
              </p>
            </div>
          </div>
          <div className="card col-3">
            <img
              className="card-img-top"
              src=".../100px180/?text=Image cap"
              alt="Card image cap"
            />
            <div className="card-body">
              <p className="card-text">
                <h4>Survey Menyikat Gigi</h4>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
                <Link to="/surveyb">
                  <button>Ambil Survey</button>
                </Link>
              </p>
            </div>
          </div>
          <div className="card col-3">
            <img
              className="card-img-top"
              src=".../100px180/?text=Image cap"
              alt="Card image cap"
            />
            <div className="card-body">
              <p className="card-text">
                <h4>Survey Pola Asuh Orangtua</h4>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.{" "}
                <Link to="/surveyc">
                  <button>Ambil Survey</button>
                </Link>
              </p>
            </div>
          </div>
          <div className="card col-3">
            <img
              className="card-img-top"
              src=".../100px180/?text=Image cap"
              alt="Card image cap"
            />
            <div className="card-body">
              <p className="card-text">
                <h4>Survey Pola Periksa Gigi</h4>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.{" "}
                <Link to="/surveyd">
                  <button>Ambil Survey</button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Survey;

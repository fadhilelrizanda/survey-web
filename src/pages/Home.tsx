import Navbar from "../components/Navbar";
import ImgHero from "../assets/images/hero.jpg";
import "./Home.css";
function Home() {
  return (
    <>
      <div className="container-fluid">
        <Navbar />
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-4 check_border">
            <h3>Section Introduction</h3>
            <button>Lakukan Survey</button>
          </div>
          <div className="col-8 hero-img check_border">
            <img src={ImgHero} className="img-fluid " />
          </div>
        </div>
        <div className="row card-survey justify-content-center mt-5">
          <div className="card col-3">
            <img
              className="card-img-top"
              src=".../100px180/?text=Image cap"
              alt="Card image cap"
            />
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
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
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
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
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

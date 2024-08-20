import Navbar from "../components/Navbar";
import ImgHero from "../assets/images/dentist-hero.png";
import "./Home.css";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Navbar />
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-4 text-section">
            <div className="text-content">
              <h3>Section Introduction</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur in, fugit itaque nulla maiores omnis earum incidunt
                cupiditate necessitatibus veniam sunt, rem non numquam
                laudantium eveniet deleniti accusantium nostrum eaque!
              </p>
              <Link to="/survey">
                <button className="btn btn-primary">Lakukan Survey</button>
              </Link>
            </div>
          </div>
          <div className="col-8 hero-img ">
            <img src={ImgHero} className="img-fluid " />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

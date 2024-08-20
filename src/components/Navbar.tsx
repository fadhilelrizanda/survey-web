import { Link } from "react-router-dom";
import Logo from "../assets/images/logo-removebg.png";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand" to="/">
          <img className="logoNav" src={Logo} alt="Logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <Link to="/" className="nav-item nav-link border-item">
              Home
            </Link>
            <Link to="/survey" className="nav-item nav-link">
              Survey
            </Link>
            <Link to="/login" className="nav-item nav-link">
              Login
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

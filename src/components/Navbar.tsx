import { Link } from "react-router-dom";
import Logo from "../assets/images/logo-removebg.png";
import "./Navbar.css";
import { logout } from "../utils/utils";

function Navbar() {
  const username = sessionStorage.getItem("username");
  const survey0 = sessionStorage.getItem("s0Score");
  const survey1 = sessionStorage.getItem("s1Score");
  const survey2 = sessionStorage.getItem("s2Score");
  return (
    <div className="nav-wrapper">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img className="logoNav" src={Logo} alt="Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li>
                <Link to="/" className="nav-item nav-link border-item">
                  Home
                </Link>
              </li>
              {/* <li>
                <Link to="/survey" className="nav-item nav-link">
                  Survey
                </Link>
              </li> */}
              {(survey0 || survey1 || survey2) && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Score
                  </a>
                  <ul className="dropdown-menu">
                    {survey0 && (
                      <li>
                        <Link
                          className="btn btn-danger dropdown-item"
                          to="/success"
                        >
                          Survey Pemberian Susu
                        </Link>
                      </li>
                    )}
                    {survey1 && (
                      <li>
                        <Link
                          className="btn btn-danger dropdown-item"
                          to="/success2"
                        >
                          Survey Menyikat
                        </Link>
                      </li>
                    )}
                    {survey2 && (
                      <li>
                        <Link
                          className="btn btn-danger dropdown-item"
                          to="/success3"
                        >
                          Survey Menyikat 2
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
              )}
              {username ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {username}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="btn btn-danger dropdown-item"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li>
                  <Link to="/login" className="nav-item nav-link">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

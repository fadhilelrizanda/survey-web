import React from "react";
import SplashImg from "../assets/images/splash_img-removebg-preview.png"; // Make sure to import your image
import "./Splash.css";

const Splash: React.FC = () => {
  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center splash_bg"
        style={{ height: "100vh" }}
      >
        <div className="row">
          <div className="col splash_img">
            <img src={SplashImg} alt="ECC Dentch" className="img-fluid" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Splash;

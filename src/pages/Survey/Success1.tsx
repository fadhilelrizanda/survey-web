import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import "react-circular-progressbar/dist/styles.css";
import "./Success.css";
import CardSuccess from "./CardSuccess";
import imgTeeth from "../../assets/images/teeth.jpg"; // Example image
import "./Success.css";

function SuccessSikat() {
  const [showCard, setShowCard] = useState(false); // State to track if the card is shown
  const data_score_string1 = sessionStorage.getItem("s0Score");
  const data_score1 = parseInt(data_score_string1 || "0");

  // Function to handle the image click and show the CardSuccess
  const handleImageClick = () => {
    setShowCard(true); // Show the card
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          {/* Conditionally render the image or the CardSuccess component */}
          {!showCard ? (
            <>
              <h3 className="text-center mt-5 mb-4">
                Klik Gambar Untuk Melihat Score Anda
              </h3>
              <img
                src={imgTeeth}
                alt="Click to reveal success"
                className="clickable-image"
                onClick={handleImageClick}
                style={{ cursor: "pointer", width: "800px", height: "auto" }} // Add some styling
              />
            </>
          ) : (
            // Display the CardSuccess component after the image is clicked
            <CardSuccess title="Keterangan Anda" data_score={data_score1} />
          )}
        </div>
      </div>
    </>
  );
}

export default SuccessSikat;

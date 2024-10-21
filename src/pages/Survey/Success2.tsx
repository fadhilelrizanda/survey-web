import Navbar from "../../components/Navbar";
import { useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import "./Success.css";
import imgTeeth from "../../assets/images/teeth.jpg"; // Example image
import CardSuccess from "./CardSuccess";
function SuccessSikat() {
  const [showCard, setShowCard] = useState(false);
  const data_score_string1 = sessionStorage.getItem("s1Score");
  const data_score1 = parseInt(data_score_string1 || "0");

  const data_score_string11 = sessionStorage.getItem("s11Score");
  const data_score11 = parseInt(data_score_string11 || "0");

  const data_score_string111 = sessionStorage.getItem("s111Score");
  const data_score111 = parseInt(data_score_string111 || "0");
  const handleImageClick = () => {
    setShowCard(true); // Show the card
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
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
            <>
              <CardSuccess title="Keterangan Nilai" data_score={data_score1} />
              <CardSuccess title="Keterangan Nilai" data_score={data_score11} />
              <CardSuccess
                title="Keterangan Nilai"
                data_score={data_score111}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SuccessSikat;

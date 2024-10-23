import { useState } from "react";
import Navbar from "../../components/Navbar";
import "react-circular-progressbar/dist/styles.css";
import "./Success.css";
import CardSuccess from "./CardSuccess";
import imgHealthyTeeth from "../../assets/images/img_teeth/healthy_teeth.jpeg";
import imgNotHealthyTeeth from "../../assets/images/img_teeth/not_healthy_teeth.jpeg";
import imgGoodTeeth from "../../assets/images/img_teeth/good_teeth.jpeg";
import "./Success.css";
import { getDescription } from "../../utils/utils";

function SuccessSikat() {
  const [showCard, setShowCard] = useState(false); // State to track if the card is shown
  const data_score_string1 = sessionStorage.getItem("s0Score");
  const data_score1 = parseInt(data_score_string1 || "0");
  const class_score = getDescription(data_score1);
  let class_img;
  if (class_score === "Tidak Baik (Beresiko)") {
    class_img = imgNotHealthyTeeth;
  } else if (class_score === "Kurang Baik (Beresiko)") {
    class_img = imgHealthyTeeth;
  } else {
    class_img = imgGoodTeeth;
  }
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
                src={class_img}
                alt="Click to reveal success"
                className="clickable-image"
                onClick={handleImageClick}
                style={{ cursor: "pointer", width: "400px", height: "auto" }} // Add some styling
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

import Navbar from "../../components/Navbar";
import { useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import "./Success.css";
import CardSuccess from "./CardSuccess";
import imgHealthyTeeth from "../../assets/images/img_teeth/healthy_teeth.jpeg";
import imgNotHealthyTeeth from "../../assets/images/img_teeth/not_healthy_teeth.jpeg";
import imgGoodTeeth from "../../assets/images/img_teeth/good_teeth.jpeg";
import { getDescription } from "../../utils/utils";

function SuccessSikat() {
  const [showCard, setShowCard] = useState(false);
  const data_score_string1 = sessionStorage.getItem("s2Score");
  const data_score1 = parseInt(data_score_string1 || "0");

  const data_score_string11 = sessionStorage.getItem("s22Score");
  const data_score11 = parseInt(data_score_string11 || "0");

  const data_score_string111 = sessionStorage.getItem("s222Score");
  const data_score111 = parseInt(data_score_string111 || "0");
  const data_mean = (data_score1 + data_score11 + data_score111) / 3;
  const class_score = getDescription(data_mean);
  let class_img;
  if (class_score === "Tidak Baik (Beresiko)") {
    class_img = imgNotHealthyTeeth;
  } else if (class_score === "Kurang Baik (Beresiko)") {
    class_img = imgHealthyTeeth;
  } else {
    class_img = imgGoodTeeth;
  }
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
                src={class_img}
                alt="Click to reveal success"
                className="clickable-image"
                onClick={handleImageClick}
                style={{ cursor: "pointer", width: "400px", height: "auto" }} // Add some styling
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

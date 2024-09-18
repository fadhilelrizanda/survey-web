import Navbar from "../components/Navbar";
import ImgHero from "../assets/images/home-img/hero-kid.png";
import imgMilk from "../assets/images/home-img/milk.jpg";
import imgBrush from "../assets/images/home-img/brush.jpg";
import imgParenting from "../assets/images/home-img/parenting.jpg";
import CardSurvey from "../components/CardSurvey";
import Gmaps from "../components/Gmaps";
import "./Home.css";
import { Link } from "react-router-dom";
import ProfileSection from "../components/ProfileSection";
import Footer from "../components/Footer";
function Home() {
  const text_susu =
    "Pemberian susu formula merupakan bagian penting dalam pola makan anak-anak, terutama di usia dini. Melalui survey ini, kami ingin memahami lebih dalam mengenai kebiasaan pemberian susu formula kepada anak-anak dan bagaimana hal ini memengaruhi kesehatan gigi mereka.";
  console.log(sessionStorage.getItem("userId"));
  const s0Score = sessionStorage.getItem("s0Score");
  const s1Score = sessionStorage.getItem("s1Score");
  const s2Score = sessionStorage.getItem("s2Score");
  let S0state = false;
  let S1state = false;
  let S2state = false;
  if (s0Score) {
    S0state = true;
  }
  if (s1Score) {
    S1state = true;
  }
  if (s2Score) {
    S2state = true;
  }
  return (
    <>
      <div className="wrapper-navbar-hero pastel-color">
        <div className="container-fluid">
          <div className="row navbar-section">
            <Navbar />
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-5 text-section text-family col-12 order-1 order-md-0">
              <div className="text-content">
                <h3>Wujudkan Masa Depan Anak dengan Gigi Sehat</h3>
                <p>
                  Dengan menjaga kesehatan gigi sejak dini, kita dapat mencegah
                  masalah yang lebih besar di masa mendatang. Ikuti survei kami
                  untuk membantu anak-anak tumbuh dengan senyum sehat
                </p>
                <a href="#survey">
                  <button className="btn btn-primary btn-round">
                    Lakukan Survey
                  </button>
                </a>
              </div>
            </div>
            <div className="col-md-7 col-12 hero-img  mt-5 order-0 order-md-1">
              <img src={ImgHero} className="img-fluid " />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <ProfileSection />
        <div className="row  survey-section mt-5">
          <h4 className="pb-5" id="survey">
            Survey Kesehatan Gigi
          </h4>
          <div className="row">
            <div className="col-md-8  mx-auto">
              {/* <p>
                Kami melakukan beberapa survei terkait pemberian susu formula,
                menyikat gigi, dan pola asuh orang tua terhadap kesehatan gigi
                anak. Survei ini bertujuan untuk memahami kebiasaan dan
                pengetahuan orang tua dalam merawat kesehatan gigi anak-anak
                mereka. Data yang dikumpulkan akan membantu dalam merancang
                program edukasi dan intervensi yang lebih efektif. Partisipasi
                Anda sangat penting dalam upaya meningkatkan kesehatan gigi
                anak-anak di masyarakat.
              </p> */}
            </div>
          </div>
          <CardSurvey
            title={"Survey Pemberian Susu Formula"}
            text={text_susu}
            imgSurvey={imgMilk}
            inverse={true}
            alignRight={false}
            route={"/surveya"}
            state={S0state}
          />
          <div className="mt-5"></div>
          <CardSurvey
            title={"Survey Menyikat Gigi"}
            text={text_susu}
            imgSurvey={imgBrush}
            inverse={false}
            alignRight={true}
            route={"/surveyb"}
            state={S1state}
          />
          <div className="mt-5"></div>
          <CardSurvey
            title={"Survey Pola Asuh Orang Tua"}
            text={text_susu}
            imgSurvey={imgParenting}
            inverse={true}
            alignRight={false}
            route={"/surveyc"}
            state={S2state}
          />
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <h3 className="text-center mb-5">
            {" "}
            Lokasi FKG Universitas Baiturrahmah
          </h3>
          <Gmaps />
        </div>
      </div>
      <div className="container-fluid">
        <Footer />
      </div>
    </>
  );
}

export default Home;

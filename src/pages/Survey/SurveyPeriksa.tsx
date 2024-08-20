import BackBtn from "../../components/BackBtn";
import Navbar from "../../components/Navbar";
// import SurveyForm from "../../components/SurveyForm";

// const questions = {
//   "1. Nama Lengkap": 0,
//   "2. Apakah Anda ...?": 1,
//   "3. Apakah Anda ...?": 1,
//   "4. Apakah Anda ...?": 1,
// };

function SurveyPeriksa() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Navbar />
        </div>
      </div>
      <div className="container mt-5">
        <BackBtn />
        <div className="row card-survey justify-content-center mt-5">
          <h3 className="mb-5">Survey Pola Periksa Gigi</h3>
          {/* <SurveyForm questions={questions} /> */}
        </div>
      </div>
    </>
  );
}

export default SurveyPeriksa;

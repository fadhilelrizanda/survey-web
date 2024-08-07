import Navbar from "../../components/Navbar";
import SurveyForm from "../../components/SurveyForm";
const questions = {
  "1. Nama Lengkap": 0,
  "2. Apakah Anda ...?": 1,
  "3. Apakah Anda ...?": 1,
  "4. Apakah Anda ...?": 1,
};

function SurveyPeriksa() {
  return (
    <>
      <div className="container-fluid">
        <Navbar />
      </div>
      <div className="container mt-5">
        <div className="row card-survey justify-content-center mt-5">
          <h3 className="mb-5">Survey Pola Periksa Gigi</h3>
          <SurveyForm questions={questions} />
        </div>
      </div>
    </>
  );
}

export default SurveyPeriksa;

import Navbar from "../../components/Navbar";
import SurveyForm from "../../components/SurveyForm";
const questions = {
  "1. Nama Lengkap": 0,
  "2. Apakah Anda ...?": 1,
  "3. Apakah Anda ...?": 1,
  "4. Apakah Anda ...?": 1,
};
const answers = {
  questions1: 1,
  questions2: 1,
  questions3: 1,
  questions4: 1,
};

function SurveyAsuh() {
  return (
    <>
      <div className="container-fluid">
        <Navbar />
      </div>
      <div className="container mt-5">
        <div className="row card-survey justify-content-center mt-5">
          <h3 className="mb-5">Survey Pola Asuh Orang Tua</h3>
          <SurveyForm questions={questions} correct_answers={answers} />
        </div>
      </div>
    </>
  );
}

export default SurveyAsuh;

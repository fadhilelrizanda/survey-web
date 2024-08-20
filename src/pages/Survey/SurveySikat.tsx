import BackBtn from "../../components/BackBtn";
import Navbar from "../../components/Navbar";
import SurveyForm from "../../components/SurveyForm";
const questions = {
  "1. Nama Lengkap": 0,
  "2. Apakah Anda ...?": 1,
  "3. Apakah Anda ...?": 1,
  "4. Apakah Anda ...?": 1,
  "5. Apakah Anda ...?": 1,
};

const correct_answers = {
  question1: 1,
  question2: 1,
  question3: 1,
  question4: 1,
  question5: 1, // Ensure this matches the number of questions
};

function SurveySikat() {
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
          <h3 className="mb-5">Survey Menyikat Gigi</h3>
          <SurveyForm questions={questions} correct_answers={correct_answers} />
        </div>
      </div>
    </>
  );
}

export default SurveySikat;

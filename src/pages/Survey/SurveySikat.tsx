import BackBtn from "../../components/BackBtn";
import Navbar from "../../components/Navbar";
import SurveyForm from "../../components/SurveyForm";
import { getAllQuestion } from "../../services/api/apiData";
import { useEffect, useState } from "react";

function SurveySikat() {
  // const [personalQuest, setPersonalQuest] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const surveyCode = 0;

  const fetchQuestions = async () => {
    try {
      // const dataPersonal = await getAllPersonalQuestion(surveyCode);
      const data = await getAllQuestion(surveyCode);
      // setPersonalQuest(dataPersonal);
      setQuestions(data);
    } catch (error) {
      setError("Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <BackBtn />
        <div className="row card-survey justify-content-center mt-5">
          <h3 className="mb-5">Survey Pola Menyikat Gigi</h3>
          {loading && <p>Loading questions...</p>}
          {error && <p>{error}</p>}
          <SurveyForm questions={questions} surveyType={0} />
        </div>
      </div>
    </>
  );
}

export default SurveySikat;

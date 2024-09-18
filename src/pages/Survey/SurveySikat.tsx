import BackBtn from "../../components/BackBtn";
import Navbar from "../../components/Navbar";
import SurveyForm2 from "../../components/SurveyForm2";
import { getAllQuestion } from "../../services/api/apiData";
import { useEffect, useState } from "react";

function SurveySikat() {
  // const [personalQuest, setPersonalQuest] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [questions1, setQuestions1] = useState<any[]>([]);
  const [questions2, setQuestions2] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = async () => {
    try {
      // const dataPersonal = await getAllPersonalQuestion(surveyCode);
      const data = await getAllQuestion(1);
      const data2 = await getAllQuestion(11);
      const data3 = await getAllQuestion(111);
      console.log(data2);
      console.log(data3);
      // setPersonalQuest(dataPersonal);
      setQuestions(data);
      setQuestions1(data2);
      setQuestions2(data3);
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
          <SurveyForm2
            questions={questions}
            questions1={questions1}
            questions2={questions2}
          />
        </div>
      </div>
    </>
  );
}

export default SurveySikat;

import BackBtn from "../../components/BackBtn";
import Navbar from "../../components/Navbar";
import SurveyForm2 from "../../components/SurveyForm2";
import { getAllQuestion } from "../../services/api/apiData";
import { useEffect, useState } from "react";
import "./Survey.css";

function Survey3() {
  // const [personalQuest, setPersonalQuest] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [questions1, setQuestions1] = useState<any[]>([]);
  const [questions2, setQuestions2] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const surveyCode = [2, 22, 222];
  const surveyName = ["Demokratis", "Otoriter", "Permisif"];
  const sessionName = ["s2Score", "s22Score", "s222Score"];
  const fetchQuestions = async () => {
    try {
      // const dataPersonal = await getAllPersonalQuestion(surveyCode);
      const data = await getAllQuestion(2);
      const data2 = await getAllQuestion(22);
      const data3 = await getAllQuestion(222);
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
        <h3 className="mb-5 text-center">Survey 3</h3>

        {loading && <p>Loading questions...</p>}
        {error && <p>{error}</p>}
        <SurveyForm2
          questions={questions}
          questions1={questions1}
          questions2={questions2}
          surveyCode={surveyCode}
          surveyName={surveyName}
          sessionName={sessionName}
        />
      </div>
    </>
  );
}

export default Survey3;

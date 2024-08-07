import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "./Dashboard.css";
import Sidebar from "../../components/Sidebar";
import QuestionEntry from "../../components/QuestionEntry";
import { getAllQuestion, deleteQuestion } from "../../services/api/apiData";

const AdminSurveySusu: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const survey = "surveyasuh";

  const fetchQuestions = async () => {
    try {
      const data = await getAllQuestion(survey);
      setQuestions(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch questions");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteQuestion(id);
      fetchQuestions(); // Refresh the question list after deleting a question
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  const handleAddQuestion = (newQuestion: any) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]); // Add the new question to the list
  };

  return (
    <>
      <div className="container-fluid">
        <Navbar />
      </div>
      <div className="container-fluid border-hightlight mt-5">
        <div className="row">
          <Sidebar />
          <div className="col-md-10 border-hightlight">
            <h3>Survey Pemberian Susu</h3>
            <p>List Pertanyaan</p>
            {loading && <p>Loading questions...</p>}
            {error && <p>{error}</p>}
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Question</th>
                  <th scope="col">Question Type</th>
                  <th scope="col">Answer Key</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{question.question}</td>
                    <td>{question.questionType}</td>
                    <td>{question.keyAnswer}</td>
                    <td>
                      <button onClick={() => handleDelete(question._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul></ul>
            <p>Tambahkan Pertanyaan</p>
            <QuestionEntry onAddQuestion={handleAddQuestion} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSurveySusu;

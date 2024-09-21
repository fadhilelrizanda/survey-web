/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import QuestionEntry from "../../components/QuestionEntry";
import UpdateModal from "../../components/UpdateModal";
import PersonalQuestion from "../../components/PersonalQuestion";
import {
  getAllQuestion,
  deleteQuestion,
  updateQuestion,
  getAllPersonalQuestion,
  deletePersonalQuestion,
  gettAllAns,
  deleteAns,
} from "../../services/api/apiData";

interface AnswerData {
  _id: string;
  pq: { [key: string]: string }; // Assuming pq values are strings
  ans: number[];
  score: number;
  surveyType: number;
}

const AdminPolaAsuh: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [personalQuest, setPersonalQuest] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [answerData, setAnswerData] = useState<AnswerData[]>([]);

  const surveyCode = 1;
  const PersonalQuestType = ["Text", "Jenis Kelamin", "Angka", "Tanggal"]; // Adjusted types for Personal Questions
  const questAns = [
    ["Tidak", "Iya"],
    ["Tidak Pernah", "Kadang-kadang", "Selalu"],
    [
      "Sangat Tidak Setuju",
      "Tidak Setuju",
      "Kurang Setuju",
      "Setuju",
      "Sangat Setuju",
    ],
  ];
  const questType = ["Benar/Salah", "Pilihan Ganda"];

  const fetchQuestions = async () => {
    try {
      const data = await getAllQuestion(surveyCode);
      const dataPersonal = await getAllPersonalQuestion(surveyCode);
      const dataAns = await gettAllAns(surveyCode); //
      const formattedDataAns = dataAns.map((item: any) => ({
        ...item,
        pq: Object.fromEntries(
          Object.entries(item.pq).map(([key, value]) => [key, value])
        ),
      }));
      setAnswerData(formattedDataAns);

      setQuestions(data);
      setPersonalQuest(dataPersonal);
    } catch (error) {
      setError("Failed to fetch questions");
    } finally {
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

  const handleDeletePersonal = async (id: string) => {
    try {
      await deletePersonalQuestion(id);
      fetchQuestions(); // Refresh the question list after deleting a question
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  const handleDeleteAns = async (id: string) => {
    try {
      await deleteAns(id);
      fetchQuestions(); // Refresh the question list after deleting a question
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  const handleAddPersonalQuestion = (newQuestion: any) => {
    setPersonalQuest((prevQuestions) => [...prevQuestions, newQuestion]); // Add the new question to the list
  };

  const handleAddQuestion = (newQuestion: any) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]); // Add the new question to the list
  };

  const handleUpdate = (question: any) => {
    setCurrentQuestion(question); // Set the question to be updated
    setShowModal(true); // Show the modal
  };

  const handleSaveChanges = async (updatedQuestion: any) => {
    try {
      const response = await updateQuestion(updatedQuestion._id, {
        question: updatedQuestion.question,
        questionType: updatedQuestion.questionType,
        keyAnswer: updatedQuestion.keyAnswer,
        score: updatedQuestion.score,
      });

      // Update the question in the local state
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q._id === updatedQuestion._id ? response : q))
      );
    } catch (error) {
      console.error("Failed to update question:", error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Navbar />
        </div>
      </div>
      <div className="container-fluid border-highlight mt-5">
        <div className="row">
          <Sidebar />
          <div className="col-md-10 border-highlight">
            <h3>
              Survey Pola Asuh Orang tua Terhadap Kejadian Karies Gigi Pada Anak
            </h3>
            <button className="btn btn-primary">List Data</button>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Data personal</th>
                  <th scope="col">Jawaban</th>
                  <th scope="col">Score</th>
                  <th scope="col">Survey</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {answerData.map((ans, index) => (
                  <tr key={ans._id}>
                    <td>{index + 1}.</td>
                    <td>
                      {Object.entries(ans.pq).map(([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong> {value}
                        </div>
                      ))}
                    </td>
                    <td>{ans.ans.join(", ")}</td>
                    <td>{ans.score}</td>
                    <td>{ans.surveyType}</td>
                    <td>
                      {" "}
                      <button
                        onClick={() => handleDeleteAns(ans._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-primary mt-5">Pertanyaan Pribadi</button>
            <PersonalQuestion
              surveyType={0} // Example survey type
              onAddQuestion={handleAddPersonalQuestion}
            />
            {loading && <p>Loading questions...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
              <>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Pertanyaan</th>
                      <th scope="col">Jenis Pertanyaan</th>
                      <th scope="col">Survey</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personalQuest.map((pq, index) => (
                      <tr key={pq._id}>
                        <td>{index + 1}.</td>
                        <td>{pq.question}</td>
                        <td>{PersonalQuestType[pq.questionType]}</td>
                        <td>{pq.surveyType}</td>
                        <td>
                          <button
                            onClick={() => handleDeletePersonal(pq._id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleUpdate(pq)}
                            className="btn btn-warning"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button className="btn btn-primary mt-5">
                  List Pertanyaan
                </button>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Pertanyaan</th>
                      <th scope="col">Jenis Pertanyaan</th>
                      <th scope="col">Jawaban</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.map((question, index) => (
                      <tr key={question._id}>
                        <td>{index + 1}.</td>
                        <td>{question.question}</td>
                        <td>{questType[question.questionType]}</td>
                        <td>
                          {questAns[question.questionType][question.keyAnswer]}
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(question._id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleUpdate(question)}
                            className="btn btn-warning"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <QuestionEntry
                  onAddQuestion={handleAddQuestion}
                  surveyType={0}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <UpdateModal
        show={showModal}
        onHide={() => setShowModal(false)}
        question={currentQuestion}
        onSave={handleSaveChanges}
      />
    </>
  );
};

export default AdminPolaAsuh;

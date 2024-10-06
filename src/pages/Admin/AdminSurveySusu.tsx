/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import QuestionEntry from "../../components/QuestionEntry";
import UpdateModal from "../../components/UpdateModal";
import "./AdminSurveySusu.css";
import {
  getAllQuestion,
  deleteQuestion,
  updateQuestion,
  gettAllAns,
  deleteAns,
  deleteUser,
} from "../../services/api/apiData";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import VisualGraph from "./VisualGraph";
import TableAns from "./TableAns";
import TableQuestions from "./TableQuestions";
import { downloadExcel } from "../../utils/utils";

Chart.register(CategoryScale);

interface AnswerData {
  _id: string;
  pq: { [key: string]: string }; // Assuming pq values are strings
  ans: number[];
  score: number;
  surveyType: number;
  user: {
    name: string;
    childname: string;
  };
}

const AdminSurveySusu: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [answerData, setAnswerData] = useState<AnswerData[]>([]);
  // Pie chart data state
  const [pieChartData, setPieChartData] = useState({
    labels: [] as string[], // Labels for the pie chart
    datasets: [
      {
        label: "Score Distribution",
        data: [] as number[], // Data for the pie chart
        backgroundColor: [
          "rgba(75,192,192,1)",
          "rgba(255,99,132,1)",
          "rgba(54,162,235,1)",
          "rgba(255,206,86,1)",
          "rgba(153,102,255,1)",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  // Stacked bar chart data state
  const [stackedBarChartData, setStackedBarChartData] = useState({
    labels: [] as string[], // Labels for the x-axis
    datasets: [] as any[], // Datasets for the stacked bar chart
  });

  const surveyCode = 0;

  const fetchQuestions = async () => {
    try {
      const data = await getAllQuestion(surveyCode);
      const dataAns = await gettAllAns(surveyCode);

      console.log("Raw Questions Data:", data);
      console.log("Raw Answers Data:", dataAns);
      setQuestions(data);
      setAnswerData(dataAns);

      // Calculate the score distribution for the pie chart
      const scoreDistribution: { [key: number]: number } = {};
      dataAns.forEach((ans: AnswerData) => {
        scoreDistribution[ans.score] = (scoreDistribution[ans.score] || 0) + 1;
      });
      console.log("Score Distribution:", scoreDistribution);

      setPieChartData({
        labels: Object.keys(scoreDistribution).map(
          (score) => `Score: ${score}`
        ),
        datasets: [
          {
            ...pieChartData.datasets[0],
            data: Object.values(scoreDistribution),
          },
        ],
      });
      console.log("Pie Chart Data:", pieChartData);

      // Prepare data for the stacked bar chart
      const numQuestions = 20; // Set this according to the number of questions
      const stackedBarData = [
        {
          label: "Iya",
          data: Array(numQuestions).fill(0),
          backgroundColor: "rgba(75, 192, 192, 0.6)", // Color for "iya"
        },
        {
          label: "Tidak",
          data: Array(numQuestions).fill(0),
          backgroundColor: "rgba(153, 102, 255, 0.6)", // Color for "tidak"
        },
      ];

      // Count the occurrences of each answer for each question
      dataAns.forEach((ans: AnswerData) => {
        ans.ans.forEach((answer, qIndex) => {
          if (qIndex < numQuestions) {
            if (answer === 0) {
              stackedBarData[1].data[qIndex] += 1; // "Tidak"
            } else if (answer === 1) {
              stackedBarData[0].data[qIndex] += 1; // "Iya"
            }
          }
        });
      });

      setStackedBarChartData({
        labels: Array.from(
          { length: numQuestions },
          (_, index) => `Question ${index + 1}`
        ),
        datasets: stackedBarData,
      });
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

  const handleDeleteAns = async (id: string) => {
    try {
      await deleteAns(id);
      await deleteUser(id);
      fetchQuestions(); // Refresh the question list after deleting a question
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
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
  const handleDownload = () => {
    const surveyType = 0;
    downloadExcel(surveyType);
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid  mt-5">
        <div className="row">
          <Sidebar />
          <div className="col-md-10 content">
            <button className="btn btn-primary" onClick={handleDownload}>
              Download Survey Data
            </button>
            <h3 className="mt-2 text-center">Survey 1</h3>
            <VisualGraph
              pieChartData={pieChartData}
              stackedBarChartData={stackedBarChartData}
            />

            <div className="row mt-5 justify-content-center">
              <button className="btn btn-primary mb-4">List Data</button>
              <TableAns
                answerData={answerData}
                handleDeleteAns={handleDeleteAns}
              />
            </div>
            {loading && <p>Loading questions...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
              <>
                <div className="row justify-content-center">
                  <button className="btn btn-primary mt-5 mb-4">
                    List Pertanyaan
                  </button>

                  <div className="col-md-10">
                    <TableQuestions
                      questions={questions}
                      handleDelete={handleDelete}
                      handleUpdate={handleUpdate}
                    />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <button className="btn btn-primary mt-5 mb-4">
                    Form Pertanyaan
                  </button>
                  <div className="col-md-10">
                    <QuestionEntry
                      onAddQuestion={handleAddQuestion}
                      surveyType={0}
                    />
                  </div>
                </div>
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

export default AdminSurveySusu;

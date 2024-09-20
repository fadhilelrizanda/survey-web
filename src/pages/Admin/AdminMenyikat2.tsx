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
} from "../../services/api/apiData";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import TableAns from "./TableAns";
import TableQuestions from "./TableQuestions";
import VisualGraph from "./VisualGraph";

Chart.register(CategoryScale);

interface AnswerData {
  _id: string;
  ans: number[];
  score: number;
  surveyType: number;
}

export const AdminMenyikat2: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [questions1, setQuestions1] = useState<any[]>([]);
  const [questions2, setQuestions2] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [answerData, setAnswerData] = useState<AnswerData[]>([]);
  const [answerData1, setAnswerData1] = useState<AnswerData[]>([]);
  const [answerData2, setAnswerData2] = useState<AnswerData[]>([]);
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
  const [pieChartData1, setPieChartData1] = useState({
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
  const [pieChartData2, setPieChartData2] = useState({
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
  const [stackedBarChartData1, setStackedBarChartData1] = useState({
    labels: [] as string[], // Labels for the x-axis
    datasets: [] as any[], // Datasets for the stacked bar chart
  });
  const [stackedBarChartData2, setStackedBarChartData2] = useState({
    labels: [] as string[], // Labels for the x-axis
    datasets: [] as any[], // Datasets for the stacked bar chart
  });

  const surveyCode = 2;
  const surveyCode1 = 2;
  const surveyCode2 = 222;

  const fetchQuestions = async () => {
    try {
      const data = await getAllQuestion(surveyCode);
      const dataAns = await gettAllAns(surveyCode);
      const dataAns1 = await gettAllAns(surveyCode1);
      const dataAns2 = await gettAllAns(surveyCode2);

      const questData1 = await getAllQuestion(surveyCode1);
      // const dataAns2 = await gettAllAns(surveyCode1);

      const questData2 = await getAllQuestion(surveyCode2);
      // const dataAns3 = await gettAllAns(surveyCode2);

      console.log("Raw Questions Data:", data);

      console.log("Raw Answers Data:", dataAns);

      setQuestions(data);
      setQuestions1(questData1);
      setQuestions2(questData2);

      setAnswerData(dataAns);
      setAnswerData1(dataAns1);
      setAnswerData2(dataAns2);

      // Calculate the score distribution for the pie chart
      const scoreDistribution: { [key: number]: number } = {};
      const scoreDistribution1: { [key: number]: number } = {};
      const scoreDistribution2: { [key: number]: number } = {};
      dataAns.forEach((ans: AnswerData) => {
        scoreDistribution[ans.score] = (scoreDistribution[ans.score] || 0) + 1;
      });
      dataAns1.forEach((ans: AnswerData) => {
        scoreDistribution1[ans.score] =
          (scoreDistribution1[ans.score] || 0) + 1;
      });
      dataAns2.forEach((ans: AnswerData) => {
        scoreDistribution2[ans.score] =
          (scoreDistribution2[ans.score] || 0) + 1;
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

      setPieChartData1({
        labels: Object.keys(scoreDistribution1).map(
          (score) => `Score: ${score}`
        ),
        datasets: [
          {
            ...pieChartData1.datasets[0],
            data: Object.values(scoreDistribution1),
          },
        ],
      });

      setPieChartData2({
        labels: Object.keys(scoreDistribution2).map(
          (score) => `Score: ${score}`
        ),
        datasets: [
          {
            ...pieChartData2.datasets[0],
            data: Object.values(scoreDistribution2),
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
      const stackedBarData1 = [
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
      const stackedBarData2 = [
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
      dataAns1.forEach((ans: AnswerData) => {
        ans.ans.forEach((answer, qIndex) => {
          if (qIndex < numQuestions) {
            if (answer === 0) {
              stackedBarData1[1].data[qIndex] += 1; // "Tidak"
            } else if (answer === 1) {
              stackedBarData1[0].data[qIndex] += 1; // "Iya"
            }
          }
        });
      });
      dataAns2.forEach((ans: AnswerData) => {
        ans.ans.forEach((answer, qIndex) => {
          if (qIndex < numQuestions) {
            if (answer === 0) {
              stackedBarData2[1].data[qIndex] += 1; // "Tidak"
            } else if (answer === 1) {
              stackedBarData2[0].data[qIndex] += 1; // "Iya"
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

      setStackedBarChartData1({
        labels: Array.from(
          { length: numQuestions },
          (_, index) => `Question ${index + 1}`
        ),
        datasets: stackedBarData1,
      });

      setStackedBarChartData2({
        labels: Array.from(
          { length: numQuestions },
          (_, index) => `Question ${index + 1}`
        ),
        datasets: stackedBarData2,
      });
    } catch (error) {
      setError("Failed to fetch questions");
      console.log(error);
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
      fetchQuestions(); // Refresh the question list after deleting a question
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  const handleAddQuestion = (newQuestion: any) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]); // Add the new question to the list
  };

  const handleAddQuestion1 = (newQuestion: any) => {
    setQuestions1((prevQuestions) => [...prevQuestions, newQuestion]); // Add the new question to the list
  };

  const handleAddQuestion2 = (newQuestion: any) => {
    setQuestions2((prevQuestions) => [...prevQuestions, newQuestion]); // Add the new question to the list
  };

  const handleUpdate = (question: any) => {
    setCurrentQuestion(question); // Set the question to be updated
    setShowModal(true); // Show the modal
  };

  const handleSaveChanges = async (updatedQuestion: any) => {
    try {
      console.log(updatedQuestion);
      const response = await updateQuestion(updatedQuestion._id, {
        question: updatedQuestion.question,
        questionType: updatedQuestion.questionType,
        keyAnswer: updatedQuestion.keyAnswer,
        score: updatedQuestion.score,
      });
      if (response) {
        await fetchQuestions();
      }
    } catch (error) {
      console.error("Failed to update question:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid  mt-5">
        <div className="row">
          <Sidebar />
          <div className="col-md-10 ">
            <div className="row content mb-5">
              <h3 className="mt-5 text-center">Survey 3</h3>
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
                        surveyType={surveyCode}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* survey sikap */}
            <div className="row content mb-5">
              <h3 className="mt-5 text-center">Survey Sikap</h3>
              <VisualGraph
                pieChartData={pieChartData1}
                stackedBarChartData={stackedBarChartData1}
              />

              <div className="row mt-5 justify-content-center">
                <button className="btn btn-primary mb-4">List Data</button>
                <TableAns
                  answerData={answerData1}
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
                        questions={questions1}
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
                        onAddQuestion={handleAddQuestion1}
                        surveyType={surveyCode1}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* survey action */}
            <div className="row content mb-5">
              <h3 className="mt-5 text-center">Survey Sikap</h3>
              <VisualGraph
                pieChartData={pieChartData2}
                stackedBarChartData={stackedBarChartData2}
              />

              <div className="row mt-5 justify-content-center">
                <button className="btn btn-primary mb-4">List Data</button>
                <TableAns
                  answerData={answerData2}
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
                        questions={questions2}
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
                        onAddQuestion={handleAddQuestion2}
                        surveyType={surveyCode2}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>{" "}
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

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
import PieChart from "../../components/PieChart";
import StackedBarChart from "../../components/StackedBarChart";

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
  // const [answerData1, setAnswerData1] = useState<AnswerData[]>([]);
  // const [answerData2, setAnswerData2] = useState<AnswerData[]>([]);
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

  const surveyCode = 2;
  const surveyCode1 = 22;
  const surveyCode2 = 222;
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
      const dataAns = await gettAllAns(surveyCode);

      const questData1 = await getAllQuestion(surveyCode1);
      // const dataAns2 = await gettAllAns(surveyCode1);

      const questData2 = await getAllQuestion(surveyCode2);
      // const dataAns3 = await gettAllAns(surveyCode2);

      console.log("Raw Questions Data:", data);

      console.log("Raw Answers Data:", dataAns);

      // const formattedDataAns = dataAns.map((item: any) => {
      //   console.log(item.pq);
      //   return {
      //     ...item,
      //     pq: Object.fromEntries(
      //       Object.entries(item.pq).map(([key, value]) => [key, value])
      //     ),
      //   };
      // });
      // const formattedDataAns2 = dataAns2.map((item: any) => ({
      //   ...item,
      //   pq: Object.fromEntries(
      //     Object.entries(item.pq).map(([key, value]) => [key, value])
      //   ),
      // }));
      // console.log("Formatted Answers Data:", formattedDataAns);

      setQuestions(data);
      setQuestions1(questData1);
      setQuestions2(questData2);

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
      const response = await updateQuestion(updatedQuestion._id, {
        question: updatedQuestion.question,
        questionType: updatedQuestion.questionType,
        keyAnswer: updatedQuestion.keyAnswer,
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
          <div className="col-md-10 border-highlight content">
            <h3 className="mt-5 text-center">Survey Menyikat Gigi</h3>
            <h4 className="mt-5 text-center">Survey DEMOKRATIS</h4>
            <div className="row mt-5">
              <h4 className="text-center mt-2 mb-5">Statistic Survey</h4>
              <div className="col-md-3">
                <div className="graph">
                  <PieChart
                    chartData={pieChartData}
                    text_data={"Statistik Persebaran Score"}
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="graph">
                  <StackedBarChart data={stackedBarChartData} />
                </div>
              </div>
            </div>

            <button className="btn btn-primary">List Data</button>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Data personal</th>
                  {/* <th scope="col">Jawaban</th> */}
                  <th scope="col">Score</th>
                  {/* <th scope="col">Survey</th> */}
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {answerData.map((ans, index) => (
                  <tr key={ans._id}>
                    <td>{index + 1}.</td>
                    <td>
                      {/* {Object.entries(ans.pq).map(([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong> {value}
                        </div>
                      ))} */}
                    </td>

                    <td>{ans.score}</td>

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

            {loading && <p>Loading questions...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
              <>
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
                      <th scope="col">score</th>
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
                        <td>{question.score}</td>
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
                  surveyType={2}
                />
              </>
            )}

            {/* survey sikap */}
            <div className="row section-attitude">
              <div className="col-md-10 border-highlight content">
                <h3 className="mt-5 text-center">Survey Menyikat Gigi</h3>
                <h4 className="mt-5 text-center">Survey OTORITER</h4>
                <div className="row mt-5">
                  <h4 className="text-center mt-2 mb-5">Statistic Survey</h4>
                  <div className="col-md-3">
                    <div className="graph">
                      <PieChart
                        chartData={pieChartData}
                        text_data={"Statistik Persebaran Score"}
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="graph">
                      <StackedBarChart data={stackedBarChartData} />
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary">List Data</button>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Data personal</th>
                      {/* <th scope="col">Jawaban</th> */}
                      <th scope="col">Score</th>
                      {/* <th scope="col">Survey</th> */}
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {answerData.map((ans, index) => (
                      <tr key={ans._id}>
                        <td>{index + 1}.</td>
                        <td>
                          {/* {Object.entries(ans.pq).map(([key, value]) => (
                            <div key={key}>
                              <strong>{key}:</strong> {value}
                            </div>
                          ))} */}
                        </td>

                        <td>{ans.score}</td>

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

                {loading && <p>Loading questions...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && (
                  <>
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
                          <th scope="col">score</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {questions1.map((question, index) => (
                          <tr key={question._id}>
                            <td>{index + 1}.</td>
                            <td>{question.question}</td>
                            <td>{questType[question.questionType]}</td>
                            <td>
                              {
                                questAns[question.questionType][
                                  question.keyAnswer
                                ]
                              }
                            </td>
                            <td>{question.score}</td>
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
                      onAddQuestion={handleAddQuestion1}
                      surveyType={22}
                    />
                  </>
                )}
              </div>
            </div>
            {/* survey action */}
            <div className="row section-attitude">
              <div className="col-md-10 border-highlight content">
                <h3 className="mt-5 text-center">Survey PERMISIF </h3>
                <div className="row mt-5">
                  <h4 className="text-center mt-2 mb-5">Statistic Survey</h4>
                  <div className="col-md-3">
                    <div className="graph">
                      <PieChart
                        chartData={pieChartData}
                        text_data={"Statistik Persebaran Score"}
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="graph">
                      <StackedBarChart data={stackedBarChartData} />
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary">List Data</button>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Data personal</th>
                      {/* <th scope="col">Jawaban</th> */}
                      <th scope="col">Score</th>
                      {/* <th scope="col">Survey</th> */}
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {answerData.map((ans, index) => (
                      <tr key={ans._id}>
                        <td>{index + 1}.</td>
                        <td>
                          {/* {Object.entries(ans.pq).map(([key, value]) => (
                            <div key={key}>
                              <strong>{key}:</strong> {value}
                            </div>
                          ))} */}
                        </td>

                        <td>{ans.score}</td>

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

                {loading && <p>Loading questions...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && (
                  <>
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
                          <th scope="col">score</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {questions2.map((question, index) => (
                          <tr key={question._id}>
                            <td>{index + 1}.</td>
                            <td>{question.question}</td>
                            <td>{questType[question.questionType]}</td>
                            <td>
                              {
                                questAns[question.questionType][
                                  question.keyAnswer
                                ]
                              }
                            </td>
                            <td>{question.score}</td>
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
                      onAddQuestion={handleAddQuestion2}
                      surveyType={222}
                    />
                  </>
                )}
              </div>
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

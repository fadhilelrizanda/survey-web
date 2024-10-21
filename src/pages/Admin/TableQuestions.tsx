interface QuestionProps {
  _id: string;
  question: string;
  questionType: number;
  keyAnswer: number;
  score: number;
}

interface TableQuestionsProps {
  questions: QuestionProps[];
  handleDelete: (id: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleUpdate: any;
}

const TableQuestions: React.FC<TableQuestionsProps> = ({
  questions,
  handleDelete,
  handleUpdate,
}) => {
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
  const questType = ["Benar/Salah", "Pilihan Ganda 3", "Pilihan Ganda 5"];

  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr className="table-primary">
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
              <td>{questAns[question.questionType][question.keyAnswer]}</td>
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
    </>
  );
};

export default TableQuestions;

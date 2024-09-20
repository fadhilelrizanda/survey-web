import React, { useState } from "react";
import { postQuestion } from "../services/api/apiData";

interface QuestionEntryProps {
  onAddQuestion: (newQuestion: {
    question: string;
    questionType: number;
    keyAnswer: number;
    score: number;
    surveyType: number;
  }) => void;
  surveyType: number;
}

const QuestionEntry: React.FC<QuestionEntryProps> = ({
  onAddQuestion,
  surveyType,
}) => {
  const [formValues, setFormValues] = useState({
    question: "",
    questionType: 0,
    keyAnswer: 0,
    score: 0,
    surveyType: surveyType,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: name === "questionType" ? Number(value) : value,
    }));
  };

  const getAnswerOptions = () => {
    const { questionType } = formValues;

    switch (questionType) {
      case 0: // Benar/Salah
        return (
          <>
            <option key="0" value="0">
              Tidak
            </option>
            <option key="1" value="1">
              Ya
            </option>
          </>
        );
      case 1: // Pilihan Ganda (3 pilihan)
        return (
          <>
            <option key="0" value="0">
              Tidak Pernah
            </option>
            <option key="1" value="1">
              Kadang-kadang
            </option>
            <option key="2" value="2">
              Selalu
            </option>
          </>
        );
      case 2: // Pilihan Ganda (5 pilihan)
        return (
          <>
            <option key="0" value="0">
              Sangat Tidak Setuju
            </option>
            <option key="1" value="1">
              Tidak Setuju
            </option>
            <option key="2" value="2">
              Kurang Setuju
            </option>
            <option key="3" value="3">
              Setuju
            </option>
            <option key="4" value="4">
              Sangat Setuju
            </option>
          </>
        );
      default:
        return <option value="">Pilih Jawaban</option>;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(formValues);
      const newQuestion = await postQuestion(formValues);
      onAddQuestion(newQuestion); // Pass the newly added question to the parent component
      setFormValues({
        question: "",
        questionType: 0,
        keyAnswer: 0,
        score: 0,
        surveyType: surveyType,
      }); // Reset form values
    } catch (error) {
      console.error("Failed to post question:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mt-4">
        <label>Pertanyaan</label>
        <input
          type="text"
          className="form-control"
          name="question"
          placeholder="Masukkan Pertanyaan"
          value={formValues.question}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="questionType">Jenis Pertanyaan</label>
        <select
          id="questionType"
          className="form-control"
          name="questionType"
          value={formValues.questionType}
          onChange={handleChange}
          required
        >
          <option value="">Jenis Pertanyaan</option>
          <option value="0">Benar Salah</option>
          <option value="1">Pilihan Ganda (3 pilihan)</option>
          <option value="2">Pilihan Ganda (5 pilihan)</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="keyAnswer">Jawaban Yang Tepat</label>
        <select
          id="keyAnswer"
          className="form-control"
          name="keyAnswer"
          value={formValues.keyAnswer}
          onChange={handleChange}
          required
        >
          <option value="">Pilih Jawaban</option>
          {getAnswerOptions()}
        </select>
      </div>
      <div className="form-group">
        <label>Score</label>
        <input
          type="number"
          className="form-control"
          name="score"
          placeholder="Score Soal"
          value={formValues.score}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-4">
        Submit
      </button>
    </form>
  );
};

export default QuestionEntry;

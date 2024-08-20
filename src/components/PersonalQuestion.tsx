import React, { useState, useEffect } from "react";
import { postPersonalQuestion } from "../services/api/apiData";

interface PersonalQuestionProps {
  surveyType: number; // surveyType as a number prop
  onAddQuestion: (newQuestion: {
    question: string;
    questionType: number;
    surveyType: number;
  }) => void;
}

const PersonalQuestion: React.FC<PersonalQuestionProps> = ({
  surveyType,
  onAddQuestion,
}) => {
  const [formValues, setFormValues] = useState({
    question: "",
    questionType: 0,
    surveyType: surveyType, // Initialize with the passed surveyType
  });

  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      surveyType, // Update surveyType if the prop changes
    }));
  }, [surveyType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: name === "questionType" ? Number(value) : value, // Correctly handle questionType
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newQuestion = await postPersonalQuestion(formValues);
      onAddQuestion(newQuestion); // Pass the newly added question to the parent component
      setFormValues({ question: "", questionType: 0, surveyType }); // Reset form values while keeping surveyType
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
        <label>Jenis Pertanyaan</label>
        <select
          className="form-control"
          name="questionType"
          value={formValues.questionType} // Use correct type
          onChange={handleChange}
          required
        >
          <option value="">Jenis Pertanyaan</option>
          <option value={0}>Text</option>
          <option value={1}>Jenis Kelamin</option>
          <option value={2}>Angka</option>
          <option value={3}>Tanggal</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary mt-4">
        Submit
      </button>
    </form>
  );
};

export default PersonalQuestion;

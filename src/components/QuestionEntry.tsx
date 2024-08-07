import React, { useState } from "react";
import { postQuestion } from "../services/api/apiData";

interface QuestionEntryProps {
  onAddQuestion: (newQuestion: {
    question: string;
    questionType: string;
    keyAnswer: string;
  }) => void;
}

const QuestionEntry: React.FC<QuestionEntryProps> = ({ onAddQuestion }) => {
  const [formValues, setFormValues] = useState({
    question: "",
    questionType: "",
    keyAnswer: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newQuestion = await postQuestion(formValues);
      onAddQuestion(newQuestion); // Pass the newly added question to the parent component
      setFormValues({ question: "", questionType: "", keyAnswer: "" }); // Reset form values
    } catch (error) {
      console.error("Failed to post question:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mt-4">
        <label>Question</label>
        <input
          type="text"
          className="form-control"
          name="question"
          placeholder="Insert Question"
          value={formValues.question}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Type Of Question</label>
        <select
          className="form-control"
          name="questionType"
          value={formValues.questionType}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="0">True False</option>
          <option value="1">Multiple Choice</option>
          <option value="2">Text</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Answer Key</label>
        <select
          className="form-control"
          name="keyAnswer"
          value={formValues.keyAnswer}
          onChange={handleChange}
          required
        >
          <option value="">Select Answer</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary mt-4">
        Submit
      </button>
    </form>
  );
};

export default QuestionEntry;

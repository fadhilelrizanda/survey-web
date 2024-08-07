import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SurveyFormProps {
  questions: { [key: string]: number };
  correct_answers: { [key: string]: number };
}

interface FormValues {
  [key: string]: string;
}

function SurveyForm({ questions, correct_answers }: SurveyFormProps) {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [formValues, setFormValues] = useState<FormValues>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const check_answer = (
    answer: { [key: string]: string },
    correct_answers: { [key: string]: number }
  ): number => {
    let num_corrected_answer = 0;
    for (const key in correct_answers) {
      if (answer[key] !== undefined) {
        if (Number(answer[key]) === correct_answers[key]) {
          num_corrected_answer += 1;
        }
      }
    }
    return num_corrected_answer;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form values:", formValues);

    // Clone the form values to avoid mutating the original state
    const updatedValues = { ...formValues };

    // Remove a specific property safely
    delete updatedValues["question0"];

    console.log("Updated form values:", updatedValues);
    const get_score = check_answer(updatedValues, correct_answers);
    setScore(get_score);

    console.log("Number of correct answers:", get_score);
    navigate("/success", { state: { score: get_score } });
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(questions).map(([question, type], index) => (
        <div key={index} className="form-group mt-4">
          <label>{question}</label>
          {type === 0 ? (
            <input
              type="text"
              className="form-control"
              name={`question${index + 1}`} // Adjusted to start from question1
              placeholder="Masukkan jawaban"
              onChange={handleChange}
              required
            />
          ) : (
            <>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question${index + 1}`} // Adjusted to start from question1
                  id={`question${index + 1}Yes`}
                  value="1"
                  onChange={handleChange}
                  required
                />
                <label
                  className="form-check-label"
                  htmlFor={`question${index + 1}Yes`}
                >
                  Iya
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question${index + 1}`} // Adjusted to start from question1
                  id={`question${index + 1}No`}
                  value="0"
                  onChange={handleChange}
                  required
                />
                <label
                  className="form-check-label"
                  htmlFor={`question${index + 1}No`}
                >
                  Tidak
                </label>
              </div>
            </>
          )}
        </div>
      ))}
      <button type="submit" className="btn btn-primary mt-4">
        Submit
      </button>
    </form>
  );
}

SurveyForm.propTypes = {
  questions: PropTypes.object.isRequired,
  correct_answers: PropTypes.object.isRequired,
};

export default SurveyForm;

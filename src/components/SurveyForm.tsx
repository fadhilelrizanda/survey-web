import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAns } from "../services/api/apiData";
import "./SurveyForm.css";

interface SurveyFormProps {
  questions: Array<{
    question: string;
    questionType: number;
    keyAnswer: number;
  }>;
  personalQuest: Array<{
    question: string;
    questionType: number;
    surveyType: number;
  }>;
}

interface FormValues {
  [key: string]: string;
}

function SurveyForm({ questions, personalQuest }: SurveyFormProps) {
  const navigate = useNavigate();
  // const [score, setScore] = useState<number>(0);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormValues>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormValues = {};
    let isValid = true;

    // Check personalQuest fields
    personalQuest.forEach((pq) => {
      if (!formValues[pq.question]) {
        newErrors[pq.question] = "This field is required";
        isValid = false;
      }
    });

    // Check questions fields
    questions.forEach((__, index) => {
      if (!formValues[`question${index + 1}`]) {
        newErrors[`question${index + 1}`] = "This field is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const checkAnswer = (
    answer: { [key: string]: string },
    correctAnswers: { [key: string]: number }
  ): number => {
    return Object.keys(correctAnswers).reduce((count, key) => {
      return answer[key] === String(correctAnswers[key]) ? count + 1 : count;
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const correctAnswers = questions.reduce((acc, q, index) => {
      acc[`question${index + 1}`] = q.keyAnswer;
      return acc;
    }, {} as { [key: string]: number });

    const getScore = checkAnswer(formValues, correctAnswers);
    // setScore(getScore);

    const ans = questions.map(
      (_, index) => Number(formValues[`question${index + 1}`]) || 0
    );

    const pq = personalQuest.reduce((acc, pq) => {
      acc[pq.question] = formValues[pq.question] || "";
      return acc;
    }, {} as { [key: string]: string });

    try {
      await postAns({
        pq,
        ans,
        score: getScore,
        surveyType: 0,
      });
      navigate("/success", { state: { score: getScore } });
    } catch (error) {
      console.error("Error posting answers:", error);
      // Handle error state here (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {personalQuest.map((pq, index) => (
        <div key={index + questions.length} className="form-group mt-4">
          <label>
            {index + 1}. {pq.question}
          </label>
          {pq.questionType === 0 && (
            <>
              <input
                type="text"
                className="form-control"
                name={pq.question}
                placeholder="Masukkan jawaban"
                onChange={handleChange}
                value={formValues[pq.question] || ""}
              />
              {errors[pq.question] && (
                <p className="text-danger">{errors[pq.question]}</p>
              )}
            </>
          )}
          {pq.questionType === 1 && (
            <div className="radio-group">
              <div className="custom-radio">
                <input
                  className="form-check-input"
                  type="radio"
                  name={pq.question}
                  id={`male-${index}`}
                  value="male"
                  onChange={handleChange}
                  checked={formValues[pq.question] === "male"}
                />
                <label className="form-check-label" htmlFor={`male-${index}`}>
                  Male
                </label>
              </div>
              <div className="custom-radio">
                <input
                  className="form-check-input"
                  type="radio"
                  name={pq.question}
                  id={`female-${index}`}
                  value="female"
                  onChange={handleChange}
                  checked={formValues[pq.question] === "female"}
                />
                <label className="form-check-label" htmlFor={`female-${index}`}>
                  Female
                </label>
              </div>
              {errors[pq.question] && (
                <p className="text-danger">{errors[pq.question]}</p>
              )}
            </div>
          )}
          {pq.questionType === 2 && (
            <>
              <input
                type="number"
                className="form-control"
                name={pq.question}
                placeholder="Masukkan usia"
                onChange={handleChange}
                value={formValues[pq.question] || ""}
              />
              {errors[pq.question] && (
                <p className="text-danger">{errors[pq.question]}</p>
              )}
            </>
          )}
          {pq.questionType === 3 && (
            <>
              <input
                type="date"
                className="form-control"
                name={pq.question}
                onChange={handleChange}
                value={formValues[pq.question] || ""}
              />
              {errors[pq.question] && (
                <p className="text-danger">{errors[pq.question]}</p>
              )}
            </>
          )}
        </div>
      ))}

      {questions.map((q, index) => (
        <div key={index} className="form-group mt-4">
          <label>
            {index + 1}. {q.question}
          </label>
          {q.questionType === 2 ? (
            <>
              <input
                type="text"
                className="form-control"
                name={`question${index + 1}`}
                placeholder="Masukkan jawaban"
                onChange={handleChange}
                value={formValues[`question${index + 1}`] || ""}
              />
              {errors[`question${index + 1}`] && (
                <p className="text-danger">{errors[`question${index + 1}`]}</p>
              )}
            </>
          ) : (
            <div className="radio-group">
              <div className="custom-radio">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question${index + 1}`}
                  id={`question${index + 1}Yes`}
                  value="1"
                  onChange={handleChange}
                  checked={formValues[`question${index + 1}`] === "1"}
                />
                <label
                  className="form-check-label"
                  htmlFor={`question${index + 1}Yes`}
                >
                  Iya
                </label>
              </div>
              <div className="custom-radio">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question${index + 1}`}
                  id={`question${index + 1}No`}
                  value="0"
                  onChange={handleChange}
                  checked={formValues[`question${index + 1}`] === "0"}
                />
                <label
                  className="form-check-label"
                  htmlFor={`question${index + 1}No`}
                >
                  Tidak
                </label>
              </div>
              {errors[`question${index + 1}`] && (
                <p className="text-danger">{errors[`question${index + 1}`]}</p>
              )}
            </div>
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
  questions: PropTypes.array.isRequired,
  personalQuest: PropTypes.array.isRequired,
};

export default SurveyForm;

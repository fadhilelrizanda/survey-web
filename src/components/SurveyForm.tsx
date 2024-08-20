import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAns } from "../services/api/apiData";
import "./SurveyForm.css";
import TextInput from "./PersonalQuest/TextInput";
import RadioInput from "./PersonalQuest/RadioInput";

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
              <TextInput
                name={pq.question}
                value={formValues[pq.question] || ""}
                placeholder={"Masukkan jawaban"}
                onChange={handleChange}
                error={errors[pq.question]}
              />
            </>
          )}
          {pq.questionType === 1 && (
            <RadioInput
              name={pq.question}
              value={formValues[pq.question] || ""}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
              onChange={handleChange}
              error={errors[pq.question]}
            />
          )}
          {pq.questionType === 2 && (
            <>
              <TextInput
                name={pq.question}
                value={formValues[pq.question] || ""}
                placeholder="Masukkan usia"
                onChange={handleChange}
                error={errors[pq.question]}
              />
            </>
          )}
          {pq.questionType === 3 && (
            <>
              <TextInput
                name={pq.question}
                value={formValues[pq.question] || ""}
                placeholder="Select Date"
                onChange={handleChange}
                error={errors[pq.question]}
              />
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
            <TextInput
              name={`question${index + 1}`}
              value={formValues[`question${index + 1}`] || ""}
              placeholder="Masukkan jawaban"
              onChange={handleChange}
              error={errors[`question${index + 1}`]}
            />
          ) : (
            <RadioInput
              name={`question${index + 1}`}
              value={formValues[`question${index + 1}`] || ""}
              options={[
                { label: "Iya", value: "1" },
                { label: "Tidak", value: "0" },
              ]}
              onChange={handleChange}
              error={errors[`question${index + 1}`]}
            />
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

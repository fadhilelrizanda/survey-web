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
    score: number;
    keyAnswer: number;
  }>;
  surveyType: number;
}

interface FormValues {
  [key: string]: string;
}

function SurveyForm({ questions, surveyType }: SurveyFormProps) {
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
    correctAnswers: { [key: string]: number },
    scores: { [key: string]: number } // Add this to represent the score for each question
  ): number => {
    return Object.keys(correctAnswers).reduce((totalScore, key) => {
      const isCorrect = answer[key] === String(correctAnswers[key]); // Check if the answer is correct
      return totalScore + (isCorrect ? scores[key] : 0); // Add the corresponding score if the answer is correct
    }, 0); // Initialize the total score to 0
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const correctAnswers = questions.reduce((acc, q, index) => {
      acc[`question${index + 1}`] = q.keyAnswer;
      return acc;
    }, {} as { [key: string]: number });

    const correctScore = questions.reduce((acc, q, index) => {
      acc[`question${index + 1}`] = q.score;
      return acc;
    }, {} as { [key: string]: number });
    console.log(correctScore);

    const getScore = checkAnswer(formValues, correctAnswers, correctScore);
    // setScore(getScore);
    console.log(getScore);
    const ans = questions.map(
      (_, index) => Number(formValues[`question${index + 1}`]) || 0
    );
    const userId = sessionStorage.getItem("userId") || "";
    // const pq = personalQuest.reduce((acc, pq) => {
    //   acc[pq.question] = formValues[pq.question] || "";
    //   return acc;
    // }, {} as { [key: string]: string });

    try {
      await postAns({
        // pq,
        ans,
        score: getScore,
        surveyType: surveyType,
        userId: userId,
      });
      switch (surveyType) {
        case 0:
          sessionStorage.setItem("s0Score", getScore.toString());
          navigate("/success");
          break;
        case 1:
          sessionStorage.setItem("s1Score", getScore.toString());
          navigate("/success");
          break;
        case 2:
          sessionStorage.setItem("s2Score", getScore.toString());
          navigate("/success");
          break;
      }
      // navigate("/success", { state: { score: getScore } });
    } catch (error) {
      console.error("Error posting answers:", error);
      // Handle error state here (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
  // personalQuest: PropTypes.array.isRequired,
};

export default SurveyForm;
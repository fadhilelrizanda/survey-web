import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAns } from "../services/api/apiData";
import "./SurveyForm.css";
import TextInput from "./PersonalQuest/TextInput";
import RadioInput from "./PersonalQuest/RadioInput";
import { Riple } from "react-loading-indicators";

interface SurveyFormProps {
  questions: Array<{
    question: string;
    questionType: number;
    score: number;
    keyAnswer: number;
  }>;
  questions1: Array<{
    question: string;
    questionType: number;
    score: number;
    keyAnswer: number;
  }>;
  questions2: Array<{
    question: string;
    questionType: number;
    score: number;
    keyAnswer: number;
  }>;
}

interface FormValues {
  [key: string]: string;
}

function SurveyForm3({ questions, questions1, questions2 }: SurveyFormProps) {
  const navigate = useNavigate();
  // const [score, setScore] = useState<number>(0);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [formValues1, setFormValues1] = useState<FormValues>({});
  const [formValues2, setFormValues2] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormValues>({});
  const [isLoading, setIsloading] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: number
  ) => {
    const { name, value } = e.target;
    if (section == 0) {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    } else if (section == 1) {
      setFormValues1((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    } else if (section == 2) {
      setFormValues2((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    } else {
      console.log("error section value");
    }
    console.log(formValues);
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

    questions1.forEach((__, index) => {
      if (!formValues1[`question1_${index + 1}`]) {
        newErrors[`question${index + 1}`] = "This field is required";
        isValid = false;
      }
    });

    questions2.forEach((__, index) => {
      if (!formValues2[`question2_${index + 1}`]) {
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
    scores: { [key: string]: number }
  ): number => {
    return Object.keys(correctAnswers).reduce((totalScore, key) => {
      const answerValue = answer[key];
      const correctAnswerValue = correctAnswers[key];
      const scoreValue = scores[key];

      // console.log(
      //   `Key: ${key}, Answer: ${answerValue}, Correct: ${correctAnswerValue}, Score: ${scoreValue}`
      // );
      // console.log(`score ${scoreValue}`);

      // Ensure values are properly defined and numbers
      if (
        answerValue !== undefined &&
        correctAnswerValue !== undefined &&
        scoreValue !== undefined
      ) {
        const isCorrect = answerValue === String(correctAnswerValue);
        return totalScore + (isCorrect ? scoreValue : 0);
      } else {
        console.log(`Invalid data for key ${key}`);
        return totalScore;
      }
    }, 0); // Initialize the total score to 0
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
    setIsloading(true);

    if (!validateForm()) return;

    const correctAnswers = questions.reduce((acc, q, index) => {
      acc[`question${index + 1}`] = q.keyAnswer;
      return acc;
    }, {} as { [key: string]: number });

    const correctAnswers1 = questions1.reduce((acc, q, index) => {
      acc[`question1_${index + 1}`] = q.keyAnswer;
      return acc;
    }, {} as { [key: string]: number });

    const correctAnswers2 = questions2.reduce((acc, q, index) => {
      acc[`question2_${index + 1}`] = q.keyAnswer;
      return acc;
    }, {} as { [key: string]: number });

    const correctScore = questions.reduce((acc, q, index) => {
      acc[`question${index + 1}`] = q.score;
      return acc;
    }, {} as { [key: string]: number });
    console.log(correctScore);

    const correctScore1 = questions1.reduce((acc, q, index) => {
      acc[`question1_${index + 1}`] = q.score;
      return acc;
    }, {} as { [key: string]: number });
    console.log(correctScore);

    const correctScore2 = questions2.reduce((acc, q, index) => {
      acc[`question2_${index + 1}`] = q.score;
      return acc;
    }, {} as { [key: string]: number });

    // debugging formvalue
    console.log("form value and debugging");
    // console.log(formValues);
    // console.log(formValues1);
    // console.log(correctScore);

    console.log(formValues1);
    console.log(correctAnswers1);
    console.log(correctScore1);
    // console.log("score");

    const getScore = checkAnswer(formValues, correctAnswers, correctScore);
    const getScore1 = checkAnswer(formValues1, correctAnswers1, correctScore1);
    const getScore2 = checkAnswer(formValues2, correctAnswers2, correctScore2);
    // setScore(getScore);
    console.log(`getScore : ${getScore}`);
    console.log(`getScore1 : ${getScore1}`);
    console.log(`getScore2 : ${getScore2}`);

    const ans = questions.map(
      (_, index) => Number(formValues[`question${index + 1}`]) || 0
    );

    const ans1 = questions1.map(
      (_, index) => Number(formValues[`question1_${index + 1}`]) || 0
    );

    const ans2 = questions2.map(
      (_, index) => Number(formValues[`question2_${index + 1}`]) || 0
    );
    const userId = sessionStorage.getItem("userId") || "";
    console.log(userId);
    try {
      await postAns({
        // pq,
        ans,
        score: getScore,
        surveyType: 2,
        userId: userId,
      });

      await postAns({
        // pq,
        ans: ans1,
        score: getScore1,
        surveyType: 22,
        userId: userId,
      });

      await postAns({
        // pq,
        ans: ans2,
        score: getScore2,
        surveyType: 222,
        userId: userId,
      });
      setIsloading(false);
      sessionStorage.setItem("s2Score", getScore.toString());
      sessionStorage.setItem("s22Score", getScore1.toString());
      sessionStorage.setItem("s222Score", getScore2.toString());
      navigate("/success3");
    } catch (error) {
      console.error("Error posting answers:", error);
      // Handle error state here (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Survey 1</h2>
      {questions.map((q, index) => (
        <div key={index} className="form-group mt-4">
          <label>
            {index + 1}. {q.question}
          </label>
          {q.questionType === 1 ? (
            <RadioInput
              name={`question${index + 1}`}
              value={formValues[`question${index + 1}`] || ""}
              options={[
                { label: "Tidak Pernah", value: "0" },
                { label: "Kadang-kadang", value: "1" },
                { label: "Selalu", value: "2" },
              ]}
              onChange={(e) => handleChange(e, 0)}
              error={errors[`question${index + 1}`]}
            />
          ) : q.questionType === 2 ? (
            <TextInput
              name={`question${index + 1}`}
              value={formValues[`question${index + 1}`] || ""}
              placeholder="Masukkan jawaban"
              onChange={(e) => handleChange(e, 0)}
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
              onChange={(e) => handleChange(e, 0)}
              error={errors[`question${index + 1}`]}
            />
          )}
        </div>
      ))}
      <h2>Survey 2</h2>
      {questions1.map((q, index) => (
        <div key={index} className="form-group mt-4">
          <label>
            {index + 1}. {q.question}
          </label>
          {q.questionType === 1 ? (
            <RadioInput
              name={`question1_${index + 1}`}
              value={formValues1[`question1_${index + 1}`] || ""}
              options={[
                { label: "Tidak Pernah", value: "0" },
                { label: "Kadang-kadang", value: "1" },
                { label: "Selalu", value: "2" },
              ]}
              onChange={(e) => handleChange(e, 1)}
              error={errors[`question1_${index + 1}`]}
            />
          ) : q.questionType === 2 ? (
            <RadioInput
              name={`question1_${index + 1}`}
              value={formValues1[`question1_${index + 1}`] || ""}
              options={[
                { label: "Sangat Setuju", value: "4" },
                { label: "Setuju", value: "3" },
                { label: "Kurang Setuju", value: "2" },
                { label: "Tidak Setuju", value: "1" },
                { label: "Sangat Tidak Setuju", value: "0" },
              ]}
              onChange={(e) => handleChange(e, 1)}
              error={errors[`question1_${index + 1}`]}
            />
          ) : (
            <RadioInput
              name={`question1_${index + 1}`}
              value={formValues1[`question1_${index + 1}`] || ""}
              options={[
                { label: "Iya", value: "1" },
                { label: "Tidak", value: "0" },
              ]}
              onChange={(e) => handleChange(e, 1)}
              error={errors[`question1_${index + 1}`]}
            />
          )}
        </div>
      ))}
      <h2>survey 3</h2>
      {questions2.map((q, index) => (
        <div key={index} className="form-group mt-4">
          <label>
            {index + 1}. {q.question}
          </label>
          {q.questionType === 1 ? (
            <RadioInput
              name={`question2_${index + 1}`}
              value={formValues2[`question2_${index + 1}`] || ""}
              options={[
                { label: "Tidak Pernah", value: "0" },
                { label: "Kadang-kadang", value: "1" },
                { label: "Selalu", value: "2" },
              ]}
              onChange={(e) => handleChange(e, 2)}
              error={errors[`question2_${index + 1}`]}
            />
          ) : q.questionType === 2 ? (
            <RadioInput
              name={`question2_${index + 1}`}
              value={formValues2[`question2_${index + 1}`] || ""}
              options={[
                { label: "Sangat Setuju", value: "4" },
                { label: "Setuju", value: "3" },
                { label: "Kurang Setuju", value: "2" },
                { label: "Tidak Setuju", value: "1" },
                { label: "Sangat Tidak Setuju", value: "0" },
              ]}
              onChange={(e) => handleChange(e, 2)}
              error={errors[`question2_${index + 1}`]}
            />
          ) : (
            <RadioInput
              name={`question2_${index + 1}`}
              value={formValues2[`question2_${index + 1}`] || ""}
              options={[
                { label: "Iya", value: "1" },
                { label: "Tidak", value: "0" },
              ]}
              onChange={(e) => handleChange(e, 2)}
              error={errors[`question2_${index + 1}`]}
            />
          )}
        </div>
      ))}
      {isLoading ? (
        <Riple color="#32cd32" size="medium" text="Loading" textColor="" />
      ) : (
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      )}
    </form>
  );
}

SurveyForm3.propTypes = {
  questions: PropTypes.array.isRequired,
  questions1: PropTypes.array.isRequired,
  questions2: PropTypes.array.isRequired,
};

export default SurveyForm3;

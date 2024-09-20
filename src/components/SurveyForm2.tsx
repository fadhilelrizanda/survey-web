import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAns } from "../services/api/apiData";
import "./SurveyForm.css";
import SurveyQuestion from "./SurveyQuestion";
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
  surveyCode: number[];
  surveyName: string[];
  sessionName: string[];
}

interface FormValues {
  [key: string]: string;
}

function SurveyForm2({
  questions,
  questions1,
  questions2,
  surveyCode,
  surveyName,
  sessionName,
}: SurveyFormProps) {
  const navigate = useNavigate();
  console.log("questions");
  console.log(questions);
  console.log(questions1);
  console.log(questions2);
  // const [score, setScore] = useState<number>(0);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [formValues1, setFormValues1] = useState<FormValues>({});
  const [formValues2, setFormValues2] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormValues>({});
  const [isLoading, setIsLoading] = useState(false);
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
        newErrors[`question1_${index + 1}`] = "This field is required";
        isValid = false;
      }
    });

    questions2.forEach((__, index) => {
      if (!formValues2[`question2_${index + 1}`]) {
        newErrors[`question2_${index + 1}`] = "This field is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    console.log(newErrors);
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
    console.log("formvalue and debugging");
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
      (_, index) => Number(formValues1[`question1_${index + 1}`]) || 0
    );

    const ans2 = questions2.map(
      (_, index) => Number(formValues2[`question2_${index + 1}`]) || 0
    );
    const userId = sessionStorage.getItem("userId") || "";
    console.log(userId);
    setIsLoading(true);
    try {
      await postAns({
        // pq,
        ans,
        score: getScore,
        surveyType: surveyCode[0],
        userId: userId,
      });

      await postAns({
        // pq,
        ans: ans1,
        score: getScore1,
        surveyType: surveyCode[1],
        userId: userId,
      });

      await postAns({
        // pq,
        ans: ans2,
        score: getScore2,
        surveyType: surveyCode[2],
        userId: userId,
      });
      sessionStorage.setItem(sessionName[0], getScore.toString());
      sessionStorage.setItem(sessionName[1], getScore1.toString());
      sessionStorage.setItem(sessionName[2], getScore2.toString());
      setIsLoading(false);
      navigate("/success2");
    } catch (error) {
      console.error("Error posting answers:", error);
      // Handle error state here (e.g., show an error message)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="col-md-8 sub-survey">
            <h2>{surveyName[0]}</h2>
            <SurveyQuestion
              questions={questions}
              handleChange={handleChange}
              formValues={formValues}
              errors={errors}
              question_name="question"
              section_num={0}
            />
          </div>
        </div>
        <div className=" row justify-content-center">
          <div className="col-md-8 sub-survey">
            <h2>{surveyName[1]}</h2>
            <SurveyQuestion
              questions={questions1}
              handleChange={handleChange}
              formValues={formValues1}
              errors={errors}
              question_name="question1_"
              section_num={1}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 sub-survey">
            <h2>{surveyName[2]}</h2>
            <SurveyQuestion
              questions={questions2}
              handleChange={handleChange}
              formValues={formValues2}
              errors={errors}
              question_name="question2_"
              section_num={2}
            />
          </div>
        </div>{" "}
        <div className="row justify-content-center">
          {isLoading ? (
            <div className="riple-sect text-center">
              <Riple
                color="#32cd32"
                size="medium"
                text="Loading"
                textColor=""
              />
            </div>
          ) : (
            <button
              type="submit"
              className="btn btn-primary mt-4 col-md-4 mb-4"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </>
  );
}

SurveyForm2.propTypes = {
  questions: PropTypes.array.isRequired,
  questions1: PropTypes.array.isRequired,
  questions2: PropTypes.array.isRequired,
};

export default SurveyForm2;

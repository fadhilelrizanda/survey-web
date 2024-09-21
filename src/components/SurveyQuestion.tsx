/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-circular-progressbar/dist/styles.css";
import RadioInput from "./PersonalQuest/RadioInput";
interface SurveyQuestionProp {
  questions: any;
  handleChange: any;
  formValues: any;
  errors: any;
  question_name: string;
  section_num: number;
}

const SurveyQuestion: React.FC<SurveyQuestionProp> = ({
  questions,
  handleChange,
  formValues,
  errors,
  question_name,
  section_num,
}) => {
  console.log(questions);
  return (
    <>
      {questions.map((q: any, index: any) => (
        <div key={index} className="form-group mt-4">
          <label>
            {index + 1}. {q.question}
          </label>
          {q.questionType === 1 ? (
            <RadioInput
              name={`${question_name}${index + 1}`}
              value={formValues[`${question_name}${index + 1}`] || ""}
              options={[
                { label: "Selalu", value: "2" },
                { label: "Kadang-kadang", value: "1" },
                { label: "Tidak Pernah", value: "0" },
              ]}
              onChange={(e) => handleChange(e, section_num)}
              error={errors[`${question_name}${index + 1}`]}
            />
          ) : q.questionType === 2 ? (
            <RadioInput
              name={`${question_name}${index + 1}`}
              value={formValues[`${question_name}${index + 1}`] || ""}
              options={[
                { label: "Setuju", value: "3" },
                { label: "Sangat Setuju", value: "4" },
                { label: "Kurang Setuju", value: "2" },
                { label: "Tidak Setuju", value: "1" },
                { label: "Sangat Tidak Setuju", value: "0" },
              ]}
              onChange={(e) => handleChange(e, section_num)}
              error={errors[`${question_name}${index + 1}`]}
            />
          ) : (
            <RadioInput
              name={`${question_name}${index + 1}`}
              value={formValues[`${question_name}${index + 1}`] || ""}
              options={[
                { label: "Iya", value: "1" },
                { label: "Tidak", value: "0" },
              ]}
              onChange={(e) => handleChange(e, section_num)}
              error={errors[`${question_name}${index + 1}`]}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default SurveyQuestion;

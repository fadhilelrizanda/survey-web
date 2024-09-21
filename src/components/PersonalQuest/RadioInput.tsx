import "react";

interface RadioInputProps {
  name: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

const RadioInput: React.FC<RadioInputProps> = ({
  name,
  value,
  options,
  onChange,
  error,
}) => {
  return (
    <>
      <div className="radio-group row">
        {options.map((option) => (
          <div
            key={option.value}
            className="col-12 col-sm-6 col-md-4 col-md-2 col-md-3 col-lg-3 mb-2 d-flex align-items-center custom-radio"
          >
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id={`${name}-${option.value}`}
              value={option.value}
              onChange={onChange}
              checked={value === option.value}
            />
            <label
              className="form-check-label"
              htmlFor={`${name}-${option.value}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="text-danger">{error}</p>}
    </>
  );
};

export default RadioInput;

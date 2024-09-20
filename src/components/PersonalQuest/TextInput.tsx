import "react";

interface TextInputProp {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const TextInput: React.FC<TextInputProp> = ({
  name,
  value,
  placeholder,
  onChange,
  error,
}) => {
  return (
    <>
      <input
        type="text"
        className="form-control"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error && <p className="text-danger">{error}</p>}
    </>
  );
};

export default TextInput;

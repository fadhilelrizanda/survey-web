import { useNavigate } from "react-router-dom";

function BackBtn() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // This navigates to the previous page in the history stack
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleBackClick}>
        Back
      </button>
    </>
  );
}

export default BackBtn;

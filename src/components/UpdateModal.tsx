import React, { useState, useEffect } from "react";

interface UpdateModalProps {
  show: boolean;
  onHide: () => void;
  question: any;
  onSave: (updatedQuestion: any) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  show,
  onHide,
  question,
  onSave,
}) => {
  const [updatedQuestion, setUpdatedQuestion] = useState<any>(question);

  useEffect(() => {
    setUpdatedQuestion(question); // Update the state when the question changes
  }, [question]);

  const handleSave = () => {
    onSave(updatedQuestion); // Pass the updated question back to the parent
    onHide(); // Hide the modal
  };

  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      style={{ display: show ? "block" : "none" }}
      tabIndex={-1}
      aria-labelledby="updateModalLabel"
      aria-hidden={!show}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="updateModalLabel">
              Update Question
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Pertanyaan</label>
              <input
                type="text"
                className="form-control"
                value={updatedQuestion?.question || ""}
                onChange={(e) =>
                  setUpdatedQuestion({
                    ...updatedQuestion,
                    question: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">
                Jenis Pertanyaan
              </label>
              <select
                className="form-control"
                name="questionType"
                value={updatedQuestion?.questionType || ""}
                onChange={(e) =>
                  setUpdatedQuestion({
                    ...updatedQuestion,
                    questionType: e.target.value,
                  })
                }
                required
              >
                <option value="">Jenis Pertanyaan</option>
                <option value="0">Benar Salah</option>
                <option value="1">Pilihan Ganda</option>
                {/* <option value="2">Text</option> */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">
                Jawaban Yang Tepat
              </label>
              <select
                className="form-control"
                name="keyAnswer"
                value={updatedQuestion?.keyAnswer || ""}
                onChange={(e) =>
                  setUpdatedQuestion({
                    ...updatedQuestion,
                    keyAnswer: e.target.value,
                  })
                }
                required
              >
                <option value="">Pilih Jawaban</option>
                <option value="1">Iya</option>
                <option value="0">Tidak</option>
                <option value="2">Kadang-kadang</option>
              </select>
            </div>
            {/* Add more form elements as needed */}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;

/* eslint-disable @typescript-eslint/no-explicit-any */
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

  // Get answer options based on question type
  const getAnswerOptions = () => {
    const questionType = updatedQuestion?.questionType;

    switch (parseInt(questionType)) {
      case 0: // Benar/Salah
        return (
          <>
            <option key="0" value="0">
              Tidak
            </option>
            <option key="1" value="1">
              Ya
            </option>
          </>
        );
      case 1: // Pilihan Ganda (3 pilihan)
        return (
          <>
            <option key="0" value="0">
              Tidak Pernah
            </option>
            <option key="1" value="1">
              Kadang-kadang
            </option>
            <option key="2" value="2">
              Selalu
            </option>
          </>
        );
      case 2: // Pilihan Ganda (5 pilihan)
        return (
          <>
            <option key="0" value="0">
              Sangat Tidak Setuju
            </option>
            <option key="1" value="1">
              Tidak Setuju
            </option>
            <option key="2" value="2">
              Kurang Setuju
            </option>
            <option key="3" value="3">
              Setuju
            </option>
            <option key="4" value="4">
              Sangat Setuju
            </option>
          </>
        );
      default:
        return <option value="">Pilih Jawaban</option>;
    }
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
                <option value="1">Pilihan Ganda (3 Pilihan)</option>
                <option value="2">Pilihan Ganda (5 Pilihan)</option>
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
                {getAnswerOptions()}
              </select>
            </div>
            <div className="form-group">
              <label>Score</label>
              <input
                type="number"
                className="form-control"
                value={updatedQuestion?.score || ""}
                onChange={(e) =>
                  setUpdatedQuestion({
                    ...updatedQuestion,
                    score: e.target.value,
                  })
                }
              />
            </div>
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

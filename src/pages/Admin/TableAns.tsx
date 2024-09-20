/* eslint-disable @typescript-eslint/no-explicit-any */
interface TableAnsProps {
  answerData: any[];
  handleDeleteAns: any;
}

const TableAns: React.FC<TableAnsProps> = ({ answerData, handleDeleteAns }) => {
  return (
    <>
      <div className="col-md-10">
        <table className="table table-striped table-hover">
          <thead>
            <tr className="table-primary">
              <th scope="col">No.</th>
              <th scope="col">Nama Orang Tua</th>
              <th scope="col">Nama Anak</th>
              {/* <th scope="col">Jawaban</th> */}
              <th scope="col">Score</th>
              {/* <th scope="col">Survey</th> */}
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {answerData.map((ans, index) => (
              <tr key={ans._id}>
                <td>{index + 1}.</td>
                <td>{ans.user.name}</td>
                <td>{ans.user.childname}</td>

                <td>{ans.score}</td>

                <td>
                  {" "}
                  <button
                    onClick={() => handleDeleteAns(ans._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableAns;

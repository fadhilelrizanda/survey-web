import "react-circular-progressbar/dist/styles.css";
import "./Success.css";

function TableSuccess() {
  return (
    <>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Rentang Nilai</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0 - 20</td>
            <td>Sangat Beresiko</td>
          </tr>
          <tr>
            <td>21 - 40</td>
            <td>Kurang Baik</td>
          </tr>
          <tr>
            <td>41 - 60</td>
            <td>Cukup</td>
          </tr>
          <tr>
            <td>61 - 80</td>
            <td>Baik</td>
          </tr>
          <tr>
            <td>81 - 100</td>
            <td>Sangat Baik</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default TableSuccess;

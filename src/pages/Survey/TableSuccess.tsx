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
            <td>0 - 56</td>
            <td>Tidak Baik(Beresiko)</td>
          </tr>
          <tr>
            <td>56 - 70</td>
            <td>Cukup Baik (Beresiko)</td>
          </tr>

          <tr>
            <td>76 - 100</td>
            <td>Tidak Beresiko</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default TableSuccess;

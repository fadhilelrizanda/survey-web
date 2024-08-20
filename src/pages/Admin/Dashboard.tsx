import Navbar from "../../components/Navbar";
import "./Dashboard.css";
import Sidebar from "../../components/Sidebar";
const Dashboard = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Navbar />
        </div>
      </div>
      <div className="container-fluid border-hightlight mt-5">
        <div className="row">
          <Sidebar />
          <div className="col-md-10 border-hightlight">Content</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

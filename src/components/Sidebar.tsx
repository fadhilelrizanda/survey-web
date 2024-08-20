import { Link } from "react-router-dom";
import "./Sidebar.css";
function Sidebar() {
  return (
    <>
      <div className="col-md-2 sidebar">
        <div className="vertical-menu">
          <Link to="/admin/survey susu">Survey Pemberian Susu Formula</Link>
          <Link to="/admin/survey pola asuh">Survey Pola Asuh</Link>
          <Link to="#">Survey Pemberian Susu B</Link>
          <Link to="#">Survey Pemberian Susu C</Link>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

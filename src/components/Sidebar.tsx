import { Link } from "react-router-dom";
import "./Sidebar.css";
function Sidebar() {
  return (
    <>
      <div className="col-md-2 sidebar">
        <div className="vertical-menu">
          <Link to="/admin/survey1">Survey 1</Link>
          {/* <Link to="/admin/survey pola asuh">Survey Pola Asuh</Link> */}
          <Link to="/admin/survey2">Survey 2</Link>
          <Link to="/admin/survey3">Survey 3</Link>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

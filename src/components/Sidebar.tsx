import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <>
      <div className="col-md-2 border-hightlight">
        <h3>Sidebar</h3>
        <div className="vertical-menu">
          <a href="#" className="active">
            Home
          </a>
          <Link to="/admin/survey susu">Survey Pemberian Susu Formula</Link>
          <Link to="#">Survey Pemberian Susu A</Link>
          <Link to="#">Survey Pemberian Susu B</Link>
          <Link to="#">Survey Pemberian Susu C</Link>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

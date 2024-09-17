import "./Footer.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <div className="footer mt-5">
        <div className="row footer-desc">
          <div className="col-md-6">
            <h4>FKG Baiturrahmah</h4>
            <p>
              Fakultas Kedokteran gigi termasuk fakultas yang tertua dalam
              lingkungan Universitas Baiturrahmah, walaupun umurnya baru
              mencapai dua puluh dua tahun. Jumlah mahasiswa saat ini sekitar
              439 orang yang berasal dari lulusan berbagai sekolah menengah
              terutama dari Sumatera Bagian Tengah.{" "}
            </p>
          </div>
          <div className="col-md-4 offset-md-2">
            <h4>Social Media</h4>
            <div className="d-flex justify-content-around">
              <div className="icon">
                <Link to="#">
                  <i className="bi bi-whatsapp "></i>
                </Link>
              </div>
              <div className="icon ">
                <Link to="#">
                  <i className="bi bi-whatsapp "></i>
                </Link>
              </div>
              <div className="icon ">
                <Link to="#">
                  <i className="bi bi-whatsapp "></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row footer-end mt-5">
          <p>2024 Copyright : FKG Baiturahmah</p>
        </div>
      </div>
    </>
  );
}

export default Footer;

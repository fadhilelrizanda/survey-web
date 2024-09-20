import fkgImage from "../assets/images/home-img/fkg.jpg";
import "./ProfileSection.css";

function ProfileSection() {
  return (
    <>
      <div className="row profile-section-wrapper">
        <div className="col-md-5 col-12">
          <img src={fkgImage} alt="FKG Unbrah" className="img-fluid col-12" />
        </div>
        <div className="col-md-7 desc col-12">
          <h3>Fakultas Kedokteran Gigi </h3>
          <h4>Universitas Baiturrahmah </h4>
          <p>
            Fakultas Kedokteran gigi termasuk fakultas yang tertua dalam
            lingkungan Universitas Baiturrahmah, walaupun umurnya baru mencapai
            dua puluh dua tahun. Jumlah mahasiswa saat ini sekitar 439 orang
            yang berasal dari lulusan berbagai sekolah menengah terutama dari
            Sumatera Bagian Tengah. Kegiatan perkuliahan dan praktium dilakukan
            di kampus FKG di jl. By. Pass KM.14 Sei Sapih, Padang. Sejak Wisuda
            pertama tahun 1993, fakultas ini telah meghasilkan sebanyak 1378
            orang lulusan yang bertugas diberbagai tempat di seluruh Indonesia.
          </p>
        </div>
      </div>
    </>
  );
}

export default ProfileSection;

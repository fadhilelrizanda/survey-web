import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Login.css";
import { v4 as uuidv } from "uuid";
import { postUser } from "../../services/api/apiData";
import imgDentist from "../../assets/images/login/smiling-dentist.jpg";
import { Riple } from "react-loading-indicators";

interface LoginProps {
  onLogin: (status: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [childname, setChildname] = useState("");
  const [placeBirth, setPlaceBirth] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(0);
  const [currentDate, setCurrentDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log(from);

  useEffect(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0"); // Get day
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Get month (0-11, so add 1)
    const year = today.getFullYear(); // Get year

    setCurrentDate({
      day: day,
      month: month,
      year: year.toString(),
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Username: ", username);
    console.log("Child Name: ", childname);
    console.log("Place and Date of Birth: ", placeBirth);
    console.log("Age: ", age);
    console.log("Gender: ", gender);
    sessionStorage.setItem("username", username);
    // Check if the userId already exists
    let userId = sessionStorage.getItem("userId");

    if (!userId) {
      // Generate new userId if it doesn't exist
      const newId = uuidv();
      sessionStorage.setItem("userId", newId);
      userId = newId; // Assign the new ID to userId
    }

    const dateToPost = `${currentDate.year}-${currentDate.month}-${currentDate.day}`;
    console.log("UserId: ", userId);
    try {
      // Call the API to post the user data
      const response = await postUser({
        uniqueId: userId as string, // `userId` might be null, but you expect it to be a string
        name: username,
        currentDate: dateToPost,
        childname: childname,
        childDate: placeBirth, // Use string for date
        age: Number(age), // Convert string age to number
        gender: gender,
      });

      console.log("Data posted successfully:", response);
      onLogin(true);
      setLoading(false);
      navigate(from, { replace: true }); // Redirect to the original location
    } catch (error) {
      console.error("Error posting data:", error);
      alert("Error submitting the form.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div id="content" className="flex">
              <div className="">
                <div className="page-content page-container" id="page-content">
                  <div className="padding">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-header">
                            <strong>Login Untuk Mengisi Survey</strong>
                          </div>
                          <div className="card-body">
                            <form>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder=" Nama Orang Tua"
                                  onChange={(e) => setUsername(e.target.value)}
                                  value={username}
                                />
                                <label htmlFor="floatingInput">
                                  Nama Orang Tua
                                </label>
                              </div>

                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder=" Nama Anak"
                                  onChange={(e) => setChildname(e.target.value)}
                                  value={childname}
                                />
                                <label htmlFor="floatingInput">Nama Anak</label>
                              </div>

                              <div className="form-floating mb-3">
                                <input
                                  type="date"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder=" Nama Anak"
                                  onChange={(e) =>
                                    setPlaceBirth(e.target.value)
                                  }
                                  value={placeBirth}
                                />
                                <label htmlFor="floatingInput">
                                  Tempat/Tanggal Lahir Anak
                                </label>
                              </div>

                              <div className="form-floating mb-3">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="Umur"
                                  onChange={(e) => setAge(e.target.value)}
                                  value={age}
                                />
                                <label htmlFor="floatingInput">Umur</label>
                              </div>

                              <label className="text-muted" htmlFor="gender">
                                Jenis Kelamin
                              </label>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="gender"
                                  id="flexRadioDefault1"
                                  value={1}
                                  checked={gender === 1}
                                  onChange={(e) =>
                                    setGender(Number(e.target.value))
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault1"
                                >
                                  Laki-laki
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="gender"
                                  id="flexRadioDefault2"
                                  value={2}
                                  checked={gender === 2}
                                  onChange={(e) =>
                                    setGender(Number(e.target.value))
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault2"
                                >
                                  Perempuan
                                </label>
                              </div>

                              <div className="form-group mt-5"></div>
                              {isLoading ? (
                                <Riple
                                  color="#32cd32"
                                  size="medium"
                                  text=""
                                  textColor=""
                                /> // You can replace this with any loading animation or spinner component
                              ) : (
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  onClick={handleLogin}
                                >
                                  Submit
                                </button>
                              )}
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card">
                          <img
                            src={imgDentist}
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body">
                            <p className="card-text">
                              Mari melakukan pengecekan dan survey bersama untuk
                              kesehatan si kecil
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

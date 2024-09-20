import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Login.css";
import imgDentist from "../../assets/images/login/smiling-dentist.jpg";
import { Riple } from "react-loading-indicators";

interface LoginAdminProps {
  onLogin: (status: boolean) => void;
}

const LoginAdmin: React.FC<LoginAdminProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log(from);

  useEffect(() => {}, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      setLoading(true);
      onLogin(true);
      setLoading(false);
      navigate(from, { replace: true });
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
                            <strong>Login Admin</strong>
                          </div>
                          <div className="card-body">
                            <form>
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="floatingInputUser"
                                  placeholder="Username"
                                  onChange={(e) => setUsername(e.target.value)}
                                  value={username}
                                />
                                <label htmlFor="floatingInput">Username</label>
                              </div>

                              <div className="form-floating mb-3">
                                <input
                                  type="password"
                                  className="form-control"
                                  id="floatingInputPass"
                                  placeholder="Password"
                                  onChange={(e) => setPassword(e.target.value)}
                                  value={password}
                                />
                                <label htmlFor="floatingInput">Password</label>
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

export default LoginAdmin;

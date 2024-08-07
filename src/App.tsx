import React, { useState, useEffect } from "react";
import Splash from "./components/Splash";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Survey from "./pages/Survey";
import SurveySusu from "./pages/Survey/SurveySusu";
import SurveySikat from "./pages/Survey/SurveySikat";
import SurveyAsuh from "./pages/Survey/SurveyAsuh";
import SurveyPeriksa from "./pages/Survey/SurveyPeriksa";
import Success from "./pages/Survey/Success";
import ProtectedRoute from "./pages/Admin/ProtectedRoute";
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import AdminSurveySusu from "./pages/Admin/AdminSurveySusu";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status);
    localStorage.setItem("isAuthenticated", JSON.stringify(status));
  };

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      const storedAuthStatus = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(storedAuthStatus === "true");
      setIsLoading(false);
    }, 0); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Splash />
      ) : (
        <div>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/survey susu"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AdminSurveySusu />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Home />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/surveya" element={<SurveySusu />} />
            <Route path="/surveyb" element={<SurveySikat />} />
            <Route path="/surveyc" element={<SurveyAsuh />} />
            <Route path="/surveyd" element={<SurveyPeriksa />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;

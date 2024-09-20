import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  isAdmin: boolean;
  children: React.ReactNode;
}

const ProtectedAdmin: React.FC<ProtectedRouteProps> = ({
  isAdmin,
  children,
}) => {
  const location = useLocation();
  return isAdmin ? (
    children
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} />
  );
};

export default ProtectedAdmin;

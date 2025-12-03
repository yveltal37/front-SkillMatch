import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext"
import { CircularProgress } from "@mui/material";

export default function AdminProtectedRoute({ children }:  {children: React.ReactNode}) {
  const { user, loading } = useContext(UserContext);

  if (loading) return <CircularProgress />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

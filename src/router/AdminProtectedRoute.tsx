import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext"

export default function AdminProtectedRoute({ children }:  {children: React.ReactNode}) {
  const { user, loading } = useContext(UserContext);

  if (loading) return (<h1>loading...</h1>);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if(!user.isAdmin) return (<h1>you are not admin😑</h1>);
  
  return <>{children}</>;
}

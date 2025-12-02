import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../pages/auth/Auth";
import Admin from "../pages/admin/Admin";
import ChallengePage from "../pages/challengePage/ChallengePage";
import AdminProtectedRoute from "./AdminProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={
          <AdminProtectedRoute> <Admin /> </AdminProtectedRoute>
        } />
        <Route path="/challenges" element={
          <ProtectedRoute> <ChallengePage /> </ProtectedRoute>
        }/>
        <Route path="*" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

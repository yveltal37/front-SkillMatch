import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../pages/auth/Auth";
import Admin from "../pages/admin/Admin";
import AdminProtectedRoute from "./AdminProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={
          <AdminProtectedRoute><Admin /></AdminProtectedRoute>
        } />
        <Route path="*" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

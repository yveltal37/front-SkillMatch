import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../pages/auth/Auth";
import Admin from "../pages/admin/Admin";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

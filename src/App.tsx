import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";
import { UserProvider } from "./context/UserContext.tsx";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navBar/NavBar.tsx";
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          newestOnTop={false}
          closeOnClick
          theme="colored"
        />
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

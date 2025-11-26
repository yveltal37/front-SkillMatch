import "./App.css";
import AppRoutes from "./router/AppRoutes";
import { UserProvider } from "./context/UserContext.tsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        theme="colored"
      />
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </>
  );
}

export default App;

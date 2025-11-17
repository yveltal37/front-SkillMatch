import { useState } from "react";
import AuthForm from "../../components/authForm/AutoForm";
import { Button } from "@mui/material";
import './auth.css';

export default function Signup() {
  const [isLogin, setIsLogin] = useState(true);

  return(
      <div className="authCard">
        <AuthForm isLogin={isLogin} ></AuthForm>
        <Button variant="outlined" onClick={() => setIsLogin(!isLogin)} className="toggleModeButton">
        <span>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
        </span>
        </Button>
      </div>
  );
}

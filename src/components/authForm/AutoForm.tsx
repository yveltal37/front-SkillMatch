import { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./authForm.css"

function AuthForm({ isLogin }: { isLogin: boolean }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in:", { username, password });
    } else {
      console.log("Registering:", { username, password });
    }
  }

  return (
        <form onSubmit={handleSubmit}>
          <h1>{isLogin ? "Login" : "SignUp"}</h1>

          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="contained" type="submit">
            {isLogin ? "Next" : "Login"}
          </Button>
        </form>
  );
}

export default AuthForm

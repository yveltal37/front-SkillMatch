import { useState, useContext } from "react";
import { TextField, Button } from "@mui/material";
import "./authForm.css"
import { signup, login, getCategories } from "../../services/auth-api";
import { UserContext } from "../../context/UserContext";

function AuthForm({ isLogin }: { isLogin: boolean }) {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      try{
        const res = await login({ username, password });
        console.log("Logged in:", res.user);
        sessionStorage.setItem("accessToken", res.tokens.accessToken);
        sessionStorage.setItem("refreshToken", res.tokens.refreshToken);
        setUser(res.user);
      } catch(err){
        console.log(err);
      }
    } else {
      try {
        const res = await signup({ username, password, categoryIds: [1, 2, 3]});
        sessionStorage.setItem("accessToken", res.tokens.accessToken);
        sessionStorage.setItem("refreshToken", res.tokens.refreshToken);
        setUser(res.user);
      } catch (err) {
        console.error(err);
      }
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
            {isLogin ? "Login" : "Next"}
          </Button>
        </form>
  );
}

export default AuthForm

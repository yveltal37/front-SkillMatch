import { useState, useContext } from "react";
import { TextField, Button } from "@mui/material";
import "./authForm.css";
import { signup, login } from "../../api/auth-api";
import { UserContext } from "../../context/UserContext";
import CategorySelector from "../categorySelector/CategorySelector";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AuthForm({ isLogin }: { isLogin: boolean }) {
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isNexted, setIsNexted] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({ username, password });
      console.log("Logged in:", res.user);
      sessionStorage.setItem("accessToken", res.tokens.accessToken);
      sessionStorage.setItem("refreshToken", res.tokens.refreshToken);
      setUser(res.user);
      if (res.user.isAdmin) {
        navigate("/admin");
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "An unknown error occurred.";

      console.error(err);
      toast.error(message);
    }
  };

  const handleSignup = async () => {
    if (!isNexted) {
      if (!username || !password) {
        toast.error("username & password can't be empty");
        return;
      }
      setIsNexted(true);
      return;
    }
    if (selectedCategories.length < 3 || selectedCategories.length > 5) {
      toast.warning("Select between 3 to 5 categories");
      return;
    }
    try {
      const res = await signup({
        username,
        password,
        categoryIds: selectedCategories,
      });
      sessionStorage.setItem("accessToken", res.tokens.accessToken);
      sessionStorage.setItem("refreshToken", res.tokens.refreshToken);
      setUser(res.user);
    } catch (err: any) {
      setIsNexted(false);

      const message =
        err?.response?.data?.message || "An unknown error occurred.";

      console.error(err);
      toast.error(message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await handleLogin();
    } else {
      await handleSignup();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{isLogin ? "Log In" : "Sign Up"}</h1>
      <div className="input-auth">
        {!isLogin && isNexted ? (
          <CategorySelector
            selected={selectedCategories}
            setSelected={setSelectedCategories}
          />
        ) : (
          <>
            <TextField
              label="Username"
              margin="normal"
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
          </>
        )}
      </div>
      <Button variant="contained" type="submit">
        {isLogin ? "Login" : isNexted ? "Signup" : "Next"}
      </Button>
    </form>
  );
}

export default AuthForm;

import { useContext } from "react";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./navBar.css"

function Navbar() {
  const { user, setUser, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/auth");
  };
  
  if (loading) return (<h1 className="navbar">loading...</h1>);

  if(!user) return null;

  return (
    <nav className="navbar">
      <div className="greeting">
        Hello, <strong>{user.username}</strong>!
      </div>

      <div className="links">
        {user.isAdmin ? (
          <>
            <Link to="/admin" className="link">Admin</Link>
            <Link to="/challenges" className="link">Challenges</Link>
          </>
        ) : (
          <Link to="/challenges" className="link">Challenges</Link>
        )}
        <Button onClick={handleLogout} className="logoutButton" endIcon={<LogoutIcon />}>
          Logout
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;

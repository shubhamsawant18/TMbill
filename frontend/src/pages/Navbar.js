import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, [location]); 

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; 
    setIsLoggedIn(false);
    navigate("/login"); 
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="images/logo-chanel.png" alt="Logo" width={50} height={44} />
        </Link>
        <span className="brand-name">SNAPCART</span>
      </div>

      <div className="auth-buttons">
        {isLoggedIn && location.pathname === "/welcome" ? ( 
          <button
            className="logout-btn"
            onClick={handleLogout}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
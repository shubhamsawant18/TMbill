import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get current route
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // ✅ Keep login state updated when navigating
  }, [location]); // ✅ Updates when URL changes

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Remove stored token
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // ✅ Clears authentication cookie
    setIsLoggedIn(false);
    navigate("/login"); // ✅ Redirect after logout
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
        {isLoggedIn && location.pathname === "/welcome" ? ( // ✅ Show Logout ONLY on Welcome Page
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
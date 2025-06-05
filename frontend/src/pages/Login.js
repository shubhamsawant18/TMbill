import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful");
        localStorage.setItem("token", data.token);
        window.location.href = "/welcome";
      } else {
        alert(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <img src="/images/loginbg.jpg" alt="Background" className="background-image" />
      <div className="login-container">
        <h2 className="login-header">Login</h2>
        <p className="login-text">
          Don’t have an account?{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/register")}
          >
            Signup
          </span>
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

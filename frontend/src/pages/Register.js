import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css"; // Link to the CSS file

const Register = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("User created successfully");
        navigate("/login");
      } else {
        alert(data.message || "User already exists. Please login.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-header">Sign Up</h2>
      <p className="register-text">Join us today!</p>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={signupData.username}
          onChange={(e) =>
            setSignupData({ ...signupData, username: e.target.value })
          }
          className="register-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={signupData.email}
          onChange={(e) =>
            setSignupData({ ...signupData, email: e.target.value })
          }
          className="register-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={signupData.password}
          onChange={(e) =>
            setSignupData({ ...signupData, password: e.target.value })
          }
          className="register-input"
          required
        />
        <button type="submit" className="register-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
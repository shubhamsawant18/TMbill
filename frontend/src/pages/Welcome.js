import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css"; 

const Welcome = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/");

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/welcome`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(res.data.message);
      } catch (err) {
        setMessage("Access Denied");
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1>{message}</h1>
        <p>Thank you for logging in. Enjoy exploring TMBill!</p>
      </div>
    </div>
  );
};

export default Welcome;

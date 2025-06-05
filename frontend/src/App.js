import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./pages/Navbar"; // ✅ Correct path
import Register from "./pages/Register";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Navbar included globally */}
      <Routes>
        <Route path="/" element={<Register />} /> {/* Default Page */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
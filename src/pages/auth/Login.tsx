import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/login", {
        username: username.trim(),
        password: password.trim(),
      });

      // If backend sends a token, store it
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // Mark user as authenticated for ProtectedRoute
      localStorage.setItem("isAuth", "true");

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err.response);
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

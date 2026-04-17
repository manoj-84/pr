import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
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

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    localStorage.setItem("isAuth", "true");

    // Show popup message
    toast.success("Login successful! Redirecting to dashboard...");

    // Delay navigation slightly so user sees the popup
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  } catch (err: any) {
    console.error(err.response);
    toast.error(err.response?.data?.error || "Login failed");
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

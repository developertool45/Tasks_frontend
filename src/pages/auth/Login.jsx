import react, { useState } from "react";
import apiClient from "../../../service/ApiClient";
import { useAuth } from "../../context/Context";
import "./style.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser, setRefresh } = useAuth();
  const [error, setError] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(false);
    setSuccessMsg("");
    if (!email || !password) return setError("Please enter email and password");
    try {
      const res = await apiClient.login(email, password);
      if (res.success) {
        setSuccessMsg(res.message);
        setUser(res.data);
        setRefresh((prev) => !prev);
        // Save in localStorage
        localStorage.setItem("userId", JSON.stringify(res.data.id));
        localStorage.setItem("token", JSON.stringify(res.data.token));

        navigate("/all-projects");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setUser(null);
      setSuccessMsg("");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-16 p-6 bg-white rounded-xl shadow-md border">
      <form onSubmit={handleLogin} className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 text-center">
          Login Form
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
        {!error && successMsg && (
          <p className="text-sm text-green-500">{successMsg}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <div className="pt-4 text-sm text-center text-gray-600 space-y-2">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
          <p>
            Forgot Password?{" "}
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Reset Password
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

import { useState } from "react";
import {useAuth} from "../../context/Context";
import apiClient from './../../../service/ApiClient';
import "./style.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Register = () => {
  const [fname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { user, setUser } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    if (user) return navigate("/");
    e.preventDefault();
    setError("");
    setMessage("");
    if (!fname || !email || !password || !username)
      return setError("all fields are required !");
    try {
      const res = await apiClient.signup(fname, email, password, username);
      console.log(res.data);
      setMessage(res.message);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow-md border">
        <form onSubmit={handleRegister} className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 text-center">
            Registration Form
          </h2>

          <input
            type="text"
            value={fname}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
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

          {error && <p className="text-md text-red-500">{error}</p>}
          {message && <p className="text-md text-green-500">{message}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Register
          </button>

          <div className="pt-4 text-sm text-center text-gray-600 space-y-2">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
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
    </>
  );
};

export default Register;

import react, { useState } from "react";
import apiClient from "../../../service/ApiClient";
import { useAuth } from "../../context/Context";
import "./style.css";
import { Link, useSearchParams } from "react-router-dom";


const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, setUser } = useAuth();
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg("");
    if (!password || !confirmPassword)
      return setError("all fields are required !");
    if (password !== confirmPassword) return setError("passwords do not match");
    try {
      const res = await apiClient.resetPassword(token, password);
      if (res.success) {
        console.log(res);
        console.log(res.message);

        return setSuccessMsg(res.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  console.log(successMsg);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border"
      >
        <h2 className="text-xl font-bold text-center text-blue-700 mb-6">
          Reset Password
        </h2>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <h4 className="text-sm mb-3 text-center">
          {successMsg ? (
            <span className="text-green-600">{successMsg}</span>
          ) : error ? (
            <span className="text-red-600">{error}</span>
          ) : (
            ""
          )}
        </h4>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {successMsg ? (
            <Link to="/login" className="block w-full text-center">
              Please Login
            </Link>
          ) : (
            "Reset Password"
          )}
        </button>

        <div className="mt-6 text-sm text-center text-gray-600 space-y-2">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register now
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;

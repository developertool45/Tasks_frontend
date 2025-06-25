import react, {  useState } from "react";
import apiClient from "../../../service/ApiClient";
import { useAuth } from "../../context/Context";
import "./style.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    if (!email) return setError("Please enter an email ");
    try {
      const res = await apiClient.forgotPassword(email);
      console.log(res);

      if (res.success) {
        return setSuccessMsg(res.data);
      }
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="mt-10 flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border"
      >
        <h2 className="text-xl font-bold text-center text-blue-700 mb-6">
          Forgot Password
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <h4 className="text-sm text-red-600 mb-1 text-center">
          {error ? error : ""}
        </h4>
        <h4 className="text-sm text-green-600 mb-4 text-center">
          {successMsg ? successMsg : ""}
        </h4>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {successMsg ? "Resend" : "Reset Password"}
        </button>

        <div className="mt-6 text-sm text-center text-gray-600 space-y-2">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;

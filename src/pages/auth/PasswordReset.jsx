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
  const [error, setError] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword)
      return setError("all fields are required !");
    if (password !== confirmPassword) return setError("passwords do not match");
    try {
      const res = await apiClient.resetPassword(token, password);
      if (res.statusCode !== 200) {
        console.log(res);
        return setSuccessMsg(res.data);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="form">
      <h2>Reset Password</h2>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <h4 className="error">{error ? error : " "}</h4>
      <button type="submit">reset password</button>
      <div className="mt-4 text-sm text-center">
        <div>
          <p>
            Already have an account{" "}
            <Link to="/login" className="redirect">
              Login
            </Link>
          </p>
        </div>
        <div>
          <p>
            Don't have an account{" "}
            <Link to="/register" className="redirect">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default PasswordReset;

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
      <h4 className="error">
        {successMsg ? (
          <span className="sucess">{successMsg}</span>
        ) : error ? (
          error
        ) : (
          ""
        )}
        {/* {error ? error : <span className="sucess">{successMsg} </span>} */}
      </h4>

      <button type="submit">
        {successMsg ? <Link to="/login">Please Login</Link> : "Reset Password"}
      </button>
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

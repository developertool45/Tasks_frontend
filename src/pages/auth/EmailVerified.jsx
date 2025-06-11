import react, { useState } from "react";
import apiClient from "../../../service/ApiClient";
import { useAuth } from "../../context/Context";
import "./style.css";
import { Link, useSearchParams } from "react-router-dom";

const EmailVerified = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { user, setUser } = useAuth();
  const [error, setError] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  console.log("token", token);
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!token) return setError("Please enter a valid token");

    try {
      const res = await apiClient.verifyUser(token);
      console.log(res);

      if (res.success) {
        setSuccessMsg(res.message || res.data.username);
      } else {
        setError(res.message || "Invalid or expired token");
      }
    } catch (error) {
      console.log(error);
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleLogin} className="form">
      <h2 className={successMsg ? "sucess" : ""}>
        {successMsg ? "Email Verified" : "Email Verification"}
      </h2>

      {/* <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      /> */}

      <h4 className="error">{error ? error : " "}</h4>
      <button type="submit">{successMsg ? "verified" : "verify"}</button>
      <div className="mt-4 text-sm text-center">
        <div>
          <p>
            login to your account{" "}
            <Link to="/login" className="redirect">
              Login
            </Link>
          </p>
        </div>
        <div>
          <p>
            Don't have an account{" "}
            <Link to="/email-verification" className="redirect">
              resend email
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default EmailVerified;


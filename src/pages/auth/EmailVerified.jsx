import react, { useState } from "react";
import apiClient from "../../../service/ApiClient";
import { useAuth } from "../../context/Context";
import "./style.css";
import { Link, useParams } from "react-router-dom";

const EmailVerified = () => {
 const [email, setEmail] = useState("");
  const { token } = useParams();  
  const { user, setUser } = useAuth();
  const [error, setError] = useState(false);
const [successMsg, setSuccessMsg] = useState("");
	

	const handleLogin = async (e) => {
	  console.log("token", token);
	  
    e.preventDefault();
    if(!token) return setError("Please enter a valid token");
    try {
      const res = await apiClient.verifyUser(token);
      if (res.ok) {
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
      <h2>User Verification</h2>

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
            <Link to="/register" className="redirect">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default EmailVerified;


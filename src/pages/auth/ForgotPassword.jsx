import react, {  useState } from "react";
import apiClient from "../../../service/ApiClient";
import { useAuth } from "../../context/Context";
import "./style.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");  
	const [error, setError] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email ) return setError("Please enter an email ");
    try {
		const res = await apiClient.forgotPassword(email);
		console.log(res);
		
    if (res.success) {
      return setSuccessMsg(res.data);
    }
    
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="form">
      <h2>Forgot password </h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <h4 className="error">{error ? error : " "}</h4>
      <h4 className="sucess">{successMsg ? successMsg : " "}</h4>

      <button type="submit">{successMsg ? "resend" : "Reset password"}</button>
      <div className="mt-4 text-sm text-center">
        <div>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="redirect">
              Register
            </Link>
          </p>
        </div>
        <div>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="redirect">
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;

import { useState } from "react";
import apiClient from "../../../service/ApiClient";
import { useAuth } from "../../context/Context";
import "./style.css";
import { useNavigate } from "react-router";

const EmailVerification = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { user, setUser } = useAuth();
	const [error, setError] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) return setError("Please enter your email ");
    try {
      const res = await apiClient.verifyEmailResend(email);
    
      if (res.success) {
        return setSuccessMsg(res.data.message);
      }
      
    } catch (error) {
      alert(error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="form">
      <h2>Email Verification</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />     
      <h4 className="error">{error ? error : " "}</h4>
		  <button type="submit">{successMsg ? "Resend" : "Submit"}</button>
		{
		successMsg && <h4 className="sucess">{successMsg ? successMsg : " "} please check your email</h4>
		}
	 
    </form>
  );
};

export default EmailVerification;

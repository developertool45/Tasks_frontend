import react, { useState } from "react";
import apiClient from "../../../service/ApiClient";
import { useAuth } from "../../context/Context";
import "./style.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useAuth();
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
        // Save in localStorage
        console.log(res);

        localStorage.setItem("userId", JSON.stringify(res.data.id));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        console.log(res.message);
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setUser(null);
      setSuccessMsg("");
    }
  };

  return (
    <form onSubmit={handleLogin} className="form">
      <h2>Login Form</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <h4 className="error">
        {error ? error : <span className="sucess">{successMsg}</span>}
      </h4>
      {/* <h4 className="sucess">{successMsg ? successMsg : " "}</h4> */}
      <button type="submit">Login</button>

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
            Forgot Password?{" "}
            <Link to="/forgot-password" className="redirect">
              Reset Password
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;

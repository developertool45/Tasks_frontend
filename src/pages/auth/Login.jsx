import react, { use, useState } from "react";
import apiClient from "../../../service/ApiClient";
import { useAuth } from "../../context/Context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useAuth();
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError("Please enter email and password");

    try {
      const res = await apiClient.login({ email, password });
      if (res.success) setUser(res.data.user);
    } catch (error) {
      alert(res.error);
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
      <h4 className="error">{error ? error : " "}</h4>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

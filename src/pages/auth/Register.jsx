import { useState } from "react";
import {useAuth} from "../../context/Context";
import apiClient from './../../../service/ApiClient';
import "./style.css";
import { useNavigate } from "react-router";

const Register = () => {
  const [fname, setName] = useState("name");
  const [email, setEmail] = useState("name@gmail.com");
  const [password, setPassword] = useState("name@12345");
  const [username, setUsername] = useState("name123");
  const { user, setUser } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!fname || !email || !password || !username)
      return setError("Please enter all fields");
    try {
      const res = await apiClient.signup(fname, email, password, username);
      console.log(res.data);
      if (res.success) setUser(res.data.user);
    } catch (error) {
      if (error.message === "User already exists") {
        setTimeout(() => {
          return navigate("/login");
        }, 1000);
      }
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleRegister} className="form">
        <h2>Registration Form</h2>
        <input
          type="text"
          value={fname}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;

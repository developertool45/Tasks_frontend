import { useState } from "react";
import {useAuth} from "../../context/Context";
import apiClient from './../../../service/ApiClient';
const Register = () => {
	const [fname, setName] = useState("");
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { user,setUser } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("user", user);
    
   try {
     const res = await apiClient.signup(
       fname,
       email,
       password,
       username,
     );

     console.log(res.data);
     
    if (res.success) setUser(res.data.user);   
   } catch (error) {
      console.log(error);
   }
  };

  return (
    <form onSubmit={handleRegister}>
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

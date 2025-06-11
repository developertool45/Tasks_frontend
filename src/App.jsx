import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { AuthProvider } from "./context/Context.jsx";
import Layout from "./Layout/Layout.jsx";
import Error from "./pages/Error.jsx";
import EmailVerification from "./pages/auth/EmailVerification.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import PasswordReset from "./pages/auth/PasswordReset.jsx";
import EmailVerified from "./pages/auth/EmailVerified.jsx";
import Profile from "./pages/auth/Profile.jsx";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-project" element={<h1>add new project</h1>} />
            <Route path="/all-projects" element={<h1> all projects</h1>} />
            <Route
              path="/project-reports"
              element={<h1> projects reports</h1>}
            />
            <Route path="/project/:id" element={<h1> project with id</h1>} />
            // auth route
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/email-verification" element={<EmailVerification />} />
            <Route path="/email-verified/" element={<EmailVerified />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;

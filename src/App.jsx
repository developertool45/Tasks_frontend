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
// protected route
import ProtectedRoute from "./components/PrivateRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

// project route
import ProjectAdmin from "./pages/Projects/ProjectAdmin.jsx";
import AllProjects from "./pages/Projects/AllProjects.jsx";
import CreateProject from "./pages/Projects/CreateProject.jsx";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            // auth route
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/email-verification" element={<EmailVerification />} />
            <Route path="/email-verified/" element={<EmailVerified />} />
            <Route path="/reset-password/" element={<PasswordReset />} />
            // error
            <Route path="*" element={<Error />} />

            // Login/Register route
            <Route element={<PublicRoute />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              // project route
              <Route path="/all-projects" element={<AllProjects />} />
              <Route element={<ProjectAdmin />}>
                <Route path="/create-project" element={<CreateProject />} />
              </Route>
            </Route>
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;

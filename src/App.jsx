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
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;

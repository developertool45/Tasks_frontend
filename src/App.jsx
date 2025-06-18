import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { ToastContainer } from "react-toastify";

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
import ProjectView from "./pages/Projects/ProjectView.jsx";
import EditProject from "./pages/Projects/EditProject.jsx";
import AddMemberToProject from "./pages/Projects/AddMemberToProject.jsx";
import UpdateProjectMember from "./pages/Projects/UpdateProjectMember.jsx";

// tasks route
import ProjectTasks from "./pages/tasks/ProjectTasks.jsx";
import ViewTask from "./pages/tasks/ViewTask.jsx";
// subtasks route
import SubtaskList from "./pages/subTask/SubtaskList.jsx";
import TaskSummary from "./pages/tasks/TaskSummary.jsx";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              // auth route
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/email-verification"
                element={<EmailVerification />}
              />
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
                <Route index path="/all-projects" element={<AllProjects />} />
                <Route path="/projects/:projectId" element={<ProjectView />} />
                <Route
                  path="/tasks/:projectId/:taskId"
                  element={<ViewTask />}
                />
                <Route
                  path="/projects/:projectId/tasks"
                  element={<ProjectTasks />}
                />
                <Route
                  path="/tasks/:projectId/:taskId/subtasks"
                  element={<SubtaskList />}
                />
                <Route element={<ProjectAdmin />}>
                  {/* <Route path="/create-project" element={<CreateProject />} /> */}
                  {/* <Route
                    path="/projects/:projectId"
                    element={<ProjectView />}
                  /> */}
                  <Route
                    path="/projects/:projectId/add-member"
                    element={<AddMemberToProject />}
                  />
                  <Route
                    path="/projects/:projectId/members"
                    element={<UpdateProjectMember />}
                  />
                  <Route
                    path="/projects/:projectId/edit"
                    element={<EditProject />}
                  />
                  <Route
                    path="/projects/:projectId/summary"
                    element={<TaskSummary />}
                  />
                  // task Routes
                  {/* <Route
                    path="/projects/:projectId/tasks"
                    element={<ProjectTasks />}
                  /> */}
                  <Route
                    path="/tasks/:projectId/:taskId/edit"
                    element={<ViewTask />}
                  />
                  // subtasks
                  <Route path="/task-summary" element={<TaskSummary />} />
                </Route>
              </Route>
            </Routes>
          </ErrorBoundary>
        </Layout>
      </AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}
export default App;

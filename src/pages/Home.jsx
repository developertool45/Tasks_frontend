import { useAuth } from "../context/Context";
import { useNavigate } from "react-router-dom";
import TaskSummary from "./tasks/TaskSummary";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6">
      {/* Hero Section */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-blue-600">Task Manager App</h1>
        <p className="mt-2 text-lg text-gray-700">
          Manage your projects and tasks efficiently with your team.
        </p>

        {!user ? (
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded shadow"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="mt-6 text-xl text-gray-700 font-semibold">
            👋 Welcome back, {user.fname}!
          </div>
        )}
      </div>

      {/* Dashboard Section for Logged In Users */}
      {user && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              📁 All Projects
            </h2>
            <p className="text-gray-600 mb-4">
              View and manage all your active projects.
            </p>
            <button
              onClick={() => navigate("/all-projects")}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              View Projects
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              📋 Task Summary
            </h2>
            <p className="text-gray-600 mb-4">
              Check your current task status.
            </p>
            <button
              onClick={() => navigate("/task-summary")}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              View Reports
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-purple-600 mb-2">
              ➕ Create New Project
            </h2>
            <p className="text-gray-600 mb-4">
              Start a new project with your team.
            </p>
            <button
              onClick={() => navigate("/all-projects")}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              Create Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

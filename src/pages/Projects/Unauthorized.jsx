import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[50vh] flex items-center justify-center  ">
      <div className="flex  flex-col items-center justify-center text-center px-4 p-20 border-2 border-red-200">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          🚫 Access Denied
        </h1>
        <p className="text-lg  text-gray-700 mb-6">
          You are not authorized to create a project, <br/> please login as an admin.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;

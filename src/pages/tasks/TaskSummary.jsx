import React, { useEffect, useState } from "react";
import apiClient from "../../../service/ApiClient";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#FF8042", "#0088FE", "#00C49F"];

const AdminProjectReport = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await apiClient.getAllProjectsWithTasks();
      if (res.success) {
        setProjects(res.data.allProjects);
      }
    };
    fetchProjects();
  }, []);

  const getStatusData = (tasks) => {
    const statusCount = { todo: 0, in_progress: 0, done: 0 };
    tasks.forEach((task) => {
      statusCount[task.status] = (statusCount[task.status] || 0) + 1;
    });

    return [
      { name: "To Do", value: statusCount.todo },
      { name: "In Progress", value: statusCount.in_progress },
      { name: "Done", value: statusCount.done },
    ];
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        📊 Admin Task Report
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((item, i) => {
          const statusData = getStatusData(item.tasks);
          const recentTasks = [...item.tasks]
            .sort(
              (a, b) =>
                new Date(b.updatedAt || b.createdAt) -
                new Date(a.updatedAt || a.createdAt)
            )
            .slice(0, 4); // top 4 recent

          return (
            <div
              key={item.project._id}
              className="bg-white p-6 rounded-xl shadow space-y-4"
            >
              <h2 className="text-xl font-bold text-orange-700">
                {i + 1}. {item.project.name}
              </h2>

              {/* Pie Chart */}
              <PieChart width={300} height={250}>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>

              {/* 📋 Task Count Summary */}
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  🧮 Total Tasks: <strong>{item.tasks.length}</strong>
                </p>
                <p>
                  📌 To Do: <strong>{statusData[0].value}</strong>
                </p>
                <p>
                  🚧 In Progress: <strong>{statusData[1].value}</strong>
                </p>
                <p>
                  ✅ Done: <strong>{statusData[2].value}</strong>
                </p>
              </div>

              {/* 🕒 Recent Activities */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 mt-4">
                  🕒 Recent Tasks:
                </h4>
                <ul className="text-sm space-y-1">
                  {recentTasks.map((task) => (
                    <li key={task._id} className="border-b pb-1">
                      <span className="font-medium text-gray-800">
                        {task.title}
                      </span>{" "}
                      —
                      <span
                        className={`ml-2 px-2 py-[2px] rounded text-white text-xs 
                        ${
                          task.status === "done"
                            ? "bg-green-600"
                            : task.status === "in_progress"
                            ? "bg-yellow-500 text-black"
                            : "bg-gray-500"
                        }`}
                      >
                        {task.status}
                      </span>
                    </li>
                  ))}
                  {recentTasks.length === 0 && (
                    <p className="text-gray-500">No recent tasks.</p>
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminProjectReport;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../../service/ApiClient";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#FF8042", "#0088FE", "#00C49F"];

export default function TaskSummary() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  console.log(projectId, tasks);
  
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await apiClient.getProjectTasks(projectId);
      if (res.success) {
        setTasks(res.data);
      }
    };
    fetchTasks();
  }, [projectId]);

  const getStatusCounts = () => {
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

  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt) -
        new Date(a.updatedAt || a.createdAt)
    )
    .slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Project Task Summary</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Task Status Overview</h2>
          <PieChart width={300} height={300}>
            <Pie
              data={getStatusCounts()}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {getStatusCounts().map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <ul className="space-y-2 text-gray-700">
            <li>Total Tasks: {tasks.length}</li>
            <li>To Do: {getStatusCounts()[0].value}</li>
            <li>In Progress: {getStatusCounts()[1].value}</li>
            <li>Completed: {getStatusCounts()[2].value}</li>
          </ul>
        </div>
      </div>

      <div className="bg-white shadow p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">🕒 Recent Activity</h2>
        <ul className="divide-y divide-gray-200">
          {recentTasks.map((task) => (
            <li key={task._id} className="py-2">
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-gray-600">
                {task.status.toUpperCase()} | Updated:{" "}
                {new Date(task.updatedAt).toLocaleString()}
              </p>
            </li>
          ))}
          {recentTasks.length === 0 && <p>No recent activity.</p>}
        </ul>
      </div>
    </div>
  );
}

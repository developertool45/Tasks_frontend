import axios from "axios";
import { toast } from "react-toastify";

// 👉 Roles: create a single axios instance with defaults & interceptors
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/",
  withCredentials: true, // send cookies for refresh‑token
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 8000, // 8s request‑level timeout
});

// 🔄 Interceptor: attach access‑token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ⚠️ Global error handler
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.code === "ECONNABORTED") {
      toast.error("Request timeout. Try again.");
    } else if (err.response && err.response.data?.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error("Network error");
    }
    return Promise.reject(err);
  }
);

// 🔧 Helper methods
const get = (url, cfg = {}) => api.get(url, cfg);
const post = (url, data = {}, cfg = {}) => api.post(url, data, cfg);
const patch = (url, data = {}, cfg = {}) => api.patch(url, data, cfg);

class ApiClient {
  // ===== Auth =====
  getUser = () => post("v1/users/get-profile");
  signup = (payload) => post("v1/users/register", payload);
  login = (payload) => post("v1/users/login", payload);
  verifyEmailResend = (email) => post("v1/users/verify-email-resend", { email });
  verifyUser = (token) => get(`v1/users/verify-email/?token=${token}`);
  forgotPassword = (email) => post("v1/users/forgot-password", { email });
  resetPassword = (token, password) => post("v1/users/reset-password", { token, password });
  verifyEmail = (token) => post("v1/users/verify-email", { token });
  getProfile = () => post("v1/users/get-profile");
  refreshAccessToken = () => post("v1/users/refresh-token");
  updateProfile = (data) => post("v1/users/update-profile", data);
  uploadAvatar = (id, formData) =>
    post(`v1/users/upload-avatar/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
  logout = () => get("v1/users/logout");
  changePassword = (data) => post("v1/users/change-password", data);

  // ===== Projects =====
  getAllProjects = () => get("v1/projects/all-projects");
  createProject = (payload) => post("v1/projects/new-project", payload);
  getProject = (id) => get(`v1/projects/get-project/${id}`);
  updateProject = (id, payload) => post(`v1/projects/update-project/${id}`, payload);
  deleteProject = (id) => post(`v1/projects/delete-project/${id}`);
  addMembertoProject = (id, email) => post(`v1/projects/add-project-member/${id}`, { email });
  getProjectMembers = (id) => post(`v1/projects/project-members/${id}`);
  updateProjectMembers = (id, email) => post(`v1/projects/update-project-members/${id}`, { email });
  updateMemberRole = (projectId, memberId, role) => post(`v1/projects/update-member-role/${projectId}/${memberId}`, { role });
  deleteMember = (id, memberId, email) => post(`v1/projects/delete-member/${id}/${memberId}`, { email });
  getAllProjectsWithTasks = () => get("v1/projects/all-projects-with-tasks");

  // ===== Tasks =====
  getProjectTasks = (projectId) => get(`v1/tasks/project-tasks/${projectId}`);
  createTask = (projectId, payload) => post(`v1/tasks/create-task/${projectId}`, payload);
  getTask = (projectId, taskId) => get(`v1/tasks/get-task/${projectId}/${taskId}`);
  updateTask = (projectId, taskId, payload) => post(`v1/tasks/update-task/${projectId}/${taskId}`, payload);
  deleteTask = (projectId, taskId) => post(`v1/tasks/delete-task/${projectId}/${taskId}`);
  assignTask = (projectId, taskId, email) => post(`v1/tasks/assign-task/${projectId}/${taskId}`, { email });

  // ===== Subtasks =====
  getSubTasks = (projectId, taskId) => get(`v1/subtasks/all-subtasks/${projectId}/${taskId}`);
  createSubTask = (projectId, taskId, payload) => post(`v1/subtasks/create-subtask/${projectId}/${taskId}`, payload);
  updateSubTask = (projectId, taskId, id, payload) => post(`v1/subtasks/update-subtask/${projectId}/${taskId}/${id}`, payload);
  deleteSubTask = (projectId, taskId, id) => post(`v1/subtasks/delete-subtask/${projectId}/${taskId}/${id}`);

  // ===== Notes =====
  getNotes = (projectId) => get(`v1/notes/${projectId}`);
  createNote = (projectId, noteId, payload) => post(`v1/project-note/${projectId}/${noteId}`, payload);
  updateNote = (projectId, noteId, payload) => patch(`v1/update-note/${projectId}/${noteId}`, payload);
  deleteNote = (projectId, noteId) => post(`v1/delete-note/${projectId}/${noteId}`);
}

export default new ApiClient();

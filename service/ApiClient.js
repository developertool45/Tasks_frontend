class ApiClient{
	constructor() {
		this.baseUrl = 'http://localhost:8000/api/';
		this.defaultHeaders = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		}		
	}
	async customFetch( endpoints, options= {}) {
		try {
			const url = `${this.baseUrl}${endpoints}`;
			const headers = { ...this.defaultHeaders, ...options.headers }
			const config = {
				...options, headers,
				credentials: 'include'
			}
			// console.log(`fetching Url : ${url}`)

			const response = await fetch(url, config);
			const data = await response.json();

			if (!response.ok) {
				// error object
				if (response.status === 400) {
					throw Error(err.message);
				}					
			}
			return data;
		} catch (error) {
			console.log("fetch error", error);
			throw Error(error.message);
		}
	}

	async getUser() {
		return this.customFetch('v1/users/get-profile', {
			method: "POST",
		})
	}
	async signup(fname, email, password,username) {
		return this.customFetch('v1/users/register', {
			method: "POST",
			body: JSON.stringify({ fname, email, password ,username})
		})
	}
	async login(email, password) {
		return this.customFetch('v1/users/login', {
			method: "POST",
			body: JSON.stringify({email, password})
		})
	}
	async verifyEmailResend(email) {
		return this.customFetch('v1/users/verify-email-resend', {
			method: "POST",
			body: JSON.stringify({email})
		})
	}
	async verifyUser(token) {
		return this.customFetch(`v1/users/verify-email/?token=${token}`, {
			method: "get",			
		})
	}
	async forgotPassword(email) {
		return this.customFetch('v1/users/forgot-password', {
			method: "POST",
			body: JSON.stringify({email})
		})
	}
	async resetPassword(token, password) {
		return this.customFetch('v1/users/reset-password', {
			method: "POST",
			body: JSON.stringify({token, password})
		})
	}
	async verifyEmail(token) {
		return this.customFetch('v1/users/verify-email', {
			method: "POST",
			body: JSON.stringify({token})
		})
	}
	async getProfile() {
		return this.customFetch('v1/users/get-profile', {
			method: "post",
		})
	}
	async logout() {
		return this.customFetch('v1/users/logout', {
			method: "get",
		})
	}
	async getAllProjects() {
		return this.customFetch('v1/projects/all-projects', {
			method: "get",
		})
	}
	async createProject(name, description) {
		return this.customFetch('v1/projects/new-project', {
			method: "post",
			body: JSON.stringify({name, description})
		})
	}
	async getProject(id) {
		return this.customFetch(`v1/projects/get-project/${id}`, {
			method: "get",
		})
	}
	async updateProject(id, name, description, status) {
		return this.customFetch(`v1/projects/update-project/${id}`, {
			method: "post",
			body: JSON.stringify({name, description, status})
		})
	}
	async deleteProject(id) {
		return this.customFetch(`v1/projects/delete-project/${id}`, {
			method: "post",
		})
	}
	async addMembertoProject(id, email) {
		return this.customFetch(`v1/projects/add-project-member/${id}`, {
			method: "post",
			body: JSON.stringify({email})
		})
	}
	async getProjectMembers(id) {
		return this.customFetch(`v1/projects/project-members/${id}`, {
			method: "post",
		})
	}
	async updateProjectMembers(id, email) {
		return this.customFetch(`v1/projects/update-project-members/${id}`, {
			method: "post",
			body: JSON.stringify({email})
		})
	}
	async updateMemberRole(projectId, memberId, role) {
		return this.customFetch(`v1/projects/update-member-role/${projectId}/${memberId}`, {	
			method: "post",
			body: JSON.stringify({role})
		})
	}
	async deleteMember(id, memberId, email) {
		return this.customFetch(`v1/projects/delete-member/${id}/${memberId}`, {
			method: "post",
			body: JSON.stringify({email})
		})
	}
	// tasks endpoints
	async getProjectTasks(projectId) {
		return this.customFetch(`v1/tasks/project-tasks/${projectId}`, {
			method: "get",
		})
	}
	async createTask({ title, description, assignedTo, status, projectId }) {
		return this.customFetch(`v1/tasks/create-task/${projectId}`, {
			method: "post",
			body: JSON.stringify({title, description, assignedTo, status})
		})
	}
	async getTask(projectId, taskId) {
		return this.customFetch(`v1/tasks/get-task/${projectId}/${taskId}`, {
			method: "get",
		})
	}
	async updateTask(projectId, id, { title, description, assignedTo, status }) {
		return this.customFetch(`v1/tasks/update-task/${projectId}/${id}`, {
			method: "post",
			body: JSON.stringify({title, description, assignedTo, status})
		})
	}
	async deleteTask( projectId,id) {
		return this.customFetch(`v1/tasks/delete-task/${projectId}/${id}`, {
			method: "post",
		})
	}
	async assignTask(projectId, taskId, email) {
		return this.customFetch(`v1/tasks/assign-task/${projectId}/${taskId}`, {
			method: "post",
			body: JSON.stringify({email})
		})
	}
	async getSubTasks(projectId,taskId) {
		return this.customFetch(`v1/subtasks/all-subtasks/${projectId}/${taskId}`, {
			method: "get",
		})
	}
	async createSubTask(projectId, taskId, { title, isCompleted }) {
		return this.customFetch(`v1/subtasks/create-subtask/${projectId}/${taskId}`, {
			method: "post",
			body: JSON.stringify({title, isCompleted})
		})
	}
	async updateSubTask(projectId, taskId, id, { title, status: isCompleted }) {
		return this.customFetch(`v1/subtasks/update-subtask/${projectId}/${taskId}/${id}`, {
			method: "post",
			body: JSON.stringify({title, isCompleted})
		})
	}
	async deleteSubTask(projectId, taskId, id) {
		return this.customFetch(`v1/subtasks/delete-subtask/${projectId}/${taskId}/${id}`, {
			method: "post",
		})
	}

}

const apiClient = new ApiClient();

export default apiClient;
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

			if (!response.ok) {
				// error object
				const err = await response.json();
				if (response.status === 400) {
					throw Error(err.message);
				}
					
			}						
			const data = await response.json();		
			
			return data;
		} catch (error) {
			console.log("fetch error", error);
			throw Error(error.message);
		}
	}

	async getUser() {
		return this.customFetch('v1/users/me', {
			method: "GET",
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
			method: "POST",
		})
	}
}

const apiClient = new ApiClient();

export default apiClient;
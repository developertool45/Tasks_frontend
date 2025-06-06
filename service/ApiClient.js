class ApiClient{
	constructor() {
		this.baseUrl = 'http://localhost:8000/api/v1';
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
				withCredentials: true
			}
			console.log(`fetching Url : ${url}${config}`)

			const response = await fetch(url, config);

			if (response.ok !== 200) {
				throw Error('response not come');
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.log('Error : ', error);
			throw error;
		}
	}

	async getUser() {
		return this.customFetch('/users/me', {
			method: "GET",
		})
	}
	async signup(fname, email, password,username) {
		return this.customFetch('/users/register', {
			method: "POST",
			body: JSON.stringify({ fname, email, password ,username})
		})
	}
	async login(email, password) {
		return this.customFetch('/users/login', {
			method: "POST",
			body: JSON.stringify({ name, email, password })
		})
	}

	async getProfile() {
		return this.customFetch('/users/me')
	}
	async logout() {
		return this.customFetch('/users/logout', {
			method: "POST",
		})
	}
}

const apiClient = new ApiClient();

export default apiClient;
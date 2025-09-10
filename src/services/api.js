const API_BASE_URL = 'http://localhost:3000';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available (but not for signin/signup endpoints)
    const isAuthEndpoint = endpoint.includes('/signin') || endpoint.includes('/signup');
    const token = localStorage.getItem('access_token');
    
    if (token && !isAuthEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('API Request - Token added:', token.substring(0, 20) + '...');
    } else {
      console.log('API Request - No token found or auth endpoint');
    }

    try {
      console.log('🌐 Making API request:', { method: config.method || 'GET', url });
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        console.error('🚨 API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          data: data,
          url: url,
          headers: config.headers
        });
        throw new Error(data.error || data.message || `API request failed with status ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  async get(endpoint) {
    return this.request(endpoint);
  }

  async post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  async uploadFile(endpoint, formData) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('access_token');
    
    const config = {
      method: 'POST',
      body: formData,
    };

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'File upload failed');
      }

      return data;
    } catch (error) {
      console.error('File Upload Error:', error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
export default apiClient;
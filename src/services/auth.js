import { apiClient } from './api';

export const authService = {
  // Tutor Authentication
  async tutorSignup(userData) {
    try {
      const response = await apiClient.post('/api/tutors/signup', userData);
      
      // Store auth data
      if (response.session) {
        this.storeAuthData(response.session, response.tutor, 'tutor');
      }
      
      return response;
    } catch (error) {
      console.error('Tutor signup error:', error);
      throw error;
    }
  },

  async tutorSignin(credentials) {
    try {
      const response = await apiClient.post('/api/tutors/signin', credentials);
      
      // Store auth data
      if (response.session) {
        this.storeAuthData(response.session, response.tutor, 'tutor');
      }
      
      return response;
    } catch (error) {
      console.error('Tutor signin error:', error);
      throw error;
    }
  },

  // Student Authentication
  async studentSignup(userData) {
    try {
      const response = await apiClient.post('/api/students/signup', userData);
      
      if (response.session) {
        this.storeAuthData(response.session, response.student, 'student');
      }
      
      return response;
    } catch (error) {
      console.error('Student signup error:', error);
      throw error;
    }
  },

  async studentSignin(credentials) {
    try {
      const response = await apiClient.post('/api/students/signin', credentials);
      
      if (response.session) {
        this.storeAuthData(response.session, response.student, 'student');
      }
      
      return response;
    } catch (error) {
      console.error('Student signin error:', error);
      throw error;
    }
  },

  // Auth Data Management
  storeAuthData(session, user, userType) {
    localStorage.setItem('access_token', session.access_token);
    localStorage.setItem('refresh_token', session.refresh_token);
    localStorage.setItem('expires_at', session.expires_at.toString());
    localStorage.setItem('user_type', userType);
    localStorage.setItem('user_data', JSON.stringify(user));
  },

  getStoredUser() {
    try {
      const userData = localStorage.getItem('user_data');
      const userType = localStorage.getItem('user_type');
      
      if (userData && userType) {
        return {
          user: JSON.parse(userData),
          userType: userType
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error getting stored user:', error);
      return null;
    }
  },

  isAuthenticated() {
    const token = localStorage.getItem('access_token');
    const expiresAt = localStorage.getItem('expires_at');
    
    if (!token || !expiresAt) {
      return false;
    }
    
    // Check if token is expired
    const now = Math.floor(Date.now() / 1000);
    return parseInt(expiresAt) > now;
  },

  getUserType() {
    return localStorage.getItem('user_type');
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_data');
  },

  // Token refresh (if needed)
  async refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    try {
      // Note: This endpoint might need to be implemented in the API
      const response = await apiClient.post('/api/auth/refresh', {
        refresh_token: refreshToken
      });
      
      if (response.session) {
        localStorage.setItem('access_token', response.session.access_token);
        localStorage.setItem('expires_at', response.session.expires_at.toString());
      }
      
      return response;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.logout();
      throw error;
    }
  },

  // Get fresh user details from server
  async refreshUserDetails() {
    try {
      const userType = this.getUserType();
      const storedUser = this.getStoredUser();
      
      if (!userType || !storedUser) {
        throw new Error('No user data found');
      }

      let response;
      if (userType === 'tutor') {
        console.log('🔄 Fetching latest tutor details for ID:', storedUser.user.id);
        response = await apiClient.get(`/api/tutors/${storedUser.user.id}`);
        console.log('📋 Latest tutor details response:', response);
        if (response.tutor) {
          console.log('💼 Updated tutor data:', response.tutor);
          console.log('💰 Latest account balance:', response.tutor.account_balance);
          // Update stored user data
          localStorage.setItem('user_data', JSON.stringify(response.tutor));
          return response.tutor;
        }
      } else if (userType === 'student') {
        console.log('🔄 Fetching latest student details for ID:', storedUser.user.id);
        response = await apiClient.get(`/api/students/${storedUser.user.id}`);
        console.log('📋 Latest student details response:', response);
        if (response.student) {
          console.log('🎓 Updated student data:', response.student);
          // Update stored user data
          localStorage.setItem('user_data', JSON.stringify(response.student));
          return response.student;
        }
      }
      
      throw new Error('Failed to get user details');
    } catch (error) {
      console.error('Refresh user details error:', error);
      throw error;
    }
  }
};
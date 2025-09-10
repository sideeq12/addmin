import { apiClient } from './api';

export const quizService = {
  // Quiz Management
  async createQuiz(quizData) {
    try {
      console.log('🧠 Creating quiz with data:', quizData);
      const response = await apiClient.post('/api/quizzes', quizData);
      console.log('✅ Quiz creation response:', response);
      return response;
    } catch (error) {
      console.error('❌ Create quiz error:', error);
      
      // Handle case where quiz endpoints are not implemented yet
      if (error.message.includes('<!DOCTYPE') || error.message.includes('Cannot POST')) {
        throw new Error('Quiz creation endpoint not implemented yet. Please ask the backend developer to implement POST /api/quizzes');
      }
      
      throw error;
    }
  },

  async getAllQuizzes(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.is_published !== undefined) queryParams.append('is_published', filters.is_published);
      if (filters.search) queryParams.append('search', filters.search);
      
      const url = `/api/quizzes${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      console.log('📚 Fetching all quizzes from:', url);
      const response = await apiClient.get(url);
      console.log('📋 All quizzes response:', response);
      return response;
    } catch (error) {
      console.error('Get quizzes error:', error);
      throw error;
    }
  },

  async getTutorQuizzes(tutorId) {
    try {
      console.log('📚 Fetching tutor\'s quizzes from my-quizzes endpoint');
      // Use the new endpoint implemented by backend
      const response = await apiClient.get('/api/quizzes/my-quizzes');
      console.log('📋 My quizzes response:', response);
      return response;
    } catch (error) {
      console.error('Get tutor quizzes error:', error);
      
      // Handle case where quiz endpoints are not implemented yet
      if (error.message.includes('<!DOCTYPE') || error.message.includes('Cannot GET')) {
        console.log('🚧 Quiz endpoints not implemented yet, returning empty result');
        return { quizzes: [] };
      }
      
      throw error;
    }
  },

  async getQuizById(quizId) {
    try {
      console.log('🔍 Fetching quiz by ID:', quizId);
      const response = await apiClient.get(`/api/quizzes/${quizId}`);
      console.log('📄 Quiz details response:', response);
      return response;
    } catch (error) {
      console.error('Get quiz by ID error:', error);
      throw error;
    }
  },

  async updateQuiz(quizId, updateData) {
    try {
      console.log('📝 Updating quiz:', quizId, 'with data:', updateData);
      const response = await apiClient.put(`/api/quizzes/${quizId}`, updateData);
      console.log('✅ Quiz update response:', response);
      return response;
    } catch (error) {
      console.error('Update quiz error:', error);
      throw error;
    }
  },

  async publishQuiz(quizId) {
    try {
      console.log('📢 Publishing quiz:', quizId);
      const response = await apiClient.put(`/api/quizzes/${quizId}`, { is_published: true });
      console.log('✅ Quiz published successfully:', response);
      return response;
    } catch (error) {
      console.error('Publish quiz error:', error);
      throw error;
    }
  },

  async unpublishQuiz(quizId) {
    try {
      console.log('📝 Unpublishing quiz:', quizId);
      const response = await apiClient.put(`/api/quizzes/${quizId}`, { is_published: false });
      console.log('✅ Quiz unpublished successfully:', response);
      return response;
    } catch (error) {
      console.error('Unpublish quiz error:', error);
      throw error;
    }
  },

  async deleteQuiz(quizId) {
    try {
      console.log('🗑️ Deleting quiz:', quizId);
      const response = await apiClient.delete(`/api/quizzes/${quizId}`);
      console.log('✅ Quiz deleted successfully:', response);
      return response;
    } catch (error) {
      console.error('Delete quiz error:', error);
      throw error;
    }
  },

  // Question Management
  async addQuestion(quizId, questionData) {
    try {
      console.log('❓ Adding question to quiz:', quizId, 'data:', questionData);
      const response = await apiClient.post(`/api/quizzes/${quizId}/questions`, questionData);
      console.log('✅ Question added successfully:', response);
      return response;
    } catch (error) {
      console.error('Add question error:', error);
      throw error;
    }
  },

  async getQuizQuestions(quizId) {
    try {
      console.log('📋 Fetching questions for quiz:', quizId);
      const response = await apiClient.get(`/api/quizzes/${quizId}/questions`);
      console.log('❓ Quiz questions response:', response);
      return response;
    } catch (error) {
      console.error('Get quiz questions error:', error);
      throw error;
    }
  },

  async updateQuestion(quizId, questionId, questionData) {
    try {
      console.log('📝 Updating question:', questionId, 'in quiz:', quizId);
      const response = await apiClient.put(`/api/quizzes/${quizId}/questions/${questionId}`, questionData);
      console.log('✅ Question updated successfully:', response);
      return response;
    } catch (error) {
      console.error('Update question error:', error);
      throw error;
    }
  },

  async deleteQuestion(quizId, questionId) {
    try {
      console.log('🗑️ Deleting question:', questionId, 'from quiz:', quizId);
      const response = await apiClient.delete(`/api/quizzes/${quizId}/questions/${questionId}`);
      console.log('✅ Question deleted successfully:', response);
      return response;
    } catch (error) {
      console.error('Delete question error:', error);
      throw error;
    }
  },

  // Quiz Submissions
  async getQuizSubmissions(quizId, filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.student_id) queryParams.append('student_id', filters.student_id);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.page) queryParams.append('page', filters.page);
      if (filters.limit) queryParams.append('limit', filters.limit);
      
      const url = `/api/quizzes/${quizId}/submissions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      console.log('📊 Fetching quiz submissions from:', url);
      const response = await apiClient.get(url);
      console.log('📋 Quiz submissions response:', response);
      return response;
    } catch (error) {
      console.error('Get quiz submissions error:', error);
      throw error;
    }
  },

  async getSubmissionDetails(quizId, submissionId) {
    try {
      console.log('🔍 Fetching submission details:', submissionId);
      const response = await apiClient.get(`/api/quizzes/${quizId}/submissions/${submissionId}`);
      console.log('📄 Submission details response:', response);
      return response;
    } catch (error) {
      console.error('Get submission details error:', error);
      throw error;
    }
  },

  // Analytics
  async getQuizAnalytics(quizId) {
    try {
      console.log('📊 Fetching quiz analytics:', quizId);
      const response = await apiClient.get(`/api/quizzes/${quizId}/analytics`);
      console.log('📈 Quiz analytics response:', response);
      return response;
    } catch (error) {
      console.error('Get quiz analytics error:', error);
      throw error;
    }
  }
};
import { apiClient } from './api';

export const courseService = {
  // Course Management
  async createCourse(courseData) {
    try {
      const response = await apiClient.post('/api/courses', courseData);
      return response;
    } catch (error) {
      console.error('Create course error:', error);
      throw error;
    }
  },

  async getAllCourses(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.level) queryParams.append('level', filters.level);
      if (filters.featured) queryParams.append('featured', filters.featured);
      if (filters.search) queryParams.append('search', filters.search);
      
      const url = `/api/courses${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await apiClient.get(url);
      return response;
    } catch (error) {
      console.error('Get courses error:', error);
      throw error;
    }
  },

  async getCourseById(courseId) {
    try {
      const response = await apiClient.get(`/api/courses/${courseId}`);
      return response;
    } catch (error) {
      console.error('Get course by ID error:', error);
      throw error;
    }
  },

  async getTutorCourses(tutorId) {
    try {
      const response = await apiClient.get(`/api/courses/tutor/${tutorId}`);
      return response;
    } catch (error) {
      console.error('Get tutor courses error:', error);
      throw error;
    }
  },

  async updateCourse(courseId, updateData) {
    try {
      const response = await apiClient.put(`/api/courses/${courseId}`, updateData);
      return response;
    } catch (error) {
      console.error('Update course error:', error);
      throw error;
    }
  },

  async deleteCourse(courseId) {
    try {
      const response = await apiClient.delete(`/api/courses/${courseId}`);
      return response;
    } catch (error) {
      console.error('Delete course error:', error);
      throw error;
    }
  },

  // Section Management
  async createSection(sectionData) {
    try {
      const response = await apiClient.post('/api/sections', sectionData);
      return response;
    } catch (error) {
      console.error('Create section error:', error);
      throw error;
    }
  },

  async getCourseSections(courseId) {
    try {
      const response = await apiClient.get(`/api/sections/course/${courseId}`);
      return response;
    } catch (error) {
      console.error('Get course sections error:', error);
      throw error;
    }
  },

  async getSectionById(sectionId) {
    try {
      const response = await apiClient.get(`/api/sections/${sectionId}`);
      return response;
    } catch (error) {
      console.error('Get section by ID error:', error);
      throw error;
    }
  },

  async updateSection(sectionId, updateData) {
    try {
      const response = await apiClient.put(`/api/sections/${sectionId}`, updateData);
      return response;
    } catch (error) {
      console.error('Update section error:', error);
      throw error;
    }
  },

  async deleteSection(sectionId) {
    try {
      const response = await apiClient.delete(`/api/sections/${sectionId}`);
      return response;
    } catch (error) {
      console.error('Delete section error:', error);
      throw error;
    }
  },

  // Video Management
  async createVideo(videoData) {
    try {
      const response = await apiClient.post('/api/videos', videoData);
      return response;
    } catch (error) {
      console.error('Create video error:', error);
      throw error;
    }
  },

  async getSectionVideos(sectionId) {
    try {
      const response = await apiClient.get(`/api/videos/section/${sectionId}`);
      return response;
    } catch (error) {
      console.error('Get section videos error:', error);
      throw error;
    }
  },

  async getCourseVideos(courseId) {
    try {
      const response = await apiClient.get(`/api/videos/course/${courseId}`);
      return response;
    } catch (error) {
      console.error('Get course videos error:', error);
      throw error;
    }
  },

  async getVideoById(videoId) {
    try {
      const response = await apiClient.get(`/api/videos/${videoId}`);
      return response;
    } catch (error) {
      console.error('Get video by ID error:', error);
      throw error;
    }
  },

  async updateVideo(videoId, updateData) {
    try {
      const response = await apiClient.put(`/api/videos/${videoId}`, updateData);
      return response;
    } catch (error) {
      console.error('Update video error:', error);
      throw error;
    }
  },

  async deleteVideo(videoId) {
    try {
      const response = await apiClient.delete(`/api/videos/${videoId}`);
      return response;
    } catch (error) {
      console.error('Delete video error:', error);
      throw error;
    }
  }
};
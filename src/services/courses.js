import { apiClient } from './api';

export const courseService = {
  // Course Management
  async createCourse(courseData) {
    try {
      console.log('Creating course with data:', courseData);
      const response = await apiClient.post('/api/courses', courseData);
      console.log('Course creation response:', response);
      console.log('🔍 Thumbnail in response:', response.course?.thumbnail_url || response.course?.thumbnail || 'NOT FOUND');
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
      console.log('🔍 Fetching course by ID:', courseId);
      console.log('🔗 API endpoint:', `/api/courses/${courseId}`);
      const response = await apiClient.get(`/api/courses/${courseId}`);
      console.log('📦 Course response:', response);
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

  async publishCourse(courseId) {
    try {
      console.log('📢 Publishing course with PUT request to:', `/api/courses/${courseId}`);
      const response = await apiClient.put(`/api/courses/${courseId}`);
      console.log('📤 Publish course response:', response);
      return response;
    } catch (error) {
      console.error('Publish course error:', error);
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

  async addSection(courseId, sectionData) {
    try {
      // Validate inputs
      if (!courseId) {
        throw new Error('Course ID is required');
      }
      if (!sectionData.title || !sectionData.title.trim()) {
        throw new Error('Section title is required');
      }

      // Get existing sections to calculate next position
      let position = 1;
      try {
        const existingSections = await this.getCourseSections(courseId);
        if (existingSections.sections && existingSections.sections.length > 0) {
          position = existingSections.sections.length + 1;
        }
        console.log(`📊 Found ${existingSections.sections?.length || 0} existing sections, using position ${position}`);
      } catch (err) {
        console.log('Could not get existing sections, using position 1:', err.message);
      }

      const payload = {
        course_id: courseId,
        title: sectionData.title.trim(),
        position: position,
        resources: sectionData.resources ? sectionData.resources.trim() : ""
      };
      
      console.log('🚀 Adding section with payload:', payload);
      console.log('📍 Using endpoint: /api/sections');
      
      const response = await apiClient.post('/api/sections', payload);
      console.log('✅ Add section API response:', response);
      return response;
    } catch (error) {
      console.error('❌ Add section error:', error.message);
      if (error.response) {
        console.error('📋 Error details:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        });
      }
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

  async getSectionVideos(sectionId) {
    try {
      console.log('🎥 Fetching videos for section:', sectionId);
      const response = await apiClient.get(`/api/videos/section/${sectionId}`);
      console.log('📹 Section videos response:', response);
      return response;
    } catch (error) {
      console.error('Get section videos error:', error);
      throw error;
    }
  },

  async deleteVideo(videoId) {
    try {
      console.log('🗑️ Deleting video with ID:', videoId);
      const response = await apiClient.delete(`/api/videos/${videoId}`);
      console.log('✅ Video deleted successfully:', response);
      return response;
    } catch (error) {
      console.error('Delete video error:', error);
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
      console.log('🗑️ Deleting section with ID:', sectionId);
      const response = await apiClient.delete(`/api/sections/${sectionId}`);
      console.log('✅ Section deleted successfully:', response);
      return response;
    } catch (error) {
      console.error('Delete section error:', error);
      throw error;
    }
  },

  // Video Management
  async createVideo(videoData) {
    try {
      // Ensure video_url is used consistently
      const payload = {
        ...videoData,
        video_url: videoData.video_url || videoData.videoUrl
      };
      delete payload.videoUrl; // Remove old format if it exists
      
      const response = await apiClient.post('/api/videos', payload);
      return response;
    } catch (error) {
      console.error('Create video error:', error);
      throw error;
    }
  },

  async addVideo(courseId, sectionId, videoData) {
    try {
      // Validate inputs
      if (!courseId) throw new Error('Course ID is required');
      if (!sectionId) throw new Error('Section ID is required');
      if (!videoData.title?.trim()) throw new Error('Video title is required');
      if (!videoData.video_url && !videoData.videoUrl) throw new Error('Video URL is required');

      // Get existing videos to calculate position
      let position = 1;
      try {
        const existingVideos = await this.getSectionVideos(sectionId);
        if (existingVideos.videos && existingVideos.videos.length > 0) {
          position = existingVideos.videos.length + 1;
        }
        console.log(`📊 Found ${existingVideos.videos?.length || 0} existing videos, using position ${position}`);
      } catch (err) {
        console.log('Could not get existing videos, using position 1:', err.message);
      }

      // Updated payload format to match backend API documentation
      const payload = {
        course_id: courseId,
        section_id: sectionId,
        title: videoData.title.trim(),
        description: videoData.description ? videoData.description.trim() : "",
        video_url: videoData.video_url || videoData.videoUrl,
        duration: videoData.duration || "0:00",
        position: position,
        preview: videoData.preview || false
      };

      console.log('🚀 Adding video with payload:', payload);
      const response = await apiClient.post('/api/videos', payload);
      console.log('✅ Add video API response:', response);
      return response;
    } catch (error) {
      console.error('❌ Add video error:', error.message);
      if (error.response) {
        console.error('📋 Error details:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        });
      }
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
  },

  // Enrollment Management
  async getEnrollments(courseId, filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.page) queryParams.append('page', filters.page);
      if (filters.limit) queryParams.append('limit', filters.limit);
      
      const url = `/api/enrollments/course/${courseId}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await apiClient.get(url);
      return response;
    } catch (error) {
      console.error('Get enrollments error:', error);
      throw error;
    }
  },

  async enrollStudent(courseId, studentData) {
    try {
      const payload = {
        course_id: courseId,
        student_email: studentData.email,
        student_name: studentData.name
      };
      const response = await apiClient.post('/api/enrollments', payload);
      return response;
    } catch (error) {
      console.error('Enroll student error:', error);
      throw error;
    }
  },

  async updateEnrollmentStatus(enrollmentId, status) {
    try {
      const payload = { status };
      const response = await apiClient.put(`/api/enrollments/${enrollmentId}/status`, payload);
      return response;
    } catch (error) {
      console.error('Update enrollment status error:', error);
      throw error;
    }
  },

  async deleteEnrollment(enrollmentId) {
    try {
      const response = await apiClient.delete(`/api/enrollments/${enrollmentId}`);
      return response;
    } catch (error) {
      console.error('Delete enrollment error:', error);
      throw error;
    }
  }
};
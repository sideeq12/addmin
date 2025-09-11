import { apiClient } from './api';

export const uploadService = {
  // Video Upload
  async uploadVideo(videoFile, onProgress = null) {
    try {
      const formData = new FormData();
      formData.append('file', videoFile);

      // Create XMLHttpRequest for progress tracking
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // Track upload progress
        if (onProgress) {
          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              const percentComplete = (event.loaded / event.total) * 100;
              onProgress(Math.round(percentComplete));
            }
          });
        }

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch (error) {
              reject(new Error('Invalid response format'));
            }
          } else {
            try {
              const errorResponse = JSON.parse(xhr.responseText);
              reject(new Error(errorResponse.error || 'Upload failed'));
            } catch {
              reject(new Error('Upload failed'));
            }
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Network error during upload'));
        });

        xhr.addEventListener('timeout', () => {
          reject(new Error('Upload timeout'));
        });

        // Set timeout to 5 minutes
        xhr.timeout = 300000;

        xhr.open('POST', `${apiClient.baseURL}/api/uploads/video`);
        
        // Add authorization header after opening the request

        console.log('Video upload request opened');
        const token = localStorage.getItem('access_token');
        if (token) {
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }

        xhr.send(formData);
        console.log('Video upload request sent')
      } );
    } catch (error) {
      console.error('Video upload error:', error);
      throw error;
    }
  },

  // Image Upload
  async uploadImage(imageFile, onProgress = null) {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // Track upload progress
        if (onProgress) {
          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              const percentComplete = (event.loaded / event.total) * 100;
              onProgress(Math.round(percentComplete));
            }
          });
        }

        xhr.addEventListener('load', () => {
          console.log('Image upload response status:', xhr.status);
          console.log('Image upload response text:', xhr.responseText);
          
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch (error) {
              console.error('JSON parse error:', error);
              reject(new Error('Invalid response format'));
            }
          } else {
            try {
              const errorResponse = JSON.parse(xhr.responseText);
              reject(new Error(errorResponse.error || `Upload failed with status ${xhr.status}`));
            } catch {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Network error during upload'));
        });

        xhr.addEventListener('timeout', () => {
          reject(new Error('Upload timeout'));
        });

        // Set timeout to 2 minutes for images
        xhr.timeout = 120000;

        xhr.open('POST', `${apiClient.baseURL}/api/uploads/image`);
        
        // Add authorization header after opening the request
        const token = localStorage.getItem('access_token');
        if (token) {
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }

        xhr.send(formData);
      });
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  },

  // Get Signed URL for uploaded file
  async getFileUrl(fileKey) {
    try {
      const response = await apiClient.get(`/api/uploads/url/${fileKey}`);
      return response;
    } catch (error) {
      console.error('Get file URL error:', error);
      throw error;
    }
  },

  // Create Video Record
  async createVideoRecord(videoData) {
    try {
      console.log('Creating video record with data:', videoData);
      
      const response = await apiClient.post('/api/videos', {
        course_id: videoData.course_id,
        section_id: videoData.section_id,
        title: videoData.title,
        description: videoData.description,
        videoUrl: videoData.videoUrl,
        duration: videoData.duration,
        position: videoData.position,
        preview: videoData.preview || false
      });

      console.log('Video record created successfully:', response);
      return response;
    } catch (error) {
      console.error('Create video record error:', error);
      throw error;
    }
  },

  // Create Document Record
  async createDocumentRecord(documentData) {
    try {
      console.log('Creating document record with data:', documentData);
      
      const response = await apiClient.post('/api/document', {
        course_id: documentData.course_id,
        section_id: documentData.section_id,
        title: documentData.title,
        description: documentData.description,
        document_url: documentData.document_url,
        file_type: documentData.file_type,
        file_size: documentData.file_size
      });

      console.log('Document record created successfully:', response);
      return response;
    } catch (error) {
      console.error('Create document record error:', error);
      throw error;
    }
  },

  // Document Upload to Section (Single API Call)
  async uploadDocumentToSection(documentFile, sectionId, onProgress = null) {
    try {
      console.log('📄 Uploading document to section via single API call');
      
      const formData = new FormData();
      formData.append('file', documentFile);
      formData.append('sectionId', sectionId);

      // Create XMLHttpRequest for progress tracking
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // Track upload progress
        if (onProgress) {
          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              const percentComplete = (event.loaded / event.total) * 100;
              onProgress(Math.round(percentComplete));
            }
          });
        }

        xhr.addEventListener('load', () => {
          console.log('Document upload response status:', xhr.status);
          console.log('Document upload response text:', xhr.responseText);
          
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              console.log('📄 Document uploaded and section updated successfully:', response);
              resolve(response);
            } catch (error) {
              reject(new Error('Invalid response format'));
            }
          } else {
            try {
              const errorResponse = JSON.parse(xhr.responseText);
              console.error('📄 Document upload error response:', errorResponse);
              reject(new Error(errorResponse.error || errorResponse.message || `Document upload failed with status ${xhr.status}`));
            } catch (parseError) {
              console.error('📄 Document upload failed - Response not JSON:', xhr.responseText);
              reject(new Error(`Document upload failed with status ${xhr.status}: ${xhr.responseText || 'No response text'}`));
            }
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Network error during document upload'));
        });

        xhr.addEventListener('timeout', () => {
          reject(new Error('Document upload timeout'));
        });

        // Set timeout to 5 minutes for documents
        xhr.timeout = 300000;

        xhr.open('POST', `${apiClient.baseURL}/api/uploads/document/section`);
        
        // Add authorization header
        const token = localStorage.getItem('access_token');
        if (token) {
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }

        // Log detailed request information BEFORE sending
        console.log('📤 === SINGLE DOCUMENT UPLOAD REQUEST DETAILS ===');
        console.log('🌐 URL:', `${apiClient.baseURL}/api/uploads/document/section`);
        console.log('🔑 Auth Token:', token ? `${token.substring(0, 20)}...` : 'NOT_FOUND');
        console.log('🎯 Section ID:', sectionId, 'Type:', typeof sectionId);
        console.log('📁 File Details:', {
          name: documentFile.name,
          size: documentFile.size,
          type: documentFile.type,
          lastModified: new Date(documentFile.lastModified).toISOString()
        });
        console.log('📦 FormData Keys:', Array.from(formData.keys()));
        console.log('📦 FormData Values:', Array.from(formData.entries()).map(([key, value]) => [key, value instanceof File ? `File: ${value.name}` : value]));
        console.log('🔧 XHR Config:', {
          method: 'POST',
          timeout: xhr.timeout,
          responseType: xhr.responseType
        });

        xhr.send(formData);
        console.log('📤 Single document upload request sent to /api/uploads/document/section');
      });
    } catch (error) {
      console.error('Document upload error:', error);
      throw error;
    }
  },

  // Utility functions
  validateVideoFile(file) {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const allowedTypes = [
      'video/mp4',
      'video/mpeg',
      'video/quicktime',
      'video/x-msvideo',
      'video/webm'
    ];

    if (!file) {
      throw new Error('No file selected');
    }

    if (file.size > maxSize) {
      throw new Error('Video file must be less than 100MB');
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid video format. Supported formats: MP4, MPEG, MOV, AVI, WebM');
    }

    return true;
  },

  validateImageFile(file) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp'
    ];

    if (!file) {
      throw new Error('No file selected');
    }

    if (file.size > maxSize) {
      throw new Error('Image file must be less than 10MB');
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid image format. Supported formats: JPEG, JPG, PNG, GIF, WebP');
    }

    return true;
  },

  validateDocumentFile(file) {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'application/rtf'
    ];

    if (!file) {
      throw new Error('No file selected');
    }

    if (file.size > maxSize) {
      throw new Error('Document file must be less than 50MB');
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid document format. Supported formats: PDF, DOC, DOCX, PPT, PPTX, TXT, RTF');
    }

    return true;
  },

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
};
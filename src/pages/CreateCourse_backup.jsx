import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { courseService } from '../services/courses'
import { uploadService } from '../services/upload'
import Sidebar from '../components/Sidebar'

function CreateCourse() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    thumbnail: null
  })

  const categories = [
    'Mathematics', 'Science', 'English', 'History', 'Geography',
    'Computer Science', 'Art', 'Music', 'Physical Education', 'Language'
  ]

  const levels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        uploadService.validateImageFile(file)
        setFormData(prev => ({
          ...prev,
          thumbnail: file
        }))
        setError('')
      } catch (err) {
        setError(err.message)
        e.target.value = ''
      }
    }
  }

  const handleSubmit = async (e) => {
    console.log('🔥 FORM SUBMITTED - handleSubmit called!')
    e.preventDefault()
    
    // Debug authentication
    const token = localStorage.getItem('access_token')
    const userType = localStorage.getItem('user_type')
    
    console.log('=== COURSE CREATION DEBUG ===')
    console.log('User object:', user)
    console.log('Access token exists:', !!token)
    console.log('Access token length:', token?.length)
    console.log('User type:', userType)
    console.log('Token preview:', token?.substring(0, 50) + '...')
    console.log('Form data:', formData)
    console.log('🔍 Description field:', formData.description)
    console.log('🔍 Description length:', formData.description?.length)
    console.log('=============================')
    
    if (!user) {
      console.log('❌ No user found')
      setError('You must be logged in to create a course')
      return
    }
    
    if (userType !== 'tutor') {
      console.log('❌ Not a tutor:', userType)
      setError('Only tutors can create courses. Please sign in as a tutor.')
      return
    }
    
    if (!token) {
      console.log('❌ No token found')
      setError('Authentication token not found. Please login again.')
      return
    }
    
    if (!formData.title.trim()) {
      setError('Course title is required')
      return
    }
    
    if (!formData.description.trim()) {
      setError('Course description is required')
      return
    }
    
    if (!formData.category) {
      setError('Please select a category')
      return
    }
    
    if (!formData.thumbnail) {
      setError('Please select a thumbnail image')
      return
    }

    try {
      setLoading(true)
      setError('')
      setUploadProgress(0)

      let thumbnailUrl = ''

      // First upload the thumbnail
      if (formData.thumbnail) {
        console.log('Uploading thumbnail:', formData.thumbnail.name, formData.thumbnail.type, formData.thumbnail.size)
        
        const uploadResponse = await uploadService.uploadImage(
          formData.thumbnail,
          (progress) => setUploadProgress(progress)
        )
        
        console.log('Upload response:', uploadResponse)
        
        if (uploadResponse.success && uploadResponse.url) {
          thumbnailUrl = uploadResponse.url
          console.log('✅ Thumbnail URL extracted:', thumbnailUrl)
        } else {
          console.error('❌ Upload response missing URL:', uploadResponse)
          throw new Error(`Upload failed: No URL returned from upload service`)
        }
        
        // Verify we have a valid thumbnail URL before proceeding
        if (!thumbnailUrl || thumbnailUrl.trim() === '') {
          throw new Error('Thumbnail upload succeeded but no URL was returned')
        }
      }

      // Create course data
      const courseData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: 0,
        level: formData.level.charAt(0).toUpperCase() + formData.level.slice(1), // Capitalize first letter
        category: formData.category,
        thumbnail: thumbnailUrl, // Correct field name from API docs
        requirements: null,
        issue_certificate: false,
        downloadable_material: null,
        objectives: null,
        instructor: `${user.first_name} ${user.last_name}`,
        original_price: 0,
        duration_hours: 0,
        tags: []
      }
      
      console.log('📤 Course data being sent to API:', courseData)
      console.log('📸 Thumbnail URL in course data:', courseData.thumbnail)

      // Submit course creation
      const response = await courseService.createCourse(courseData)

      if (response.success || response.course) {
        navigate('/courses', {
          state: { message: 'Course created successfully! You can now add sections and videos.' }
        })
      } else {
        console.error('❌ Course creation failed:', response)
        throw new Error(response.error || response.message || 'Failed to create course')
      }

    } catch (err) {
      console.error('Course creation error:', err)
      console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        name: err.name
      })
      setError(err.message || 'Failed to create course')
    } finally {
      setLoading(false)
      setUploadProgress(0)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 lg:ml-56 p-4 lg:p-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">Create New Course</h1>
              <p className="text-gray-400">Fill in the course details to get started</p>
              
              {/* Debug button */}
              <button 
                onClick={() => {
                  console.log('=== AUTH DEBUG ===')
                  console.log('User object:', user)
                  console.log('Access token:', localStorage.getItem('access_token'))
                  console.log('User data:', localStorage.getItem('user_data'))
                  console.log('User type:', localStorage.getItem('user_type'))
                  console.log('Expires at:', localStorage.getItem('expires_at'))
                  console.log('=================')
                }}
                className="mt-2 px-3 py-1 bg-gray-600 text-white text-xs rounded"
              >
                Debug Auth
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-600/20 border border-red-600/50 rounded-lg">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Course Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter course title"
                    required
                  />
                </div>

                {/* Course Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
                    Course Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Describe what students will learn in this course"
                    required
                  />
                </div>

                {/* Category and Level */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-white mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="level" className="block text-sm font-medium text-white mb-2">
                      Level *
                    </label>
                    <select
                      id="level"
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    >
                      {levels.map(level => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Thumbnail Upload */}
                <div>
                  <label htmlFor="thumbnail" className="block text-sm font-medium text-white mb-2">
                    Course Thumbnail *
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="thumbnail"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="thumbnail"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div className="text-white">
                        <span className="font-medium">Click to upload thumbnail</span>
                        <p className="text-gray-400 text-sm mt-1">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </label>
                    {formData.thumbnail && (
                      <p className="text-green-400 text-sm mt-2">
                        Selected: {formData.thumbnail.name} ({uploadService.formatFileSize(formData.thumbnail.size)})
                      </p>
                    )}
                  </div>
                </div>

                {/* Upload Progress */}
                {loading && uploadProgress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white">Uploading thumbnail...</span>
                      <span className="text-white">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate('/courses')}
                    className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 font-medium transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={() => console.log('🎯 BUTTON CLICKED!')}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Creating Course...</span>
                      </>
                    ) : (
                      <span>Create Course</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default CreateCourse
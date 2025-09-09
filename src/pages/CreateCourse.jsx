import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { courseService } from '../services/courses'
import { uploadService } from '../services/upload'
import Sidebar from '../components/Sidebar'
import { 
  MdArrowBack,
  MdImage,
  MdUpload,
  MdCloudUpload
} from 'react-icons/md'

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
    level: 'ss1',
    price: '',
    thumbnail: null
  })

  const categories = [
    'Mathematics', 'Science', 'English', 'History', 'Geography',
    'Computer Science', 'Art', 'Music', 'Physical Education', 'Language'
  ]

  const levels = [
    { value: 'ss1', label: 'SS1' },
    { value: 'ss2', label: 'SS2' },
    { value: 'ss3', label: 'SS3' },
    { value: 'predegree', label: 'Pre-degree' },
    { value: 'jamb-prep', label: 'JAMB Prep' }
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
    e.preventDefault()
    
    // Validate authentication
    const token = localStorage.getItem('access_token')
    const userType = localStorage.getItem('user_type')
    
    if (!user) {
      setError('You must be logged in to create a course')
      return
    }
    
    if (userType !== 'tutor') {
      setError('Only tutors can create courses. Please sign in as a tutor.')
      return
    }
    
    if (!token) {
      setError('Authentication token not found. Please login again.')
      return
    }
    
    // Validate form
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

      // Upload thumbnail
      if (formData.thumbnail) {
        const uploadResponse = await uploadService.uploadImage(
          formData.thumbnail,
          (progress) => setUploadProgress(progress)
        )
        
        if (uploadResponse.success && uploadResponse.url) {
          thumbnailUrl = uploadResponse.url
        } else {
          throw new Error('Upload failed: No URL returned from upload service')
        }
        
        if (!thumbnailUrl || thumbnailUrl.trim() === '') {
          throw new Error('Thumbnail upload succeeded but no URL was returned')
        }
      }

      // Create course data
      const coursePrice = formData.price ? parseFloat(formData.price) : 0
      
      const courseData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: coursePrice,
        level: formData.level.charAt(0).toUpperCase() + formData.level.slice(1),
        category: formData.category,
        thumbnail: thumbnailUrl,
        requirements: "Basic computer knowledge",
        issue_certificate: false,
        downloadable_material: "Course materials and resources will be provided",
        objectives: `Learn ${formData.title.trim()} with comprehensive coverage of all topics`,
        instructor: `${user.first_name} ${user.last_name}`,
        original_price: coursePrice,
        duration_hours: 10,
        tags: [
          formData.category.toLowerCase().replace(/\s+/g, '-'),
          formData.level.toLowerCase(),
          "education"
        ]
      }

      console.log('🎓 Course data being sent to API:', JSON.stringify(courseData, null, 2))
      console.log('🎓 User data:', JSON.stringify(user, null, 2))
      console.log('🎓 Form data:', JSON.stringify(formData, null, 2))

      // Submit course creation
      const response = await courseService.createCourse(courseData)

      if (response.success || response.course) {
        navigate('/courses', {
          state: { message: 'Course created successfully! You can now add sections and videos.' }
        })
      } else {
        throw new Error(response.error || response.message || 'Failed to create course')
      }

    } catch (err) {
      console.error('Course creation error:', err)
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

        <main className="flex-1 lg:ml-56 pl-8 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold text-white mb-1">Create New Course</h1>
              <p className="text-gray-400 text-sm">Fill in the course details to get started</p>
            </div>
            <button
              onClick={() => navigate('/courses')}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded text-sm transition-colors"
            >
              <MdArrowBack className="w-4 h-4" />
              <span>Back to Courses</span>
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-600/50 rounded">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-600/30 transition-colors">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 bg-blue-600/10 rounded-lg flex items-center justify-center border border-blue-600/20">
                    <MdImage className="w-4 h-4 text-blue-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">Course Information</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                {/* Course Title */}
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium text-white">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-gray-700 transition-all"
                    placeholder="e.g., Advanced Mathematics for WAEC"
                    required
                  />
                </div>

                {/* Course Description */}
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-white">
                    Course Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-gray-700 transition-all resize-none"
                    placeholder="Describe what students will learn, course objectives, and key topics covered..."
                    required
                  />
                </div>

                {/* Category and Level */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-medium text-white">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:bg-gray-700 transition-all"
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

                  <div className="space-y-2">
                    <label htmlFor="level" className="block text-sm font-medium text-white">
                      Level *
                    </label>
                    <select
                      id="level"
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:bg-gray-700 transition-all"
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

                {/* Course Price */}
                <div className="space-y-2">
                  <label htmlFor="price" className="block text-sm font-medium text-white">
                    Course Price (₦)
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-gray-700 transition-all"
                    placeholder="e.g., 15000 or 0 for free"
                  />
                  <p className="text-xs text-gray-400">
                    Enter the course price in Nigerian Naira (₦). Leave empty or enter 0 for free courses.
                  </p>
                </div>

                {/* Thumbnail Upload */}
                <div className="space-y-2">
                  <label htmlFor="thumbnail" className="block text-sm font-medium text-white">
                    Course Thumbnail *
                  </label>
                  <div className="border-2 border-dashed border-blue-600/30 rounded-lg p-8 text-center hover:border-blue-600/50 hover:bg-blue-600/5 transition-all">
                    <input
                      type="file"
                      id="thumbnail"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="thumbnail"
                      className="cursor-pointer flex flex-col items-center space-y-4"
                    >
                      <div className="w-20 h-20 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-600/20">
                        <MdCloudUpload className="w-10 h-10 text-blue-400" />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-medium text-lg">Click to upload thumbnail</p>
                        <p className="text-blue-400 text-sm font-medium mt-1">PNG, JPG, GIF up to 10MB</p>
                        <p className="text-gray-400 text-xs mt-2">Recommended: 1280x720 pixels</p>
                      </div>
                    </label>
                    {formData.thumbnail && (
                      <div className="mt-6 p-4 bg-emerald-600/10 border border-emerald-600/20 rounded-lg flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center">
                          <MdImage className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-white font-medium">{formData.thumbnail.name}</p>
                          <p className="text-emerald-400 text-sm">{uploadService.formatFileSize(formData.thumbnail.size)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Progress */}
                {loading && uploadProgress > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MdUpload className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-medium">Uploading thumbnail...</span>
                      </div>
                      <span className="text-blue-400 font-semibold">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
                  <button
                    type="button"
                    onClick={() => navigate('/courses')}
                    className="px-6 py-3 text-gray-400 hover:text-white font-medium transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-600/25 flex items-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
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

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Tips Card */}
              <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-lg p-6 border border-blue-600/20">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <MdUpload className="w-4 h-4 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Quick Tips</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">Use a clear, descriptive title that includes the subject and exam type (e.g., "Physics - JAMB")</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">Write a detailed description covering learning objectives and course outcomes</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">Choose an eye-catching thumbnail with good resolution (1280x720 recommended)</p>
                  </div>
                </div>
              </div>

              {/* Course Structure Preview */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-emerald-600/10 rounded-lg flex items-center justify-center border border-emerald-600/20">
                    <MdImage className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Next Steps</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <span className="text-gray-300 text-sm">Create your course</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
                    <div className="w-6 h-6 bg-gray-600 text-gray-400 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-gray-400 text-sm">Add course sections</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
                    <div className="w-6 h-6 bg-gray-600 text-gray-400 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-gray-400 text-sm">Upload video content</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
                    <div className="w-6 h-6 bg-gray-600 text-gray-400 rounded-full flex items-center justify-center text-xs font-bold">4</div>
                    <span className="text-gray-400 text-sm">Publish course</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default CreateCourse
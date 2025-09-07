import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { courseService } from '../services/courses'
import { uploadService } from '../services/upload'
import Sidebar from '../components/Sidebar'

function EditCourse() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [error, setError] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    price: 0,
    thumbnail: null,
    thumbnailUrl: ''
  })

  // Section management state
  const [sections, setSections] = useState([])
  const [sectionsLoading, setSectionsLoading] = useState(false)
  const [showAddSection, setShowAddSection] = useState(false)
  const [newSection, setNewSection] = useState({
    title: '',
    resources: ''
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

  // Load course data and sections
  useEffect(() => {
    const loadCourse = async () => {
      try {
        setPageLoading(true)
        setError('')
        
        console.log('Loading course with ID:', courseId)
        const response = await courseService.getCourseById(courseId)
        console.log('Course API response:', response)
        console.log('Response has ID:', !!response.id)
        console.log('Response keys:', Object.keys(response))
        
        if (response && (response.id || response.title)) {
          // The response IS the course object directly
          const course = response
          setFormData({
            title: course.title || '',
            description: course.description || '',
            category: course.category || '',
            level: course.level ? course.level.toLowerCase() : 'beginner',
            price: course.price || 0,
            thumbnail: null,
            thumbnailUrl: course.thumbnail || course.thumbnail_url || ''
          })
          
          console.log('✅ Course data loaded successfully:', course.title)
          
          // Load sections
          await loadSections()
        } else {
          setError('Course not found')
        }
      } catch (err) {
        console.error('Load course error:', err)
        setError(`Failed to load course data: ${err.message}`)
      } finally {
        setPageLoading(false)
      }
    }

    if (courseId) {
      loadCourse()
    }
  }, [courseId])

  // Load sections
  const loadSections = async () => {
    try {
      setSectionsLoading(true)
      const response = await courseService.getCourseSections(courseId)
      
      if (response.sections) {
        const sortedSections = response.sections.sort((a, b) => a.position - b.position)
        setSections(sortedSections)
        
        // Load videos for each section
        for (const section of sortedSections) {
          await loadSectionVideos(section.id)
        }
      }
    } catch (err) {
      console.error('Load sections error:', err)
    } finally {
      setSectionsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
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

  // Video management state
  const [sectionVideos, setSectionVideos] = useState({}) // Store videos by section ID
  const [videosLoading, setVideosLoading] = useState(false)
  const [showAddVideo, setShowAddVideo] = useState(false)
  const [selectedSectionId, setSelectedSectionId] = useState('')
  const [expandedVideos, setExpandedVideos] = useState({}) // Track expanded video previews
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    videoFile: null
  })

  // Load videos for a section
  const loadSectionVideos = async (sectionId) => {
    try {
      setVideosLoading(true)
      console.log('Loading videos for section:', sectionId)
      
      const response = await courseService.getSectionVideos(sectionId)
      console.log('Section videos response:', response)
      
      if (response.videos) {
        const sortedVideos = response.videos.sort((a, b) => a.position - b.position)
        setSectionVideos(prev => ({
          ...prev,
          [sectionId]: sortedVideos
        }))
        console.log(`✅ Loaded ${sortedVideos.length} videos for section ${sectionId}`)
      } else if (response.length >= 0) {
        // Handle case where response is an array directly
        const sortedVideos = response.sort((a, b) => a.position - b.position)
        setSectionVideos(prev => ({
          ...prev,
          [sectionId]: sortedVideos
        }))
        console.log(`✅ Loaded ${sortedVideos.length} videos for section ${sectionId}`)
      } else {
        setSectionVideos(prev => ({
          ...prev,
          [sectionId]: []
        }))
      }
    } catch (err) {
      console.error('Load videos error:', err)
      setSectionVideos(prev => ({
        ...prev,
        [sectionId]: []
      }))
    } finally {
      setVideosLoading(false)
    }
  }

  // Load videos for all sections
  const loadAllSectionVideos = async () => {
    for (const section of sections) {
      await loadSectionVideos(section.id)
    }
  }

  // Section management functions
  const handleNewSectionChange = (e) => {
    const { name, value } = e.target
    setNewSection(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddSection = async (e) => {
    e.preventDefault()
    
    if (!newSection.title.trim()) {
      setError('Section title is required')
      return
    }

    try {
      setLoading(true)
      setError('')

      const sectionData = {
        course_id: courseId,
        title: newSection.title.trim(),
        position: sections.length + 1,
        resources: newSection.resources.trim() || null
      }

      console.log('Creating section:', sectionData)
      const response = await courseService.createSection(sectionData)

      if (response.success || response.section) {
        // Reload sections
        await loadSections()
        
        // Reset form
        setNewSection({ title: '', resources: '' })
        setShowAddSection(false)
        
        console.log('✅ Section created successfully')
      } else {
        throw new Error(response.error || 'Failed to create section')
      }
    } catch (err) {
      console.error('Create section error:', err)
      setError(err.message || 'Failed to create section')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSection = async (sectionId) => {
    if (!confirm('Are you sure you want to delete this section?')) {
      return
    }

    try {
      setLoading(true)
      setError('')

      const response = await courseService.deleteSection(sectionId)
      
      if (response.success) {
        await loadSections()
        console.log('✅ Section deleted successfully')
      } else {
        throw new Error(response.error || 'Failed to delete section')
      }
    } catch (err) {
      console.error('Delete section error:', err)
      setError(err.message || 'Failed to delete section')
    } finally {
      setLoading(false)
    }
  }

  // Video management functions
  const handleNewVideoChange = (e) => {
    const { name, value } = e.target
    setNewVideo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        uploadService.validateVideoFile(file)
        setNewVideo(prev => ({
          ...prev,
          videoFile: file
        }))
        setError('')
      } catch (err) {
        setError(err.message)
        e.target.value = ''
      }
    }
  }

  const handleAddVideo = async (e) => {
    e.preventDefault()
    
    if (!selectedSectionId) {
      setError('Please select a section')
      return
    }
    
    if (!newVideo.title.trim()) {
      setError('Video title is required')
      return
    }
    
    if (!newVideo.videoFile) {
      setError('Please select a video file')
      return
    }

    try {
      setLoading(true)
      setError('')
      setUploadProgress(0)

      // First upload the video
      console.log('Uploading video:', newVideo.videoFile.name)
      
      const uploadResponse = await uploadService.uploadVideo(
        newVideo.videoFile,
        (progress) => setUploadProgress(progress)
      )
      
      console.log('Video upload response:', uploadResponse)
      
      if (!uploadResponse.success || !uploadResponse.url) {
        throw new Error('Failed to upload video file')
      }

      // Create video record
      const videoData = {
        course_id: courseId,
        section_id: selectedSectionId,
        title: newVideo.title.trim(),
        description: newVideo.description.trim() || null,
        videoUrl: uploadResponse.url,
        duration: "0:00", // Default duration, can be updated later
        position: (sectionVideos[selectedSectionId]?.length || 0) + 1,
        preview: false
      }

      console.log('Creating video with data:', videoData)
      const response = await courseService.createVideo(videoData)

      if (response.success || response.video) {
        // Reload videos for the section
        await loadSectionVideos(selectedSectionId)
        
        // Reset form
        setNewVideo({ title: '', description: '', videoFile: null })
        setShowAddVideo(false)
        setSelectedSectionId('')
        
        console.log('✅ Video created successfully')
      } else {
        throw new Error(response.error || 'Failed to create video')
      }
    } catch (err) {
      console.error('Create video error:', err)
      setError(err.message || 'Failed to create video')
    } finally {
      setLoading(false)
      setUploadProgress(0)
    }
  }

  const handleDeleteVideo = async (videoId) => {
    if (!confirm('Are you sure you want to delete this video?')) {
      return
    }

    try {
      setLoading(true)
      setError('')

      const response = await courseService.deleteVideo(videoId)
      
      if (response.success) {
        // Reload all section videos
        await loadAllSectionVideos()
        console.log('✅ Video deleted successfully')
      } else {
        throw new Error(response.error || 'Failed to delete video')
      }
    } catch (err) {
      console.error('Delete video error:', err)
      setError(err.message || 'Failed to delete video')
    } finally {
      setLoading(false)
    }
  }

  const toggleVideoPreview = (videoId) => {
    setExpandedVideos(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }))
  }

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 lg:ml-56 p-4 lg:p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white">Loading course...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 lg:ml-56 p-4 lg:p-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">Edit Course</h1>
              <p className="text-gray-400">Update your course details</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-600/20 border border-red-600/50 rounded-lg">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {/* Course Overview (Read-only) */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Course Overview</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Course Thumbnail */}
                <div>
                  {formData.thumbnailUrl && (
                    <img 
                      src={formData.thumbnailUrl} 
                      alt="Course thumbnail"
                      className="w-full h-40 object-cover rounded-lg border border-gray-600"
                    />
                  )}
                </div>
                
                {/* Course Details */}
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{formData.title}</h3>
                  </div>
                  
                  <div>
                    <p className="text-gray-300">{formData.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span className="text-gray-300 font-medium">{formData.category}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-gray-300 font-medium capitalize">{formData.level}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span className="text-gray-300 font-medium">₦{formData.price?.toLocaleString() || '0'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content Management */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">

                {/* Course Sections */}
                <div className="border-t border-gray-600 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">Course Sections</h3>
                    <button
                      type="button"
                      onClick={() => setShowAddSection(!showAddSection)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add Section</span>
                    </button>
                  </div>

                  {/* Add Section Form */}
                  {showAddSection && (
                    <div className="mb-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
                      <h4 className="text-white font-medium mb-4">Add New Section</h4>
                      <form onSubmit={handleAddSection} className="space-y-4">
                        <div>
                          <label htmlFor="sectionTitle" className="block text-sm font-medium text-white mb-2">
                            Section Title *
                          </label>
                          <input
                            type="text"
                            id="sectionTitle"
                            name="title"
                            value={newSection.title}
                            onChange={handleNewSectionChange}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter section title"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="sectionResources" className="block text-sm font-medium text-white mb-2">
                            Resources (Optional)
                          </label>
                          <textarea
                            id="sectionResources"
                            name="resources"
                            value={newSection.resources}
                            onChange={handleNewSectionChange}
                            rows={3}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="Additional reading materials, exercises, etc."
                          />
                        </div>
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => {
                              setShowAddSection(false)
                              setNewSection({ title: '', resources: '' })
                            }}
                            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                            disabled={loading}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg font-medium transition-colors"
                          >
                            {loading ? 'Adding...' : 'Add Section'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Existing Sections */}
                  {sectionsLoading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                      <p className="text-gray-400">Loading sections...</p>
                    </div>
                  ) : sections.length > 0 ? (
                    <div className="space-y-4">
                      {sections.map((section, index) => (
                        <div key={section.id} className="bg-gray-700 rounded-lg border border-gray-600">
                          {/* Section Header */}
                          <div className="p-4 border-b border-gray-600">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-medium rounded-full">
                                    {index + 1}
                                  </span>
                                  <h4 className="text-white font-medium">{section.title}</h4>
                                </div>
                                {section.resources && (
                                  <p className="text-gray-300 text-sm ml-9">{section.resources}</p>
                                )}
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => {
                                    setSelectedSectionId(section.id)
                                    setShowAddVideo(true)
                                    loadSectionVideos(section.id)
                                  }}
                                  className="text-green-400 hover:text-green-300 p-1 transition-colors"
                                  disabled={loading}
                                  title="Add video to section"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDeleteSection(section.id)}
                                  className="text-red-400 hover:text-red-300 p-1 transition-colors"
                                  disabled={loading}
                                  title="Delete section"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Section Videos */}
                          <div className="p-4">
                            <h5 className="text-white text-sm font-medium mb-3">Videos in this section</h5>
                            {videosLoading ? (
                              <div className="text-center py-2">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2"></div>
                                <p className="text-gray-400 text-xs">Loading videos...</p>
                              </div>
                            ) : sectionVideos[section.id]?.length > 0 ? (
                              <div className="space-y-2">
                                {sectionVideos[section.id].map((video, videoIndex) => (
                                  <div key={video.id} className="bg-gray-600 rounded-lg overflow-hidden">
                                    {/* Video Header */}
                                    <div className="flex items-center space-x-3 p-3">
                                      <div className="flex items-center justify-center w-5 h-5 bg-blue-500 text-white text-xs font-medium rounded-full">
                                        {videoIndex + 1}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h6 className="text-white text-sm font-medium truncate">{video.title}</h6>
                                        {video.description && (
                                          <p className="text-gray-300 text-xs truncate">{video.description}</p>
                                        )}
                                        <div className="flex items-center space-x-3 mt-1">
                                          <span className="text-gray-400 text-xs">Duration: {video.duration || '0:00'}</span>
                                          {video.preview && (
                                            <span className="text-green-400 text-xs">Preview</span>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        <button
                                          onClick={() => toggleVideoPreview(video.id)}
                                          className="text-purple-400 hover:text-purple-300 p-1 transition-colors"
                                          title="Preview video"
                                        >
                                          <svg className={`w-4 h-4 transform transition-transform ${expandedVideos[video.id] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                          </svg>
                                        </button>
                                        <button
                                          onClick={() => window.open(video.videoUrl, '_blank')}
                                          className="text-blue-400 hover:text-blue-300 p-1 transition-colors"
                                          title="Open video in new tab"
                                        >
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                          </svg>
                                        </button>
                                        <button
                                          onClick={() => handleDeleteVideo(video.id)}
                                          className="text-red-400 hover:text-red-300 p-1 transition-colors"
                                          title="Delete video"
                                        >
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>

                                    {/* Video Preview Dropdown */}
                                    {expandedVideos[video.id] && (
                                      <div className="border-t border-gray-500 p-3 bg-gray-700">
                                        <div className="space-y-3">
                                          {/* Video Player */}
                                          <div className="aspect-video bg-black rounded-lg overflow-hidden">
                                            <video
                                              controls
                                              preload="metadata"
                                              className="w-full h-full object-contain"
                                              poster="/video-placeholder.jpg"
                                            >
                                              <source src={video.videoUrl} type="video/mp4" />
                                              <source src={video.videoUrl} type="video/webm" />
                                              <source src={video.videoUrl} type="video/ogg" />
                                              Your browser does not support the video tag.
                                            </video>
                                          </div>

                                          {/* Video Details */}
                                          <div className="grid grid-cols-2 gap-4 text-xs">
                                            <div>
                                              <span className="text-gray-400">Position:</span>
                                              <span className="text-white ml-2">{video.position || videoIndex + 1}</span>
                                            </div>
                                            <div>
                                              <span className="text-gray-400">Duration:</span>
                                              <span className="text-white ml-2">{video.duration || 'Unknown'}</span>
                                            </div>
                                            <div>
                                              <span className="text-gray-400">Preview:</span>
                                              <span className={`ml-2 ${video.preview ? 'text-green-400' : 'text-gray-400'}`}>
                                                {video.preview ? 'Yes' : 'No'}
                                              </span>
                                            </div>
                                            <div>
                                              <span className="text-gray-400">Course ID:</span>
                                              <span className="text-white ml-2 font-mono text-xs">{video.course_id || 'N/A'}</span>
                                            </div>
                                          </div>

                                          {/* Full Description */}
                                          {video.description && (
                                            <div>
                                              <span className="text-gray-400 text-xs">Description:</span>
                                              <p className="text-white text-sm mt-1">{video.description}</p>
                                            </div>
                                          )}

                                          {/* Video URL */}
                                          <div>
                                            <span className="text-gray-400 text-xs">Video URL:</span>
                                            <p className="text-blue-400 text-xs mt-1 break-all font-mono">{video.videoUrl}</p>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-gray-400 text-sm">
                                No videos yet. Click the video icon above to add videos to this section.
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <p>No sections added yet</p>
                      <p className="text-sm">Click "Add Section" to create your first section</p>
                    </div>
                  )}
                </div>

                {/* Add Video Form */}
                {showAddVideo && (
                  <div className="border-t border-gray-600 pt-6">
                    <div className="mb-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
                      <h4 className="text-white font-medium mb-4">Add Video to Section</h4>
                      <form onSubmit={handleAddVideo} className="space-y-4">
                        <div>
                          <label htmlFor="videoTitle" className="block text-sm font-medium text-white mb-2">
                            Video Title *
                          </label>
                          <input
                            type="text"
                            id="videoTitle"
                            name="title"
                            value={newVideo.title}
                            onChange={handleNewVideoChange}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter video title"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="videoDescription" className="block text-sm font-medium text-white mb-2">
                            Video Description (Optional)
                          </label>
                          <textarea
                            id="videoDescription"
                            name="description"
                            value={newVideo.description}
                            onChange={handleNewVideoChange}
                            rows={3}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="Describe what this video covers"
                          />
                        </div>

                        <div>
                          <label htmlFor="videoFile" className="block text-sm font-medium text-white mb-2">
                            Video File *
                          </label>
                          <div className="border-2 border-dashed border-gray-500 rounded-lg p-6 text-center">
                            <input
                              type="file"
                              id="videoFile"
                              accept="video/*"
                              onChange={handleVideoFileChange}
                              className="hidden"
                            />
                            <label
                              htmlFor="videoFile"
                              className="cursor-pointer flex flex-col items-center space-y-2"
                            >
                              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              <div className="text-white">
                                <span className="font-medium">Click to upload video</span>
                                <p className="text-gray-400 text-sm mt-1">MP4, MPEG, MOV, AVI, WebM up to 100MB</p>
                              </div>
                            </label>
                            {newVideo.videoFile && (
                              <p className="text-green-400 text-sm mt-2">
                                Selected: {newVideo.videoFile.name} ({uploadService.formatFileSize(newVideo.videoFile.size)})
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Upload Progress */}
                        {loading && uploadProgress > 0 && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-white">Uploading video...</span>
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

                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => {
                              setShowAddVideo(false)
                              setNewVideo({ title: '', description: '', videoFile: null })
                              setSelectedSectionId('')
                            }}
                            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                            disabled={loading}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg font-medium transition-colors"
                          >
                            {loading ? 'Uploading...' : 'Add Video'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Back to Courses */}
                <div className="flex justify-end border-t border-gray-600 pt-6">
                  <button
                    type="button"
                    onClick={() => navigate('/courses')}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Back to Courses
                  </button>
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default EditCourse
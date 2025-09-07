import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { courseService } from '../services/courses'
import { uploadService } from '../services/upload'
import Sidebar from '../components/Sidebar'
import { 
  MdAdd, 
  MdEdit, 
  MdDelete, 
  MdVideoLibrary, 
  MdExpandMore, 
  MdOpenInNew, 
  MdArrowBack, 
  MdCheckCircle, 
  MdUploadFile,
  MdFolder,
  MdPlayArrow,
  MdAccessTime,
  MdLabel,
  MdTrendingUp,
  MdSchool,
  MdAttachMoney,
  MdImage,
  MdClose
} from 'react-icons/md'

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
    thumbnailUrl: '',
    isPublished: false
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
            thumbnailUrl: course.thumbnail || course.thumbnail_url || '',
            isPublished: course.is_published || false
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

  const handlePublishCourse = async () => {
    if (!confirm('Are you sure you want to publish this course? Once published, it will be visible to students.')) {
      return
    }

    try {
      setLoading(true)
      setError('')

      console.log('Publishing course:', courseId)
      
      // Update course to set is_published = true
      // Send complete course data matching API specification
      const publishData = {
        title: String(formData.title || ""),
        description: String(formData.description || ""),
        price: Number(formData.price || 0),
        level: String(formData.level ? formData.level.charAt(0).toUpperCase() + formData.level.slice(1) : "Beginner"),
        category: String(formData.category || ""),
        is_published: Boolean(true),
        featured: Boolean(false),
        thumbnail: String(formData.thumbnailUrl || ""),
        requirements: String(""),
        issue_certificate: Boolean(false),
        downloadable_material: String(""),
        objectives: String(""),
        instructor: String(`${user?.first_name || ""} ${user?.last_name || ""}`).trim(),
        original_price: Number(formData.price || 0),
        duration_hours: Number(0),
        tags: Array.isArray([]) ? [] : []
      }

      const response = await courseService.updateCourse(courseId, publishData)
      console.log('Publish course response:', response)

      if (response.success || response.course) {
        console.log('✅ Course published successfully')
        navigate('/courses', {
          state: { message: 'Course published successfully! It is now visible to students.' }
        })
      } else {
        throw new Error(response.error || 'Failed to publish course')
      }
    } catch (err) {
      console.error('Publish course error:', err)
      setError(err.message || 'Failed to publish course')
    } finally {
      setLoading(false)
    }
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

        <main className="flex-1 lg:ml-56 min-h-screen">
          <div className="max-w-full px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-3">Course Editor</h1>
              <p className="text-gray-400 text-lg">Manage sections and videos for your course</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-600/20 border border-red-600/50 rounded-lg">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {/* Course Overview (Read-only) */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 mb-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">Course Overview</h2>
                <div className="flex items-center space-x-2">
                  {formData.isPublished ? (
                    <span className="px-3 py-1 bg-green-600/20 text-green-400 text-sm font-medium rounded-full border border-green-600/30">
                      Published
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-yellow-600/20 text-yellow-400 text-sm font-medium rounded-full border border-yellow-600/30">
                      Draft
                    </span>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Course Thumbnail */}
                <div className="xl:col-span-1">
                  {formData.thumbnailUrl ? (
                    <img 
                      src={formData.thumbnailUrl} 
                      alt="Course thumbnail"
                      className="w-full h-48 xl:h-56 object-cover rounded-xl border border-gray-600 shadow-lg"
                    />
                  ) : (
                    <div className="w-full h-48 xl:h-56 bg-gray-800 rounded-xl border border-gray-600 flex items-center justify-center">
                      <MdImage className="w-16 h-16 text-gray-600" />
                    </div>
                  )}
                </div>
                
                {/* Course Details */}
                <div className="xl:col-span-3 space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white leading-tight">{formData.title}</h3>
                  </div>
                  
                  <div>
                    <p className="text-gray-300 text-lg leading-relaxed">{formData.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                      <div className="flex items-center space-x-3 mb-2">
                        <MdLabel className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-400 text-sm font-medium">Category</span>
                      </div>
                      <span className="text-white font-semibold">{formData.category}</span>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                      <div className="flex items-center space-x-3 mb-2">
                        <MdTrendingUp className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-400 text-sm font-medium">Level</span>
                      </div>
                      <span className="text-white font-semibold capitalize">{formData.level}</span>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                      <div className="flex items-center space-x-3 mb-2">
                        <MdAttachMoney className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-400 text-sm font-medium">Price</span>
                      </div>
                      <span className="text-white font-semibold">₦{formData.price?.toLocaleString() || '0'}</span>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                      <div className="flex items-center space-x-3 mb-2">
                        <MdSchool className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-400 text-sm font-medium">Sections</span>
                      </div>
                      <span className="text-white font-semibold">{sections.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content Management */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 shadow-xl">

                {/* Course Sections */}
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold text-white">Course Content</h3>
                    <button
                      type="button"
                      onClick={() => setShowAddSection(!showAddSection)}
                      className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 border border-gray-600"
                    >
                      <MdAdd className="w-4 h-4" />
                      <span>Add Section</span>
                    </button>
                  </div>

                  {/* Add Section Form */}
                  {showAddSection && (
                    <div className="mb-8 p-6 bg-gray-800/50 rounded-xl border border-gray-600/50 backdrop-blur-sm">
                      <h4 className="text-white font-semibold text-lg mb-6">Create New Section</h4>
                      <form onSubmit={handleAddSection} className="space-y-6">
                        <div>
                          <label htmlFor="sectionTitle" className="block text-sm font-semibold text-gray-200 mb-3">
                            Section Title *
                          </label>
                          <input
                            type="text"
                            id="sectionTitle"
                            name="title"
                            value={newSection.title}
                            onChange={handleNewSectionChange}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            placeholder="Enter section title"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="sectionResources" className="block text-sm font-semibold text-gray-200 mb-3">
                            Resources (Optional)
                          </label>
                          <textarea
                            id="sectionResources"
                            name="resources"
                            value={newSection.resources}
                            onChange={handleNewSectionChange}
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                            placeholder="Additional reading materials, exercises, etc."
                          />
                        </div>
                        <div className="flex justify-end space-x-4">
                          <button
                            type="button"
                            onClick={() => {
                              setShowAddSection(false)
                              setNewSection({ title: '', resources: '' })
                            }}
                            className="px-6 py-3 text-gray-400 hover:text-white transition-colors font-medium"
                            disabled={loading}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                          >
                            {loading ? 'Adding...' : 'Add Section'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Existing Sections */}
                  {sectionsLoading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                      <p className="text-gray-400 text-lg">Loading sections...</p>
                    </div>
                  ) : sections.length > 0 ? (
                    <div className="space-y-6">
                      {sections.map((section, index) => (
                        <div key={section.id} className="bg-gray-800/60 rounded-xl border border-gray-600/50 shadow-lg overflow-hidden">
                          {/* Section Header */}
                          <div className="p-6 border-b border-gray-600/50 bg-gradient-to-r from-gray-800/40 to-gray-700/40">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-4 mb-3">
                                  <span className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-bold rounded-xl shadow-md">
                                    {index + 1}
                                  </span>
                                  <h4 className="text-white font-semibold text-lg">{section.title}</h4>
                                </div>
                                {section.resources && (
                                  <p className="text-gray-300 text-sm ml-12 leading-relaxed">{section.resources}</p>
                                )}
                              </div>
                              <div className="flex space-x-3">
                                <button
                                  onClick={() => {
                                    setSelectedSectionId(section.id)
                                    setShowAddVideo(true)
                                    loadSectionVideos(section.id)
                                  }}
                                  className="text-gray-400 hover:text-white p-2 hover:bg-gray-700 rounded transition-colors"
                                  disabled={loading}
                                  title="Add video to section"
                                >
                                  <MdVideoLibrary className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteSection(section.id)}
                                  className="text-gray-400 hover:text-red-400 p-2 hover:bg-gray-700 rounded transition-colors"
                                  disabled={loading}
                                  title="Delete section"
                                >
                                  <MdDelete className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Section Videos */}
                          <div className="p-6">
                            <h5 className="text-white text-base font-semibold mb-4">Videos in this section</h5>
                            {videosLoading ? (
                              <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-3"></div>
                                <p className="text-gray-400 text-sm">Loading videos...</p>
                              </div>
                            ) : sectionVideos[section.id]?.length > 0 ? (
                              <div className="space-y-4">
                                {sectionVideos[section.id].map((video, videoIndex) => (
                                  <div key={video.id} className="bg-gray-700/60 rounded-xl border border-gray-600/40 overflow-hidden shadow-md">
                                    {/* Video Header */}
                                    <div className="flex items-center space-x-4 p-4">
                                      <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold rounded-lg shadow-sm">
                                        {videoIndex + 1}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h6 className="text-white text-sm font-semibold truncate">{video.title}</h6>
                                        {video.description && (
                                          <p className="text-gray-300 text-xs truncate mt-1">{video.description}</p>
                                        )}
                                        <div className="flex items-center space-x-4 mt-2">
                                          <span className="text-gray-400 text-xs font-medium">Duration: {video.duration || '0:00'}</span>
                                          {video.preview && (
                                            <span className="text-green-400 text-xs font-medium bg-green-400/10 px-2 py-0.5 rounded-full">Preview</span>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <button
                                          onClick={() => toggleVideoPreview(video.id)}
                                          className="text-gray-400 hover:text-white p-2 hover:bg-gray-700 rounded transition-colors"
                                          title="Preview video"
                                        >
                                          <MdExpandMore className={`w-4 h-4 transform transition-transform ${expandedVideos[video.id] ? 'rotate-180' : ''}`} />
                                        </button>
                                        <button
                                          onClick={() => window.open(video.videoUrl, '_blank')}
                                          className="text-gray-400 hover:text-white p-2 hover:bg-gray-700 rounded transition-colors"
                                          title="Open video in new tab"
                                        >
                                          <MdOpenInNew className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() => handleDeleteVideo(video.id)}
                                          className="text-gray-400 hover:text-red-400 p-2 hover:bg-gray-700 rounded transition-colors"
                                          title="Delete video"
                                        >
                                          <MdDelete className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Video Preview Dropdown */}
                                    {expandedVideos[video.id] && (
                                      <div className="border-t border-gray-600/50 p-6 bg-gray-800/50 backdrop-blur-sm">
                                        <div className="space-y-6">
                                          {/* Video Player */}
                                          <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-xl border border-gray-700/50">
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
                                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-600/40">
                                              <div className="text-xs text-gray-400 mb-1">Position</div>
                                              <div className="text-sm font-semibold text-white">{video.position || videoIndex + 1}</div>
                                            </div>
                                            <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-600/40">
                                              <div className="text-xs text-gray-400 mb-1">Duration</div>
                                              <div className="text-sm font-semibold text-white">{video.duration || 'Unknown'}</div>
                                            </div>
                                            <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-600/40">
                                              <div className="text-xs text-gray-400 mb-1">Preview</div>
                                              <div className={`text-sm font-semibold ${video.preview ? 'text-green-400' : 'text-gray-400'}`}>
                                                {video.preview ? 'Yes' : 'No'}
                                              </div>
                                            </div>
                                            <div className="bg-gray-800/60 p-3 rounded-lg border border-gray-600/40">
                                              <div className="text-xs text-gray-400 mb-1">Course ID</div>
                                              <div className="text-sm font-semibold text-white font-mono truncate">{video.course_id || 'N/A'}</div>
                                            </div>
                                          </div>

                                          {/* Full Description */}
                                          {video.description && (
                                            <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-600/40">
                                              <div className="text-xs text-gray-400 mb-2">Description</div>
                                              <p className="text-white text-sm leading-relaxed">{video.description}</p>
                                            </div>
                                          )}

                                          {/* Video URL */}
                                          <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-600/40">
                                            <div className="text-xs text-gray-400 mb-2">Video URL</div>
                                            <p className="text-blue-400 text-xs break-all font-mono bg-gray-900/50 p-2 rounded border">{video.videoUrl}</p>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-gray-400 bg-gray-800/30 rounded-lg border border-gray-600/30">
                                <MdVideoLibrary className="w-12 h-12 mx-auto mb-3 text-gray-500" />
                                <p className="text-sm font-medium">No videos yet</p>
                                <p className="text-xs mt-1">Click the video icon above to add videos to this section</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 text-gray-400">
                      <div className="bg-gray-800/30 rounded-2xl p-12 border border-gray-600/30">
                        <MdFolder className="w-16 h-16 mx-auto mb-6 text-gray-500" />
                        <h3 className="text-lg font-semibold text-white mb-2">No sections added yet</h3>
                        <p className="text-sm text-gray-400 mb-6">Start building your course by adding sections and organizing your content</p>
                        <button
                          onClick={() => setShowAddSection(true)}
                          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors inline-flex items-center space-x-2 border border-gray-600"
                        >
                          <MdAdd className="w-4 h-4" />
                          <span>Create First Section</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Add Video Form */}
                {showAddVideo && (
                  <div className="border-t border-gray-600/50 pt-8 mt-8">
                    <div className="mb-8 p-6 bg-gray-800/50 rounded-xl border border-gray-600/50 backdrop-blur-sm">
                      <h4 className="text-white font-semibold text-lg mb-6">Add Video to Section</h4>
                      <form onSubmit={handleAddVideo} className="space-y-6">
                        <div>
                          <label htmlFor="videoTitle" className="block text-sm font-semibold text-gray-200 mb-3">
                            Video Title *
                          </label>
                          <input
                            type="text"
                            id="videoTitle"
                            name="title"
                            value={newVideo.title}
                            onChange={handleNewVideoChange}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            placeholder="Enter video title"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="videoDescription" className="block text-sm font-semibold text-gray-200 mb-3">
                            Video Description (Optional)
                          </label>
                          <textarea
                            id="videoDescription"
                            name="description"
                            value={newVideo.description}
                            onChange={handleNewVideoChange}
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                            placeholder="Describe what this video covers"
                          />
                        </div>

                        <div>
                          <label htmlFor="videoFile" className="block text-sm font-semibold text-gray-200 mb-3">
                            Video File *
                          </label>
                          
                          {!newVideo.videoFile ? (
                            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors bg-gray-800/50">
                              <input
                                type="file"
                                id="videoFile"
                                accept="video/*"
                                onChange={handleVideoFileChange}
                                className="hidden"
                              />
                              <label
                                htmlFor="videoFile"
                                className="cursor-pointer flex flex-col items-center space-y-3"
                              >
                                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                                  <MdUploadFile className="w-6 h-6 text-gray-400" />
                                </div>
                                <div className="text-center">
                                  <div className="text-white font-medium mb-1">
                                    Select video file to upload
                                  </div>
                                  <div className="text-gray-400 text-sm">
                                    MP4, MOV, AVI up to 100MB
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500">
                                  or drag and drop
                                </div>
                              </label>
                            </div>
                          ) : (
                            <div className="border border-gray-600 rounded-lg p-4 bg-gray-800/50">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3">
                                  <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
                                    <MdVideoLibrary className="w-5 h-5 text-gray-400" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-white font-medium text-sm truncate">
                                      {newVideo.videoFile.name}
                                    </div>
                                    <div className="text-gray-400 text-xs">
                                      {uploadService.formatFileSize(newVideo.videoFile.size)}
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setNewVideo(prev => ({ ...prev, videoFile: null }))}
                                  className="text-gray-400 hover:text-white p-1"
                                >
                                  <MdClose className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Upload Progress */}
                        {loading && uploadProgress > 0 && (
                          <div className="space-y-4 p-4 bg-blue-600/10 border border-blue-600/20 rounded-xl">
                            <div className="flex justify-between text-sm">
                              <span className="text-white font-semibold">Uploading video...</span>
                              <span className="text-blue-400 font-bold">{uploadProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-3 shadow-inner">
                              <div 
                                className="bg-gradient-to-r from-blue-600 to-blue-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-end space-x-4">
                          <button
                            type="button"
                            onClick={() => {
                              setShowAddVideo(false)
                              setNewVideo({ title: '', description: '', videoFile: null })
                              setSelectedSectionId('')
                            }}
                            className="px-6 py-3 text-gray-400 hover:text-white transition-colors font-medium"
                            disabled={loading}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                          >
                            {loading ? 'Uploading...' : 'Add Video'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between items-center border-t border-gray-600/50 pt-8 mt-8">
                  <button
                    type="button"
                    onClick={() => navigate('/courses')}
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2 border border-gray-600"
                  >
                    <MdArrowBack className="w-4 h-4" />
                    <span>Back to Courses</span>
                  </button>
                  
                  {formData.isPublished ? (
                    <div className="flex items-center space-x-2 px-6 py-3 bg-green-600/20 border border-green-600/30 text-green-400 rounded-lg">
                      <MdCheckCircle className="w-4 h-4" />
                      <span className="font-medium">Course Published</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handlePublishCourse}
                      disabled={loading}
                      className="px-6 py-3 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors flex items-center space-x-2 border border-gray-600"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Publishing...</span>
                        </>
                      ) : (
                        <>
                          <MdCheckCircle className="w-4 h-4" />
                          <span>Publish Now</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default EditCourse
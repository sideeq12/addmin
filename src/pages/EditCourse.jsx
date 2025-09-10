import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { courseService } from '../services/courses'
import { uploadService } from '../services/upload'
import Sidebar from '../components/Sidebar'
import { 
  MdAdd, 
  MdDelete, 
  MdVideoLibrary,
  MdImage,
  MdArrowBack,
  MdExpandMore,
  MdExpandLess,
  MdPlayArrow,
  MdDescription,
  MdSettings,
  MdPublish,
  MdVisibility,
  MdSchedule,
  MdPeople,
  MdTrendingUp,
  MdFolder,
  MdCloudUpload,
  MdEdit,
  MdSave,
  MdMoreVert,
  MdClose,
  MdFullscreen
} from 'react-icons/md'

function EditCourse() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    price: 0,
    thumbnailUrl: '',
    isPublished: false
  })

  const [sections, setSections] = useState([])
  const [showAddSection, setShowAddSection] = useState(false)
  const [newSection, setNewSection] = useState({
    title: ''
  })
  const [expandedSections, setExpandedSections] = useState({})
  const [showAddVideo, setShowAddVideo] = useState({})
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    videoFile: null,
    preview: false
  })
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(null)
  const [showAddDocument, setShowAddDocument] = useState({})
  const [uploadingDocument, setUploadingDocument] = useState(false)
  const [documentUploadProgress, setDocumentUploadProgress] = useState(0)

  // Load course data
  useEffect(() => {
    const loadCourse = async () => {
      try {
        setPageLoading(true)
        setError('')
        
        const response = await courseService.getCourseById(courseId)
        
        if (response && (response.id || response.title)) {
          const course = response
          setFormData({
            title: course.title || '',
            description: course.description || '',
            category: course.category || '',
            level: course.level ? course.level.toLowerCase() : 'beginner',
            price: course.price || 0,
            thumbnailUrl: course.thumbnail || course.thumbnail_url || '',
            isPublished: course.is_published || false
          })
          
          await loadSections()
        } else {
          setError('Course not found')
        }
      } catch (err) {
        console.error('Load course error:', err)
        setError('Failed to load course')
      } finally {
        setPageLoading(false)
      }
    }

    if (courseId && user?.id) {
      loadCourse()
    }
  }, [courseId, user])

  const loadSections = async () => {
    try {
      const response = await courseService.getCourseSections(courseId)
      const sectionsData = response.sections || []
      
      // Fetch videos for each section
      const sectionsWithVideos = await Promise.all(
        sectionsData.map(async (section) => {
          try {
            const videosResponse = await courseService.getSectionVideos(section.id)
            return {
              ...section,
              videos: videosResponse.videos || []
            }
          } catch (error) {
            console.error(`Error loading videos for section ${section.id}:`, error)
            return {
              ...section,
              videos: []
            }
          }
        })
      )
      
      setSections(sectionsWithVideos)
    } catch (err) {
      console.error('Load sections error:', err)
    }
  }

  const handleAddSection = async (e) => {
    e.preventDefault()
    if (!newSection.title.trim()) return

    try {
      setLoading(true)
      setError('')

      const response = await courseService.addSection(courseId, {
        title: newSection.title,
        resources: ''
      })

      console.log('Add section response in EditCourse:', response)

      // Handle different response formats
      if (response.success || response.section || response.id) {
        await loadSections()
        setNewSection({ title: '' })
        setShowAddSection(false)
        console.log('✅ Section added successfully')
      } else {
        throw new Error(response.error || response.message || 'Failed to add section')
      }
    } catch (err) {
      console.error('Add section error:', err)
      setError(err.message || 'Failed to add section')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSection = async (sectionId, sectionTitle) => {
    if (!confirm(`Are you sure you want to delete "${sectionTitle}"? This will also delete all videos in this section. This action cannot be undone.`)) {
      return
    }

    try {
      setLoading(true)
      setError('')

      console.log('🗑️ Deleting section:', sectionId)
      
      const response = await courseService.deleteSection(sectionId)
      
      console.log('✅ Section deleted successfully:', response)
      
      // Always reload sections after deletion attempt
      await loadSections()

    } catch (err) {
      console.error('Delete section error:', err)
      setError(err.message || 'Failed to delete section')
    } finally {
      setLoading(false)
    }
  }

  const handleNewSectionChange = (e) => {
    setNewSection({ title: e.target.value })
  }

  const toggleSectionExpanded = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const toggleAddVideo = (sectionId) => {
    setShowAddVideo(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const handleNewVideoChange = (e) => {
    const { name, value, type, checked, files } = e.target
    
    if (type === 'checkbox') {
      setNewVideo(prev => ({
        ...prev,
        [name]: checked
      }))
    } else if (type === 'file') {
      const file = files[0]
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
        }
      }
    } else {
      setNewVideo(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleAddVideo = async (e, sectionId) => {
    e.preventDefault()
    
    if (!newVideo.title.trim()) {
      setError('Video title is required')
      return
    }
    
    if (!newVideo.videoFile) {
      setError('Please select a video file')
      return
    }

    try {
      setUploadingVideo(true)
      setUploadProgress(0)
      setError('')

      console.log('🎬 Starting video upload process...')
      console.log('Video file:', newVideo.videoFile.name, newVideo.videoFile.size)

      // Step 1: Upload video file to get URL
      const uploadResponse = await uploadService.uploadVideo(
        newVideo.videoFile,
        (progress) => setUploadProgress(progress)
      )

      console.log('📤 Video upload response:', uploadResponse)

      if (!uploadResponse.success || !uploadResponse.url) {
        throw new Error('Video upload failed - no URL returned')
      }

      // Step 2: Create video record using the URL from step 1
      const videoData = {
        course_id: courseId,
        section_id: sectionId,
        title: newVideo.title,
        description: newVideo.description,
        videoUrl: uploadResponse.url, // Use the actual URL from upload response
        duration: "10:30", // TODO: Extract actual video duration
        position: 1, // TODO: Calculate proper position based on existing videos
        preview: newVideo.preview
      }

      console.log('🎥 Creating video record with data:', videoData)
      
      const response = await uploadService.createVideoRecord(videoData)

      // Handle different response formats
      if (response.success || response.video || response.id) {
        await loadSections() // Reload sections to show new video
        setNewVideo({
          title: '',
          description: '',
          videoFile: null,
          preview: false
        })
        setShowAddVideo(prev => ({
          ...prev,
          [sectionId]: false
        }))
        console.log('✅ Video added successfully')
      } else {
        throw new Error(response.error || response.message || 'Failed to add video')
      }

    } catch (err) {
      console.error('Video upload error:', err)
      setError(err.message || 'Failed to upload video')
    } finally {
      setUploadingVideo(false)
      setUploadProgress(0)
    }
  }

  const handlePlayVideo = (video) => {
    setCurrentVideo(video)
    setShowVideoPlayer(true)
  }

  const handleCloseVideoPlayer = () => {
    setShowVideoPlayer(false)
    setCurrentVideo(null)
  }

  // Handle keyboard events for video player
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && showVideoPlayer) {
        handleCloseVideoPlayer()
      }
    }

    if (showVideoPlayer) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showVideoPlayer])

  const handlePublishCourse = async () => {
    if (!courseId) return

    try {
      setLoading(true)
      setError('')

      console.log('📢 Publishing course:', courseId)
      
      const response = await courseService.publishCourse(courseId)
      
      console.log('✅ Course published successfully:', response)
      
      // Update local state to reflect published status
      setFormData(prev => ({
        ...prev,
        isPublished: true
      }))

    } catch (err) {
      console.error('Publish course error:', err)
      setError(err.message || 'Failed to publish course')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteVideo = async (videoId, videoTitle) => {
    if (!confirm(`Are you sure you want to delete "${videoTitle}"? This action cannot be undone.`)) {
      return
    }

    try {
      setLoading(true)
      setError('')

      console.log('🗑️ Deleting video:', videoId)
      
      const response = await courseService.deleteVideo(videoId)
      
      console.log('✅ Video deleted successfully:', response)
      
      // Reload sections to reflect the deletion
      await loadSections()

    } catch (err) {
      console.error('Delete video error:', err)
      setError(err.message || 'Failed to delete video')
    } finally {
      setLoading(false)
    }
  }

  const handleDocumentUpload = async (e, sectionId) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setUploadingDocument(true)
      setDocumentUploadProgress(0)
      setError('')

      console.log('🎯 Document upload started for section:', sectionId)
      console.log('🎯 Current sections state length:', sections.length)

      // Validate document file
      uploadService.validateDocumentFile(file)

      console.log('📄 Starting document upload process...')
      console.log('Document file:', file.name, file.size)

      // Step 1: Upload document file to get URL
      const uploadResponse = await uploadService.uploadDocument(
        file,
        (progress) => setDocumentUploadProgress(progress)
      )

      console.log('📤 Document upload response:', uploadResponse)

      if (!uploadResponse.success || !uploadResponse.url) {
        throw new Error('Document upload failed - no URL returned')
      }

      // Step 2: Update section resources with the uploaded URL
      console.log('🔍 Looking for section with ID:', sectionId)
      console.log('🔍 Available sections:', sections.map(s => ({id: s.id, title: s.title})))
      
      const currentSection = sections.find(s => s.id === sectionId)
      
      if (!currentSection) {
        console.error('❌ Section not found locally!', {
          searchId: sectionId,
          availableSections: sections.map(s => s.id)
        })
        throw new Error(`Section with ID ${sectionId} not found`)
      }
      
      console.log('📋 Current section data:', currentSection)
      
      const updateData = {
        title: currentSection.title || '',
        position: currentSection.position || 1,
        resources: uploadResponse.url
      }

      console.log('📝 Updating section resources with data:', updateData)
      console.log('🌐 Making API call to update section ID:', sectionId)
      console.log('🌐 API endpoint will be: /api/sections/' + sectionId)
      
      const response = await courseService.updateSection(sectionId, updateData)
      
      console.log('✅ Section resources updated successfully:', response)
      
      // Check if update was actually successful
      if (!response || (response.success === false)) {
        throw new Error(response?.error || response?.message || 'Section update failed - no success confirmation')
      }
      
      // Reload sections to show new resource
      await loadSections()
      
      // Hide the add document form
      setShowAddDocument(prev => ({
        ...prev,
        [sectionId]: false
      }))

    } catch (err) {
      console.error('Document upload error:', err)
      setError(err.message || 'Failed to upload document')
    } finally {
      setUploadingDocument(false)
      setDocumentUploadProgress(0)
      // Reset file input
      e.target.value = ''
    }
  }

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 lg:ml-56 pl-8 p-4 lg:p-6 flex items-center justify-center">
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

        <main className="flex-1 lg:ml-56 bg-black min-h-screen">
          {/* Header Bar */}
          <div className="bg-gray-900 border-b border-gray-700 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/courses')}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <MdArrowBack className="w-4 h-4" />
                  <span className="text-sm font-medium">Back to Courses</span>
                </button>
                <div className="w-px h-6 bg-gray-600"></div>
                <div>
                  <h1 className="text-xl font-semibold text-white">Course Editor</h1>
                  <p className="text-gray-400 text-sm">{formData.title || 'Untitled Course'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {formData.isPublished ? (
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-900/30 border border-emerald-700/50 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-emerald-300 text-sm font-medium">Published</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-amber-900/30 border border-amber-700/50 rounded-lg">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="text-amber-300 text-sm font-medium">Draft</span>
                  </div>
                )}
                <button 
                  onClick={handlePublishCourse}
                  disabled={loading || formData.isPublished}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                    formData.isPublished 
                      ? 'bg-green-600 text-white cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <MdPublish className="w-4 h-4" />
                  <span>{formData.isPublished ? 'Published' : 'Publish Now'}</span>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                  <MdMoreVert className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">

            {error && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Course Overview Card */}
            <div className="bg-gray-900 rounded-xl border border-gray-700 shadow-sm mb-4 sm:mb-6">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  {/* Course Thumbnail */}
                  <div className="flex-shrink-0">
                    {formData.thumbnailUrl ? (
                      <div className="relative group">
                        <img 
                          src={formData.thumbnailUrl} 
                          alt="Course thumbnail"
                          className="w-40 h-24 object-cover rounded-lg border border-gray-600"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg transition-all flex items-center justify-center">
                          <MdEdit className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-40 h-24 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center hover:bg-gray-750 transition-colors cursor-pointer group">
                        <div className="text-center">
                          <MdCloudUpload className="w-6 h-6 text-gray-500 group-hover:text-blue-400 mx-auto mb-1" />
                          <span className="text-xs text-gray-400 group-hover:text-blue-300">Add thumbnail</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Course Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-semibold text-white mb-2">{formData.title || 'Untitled Course'}</h2>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">{formData.description || 'No description provided'}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-4">
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <MdFolder className="w-4 h-4 text-gray-400" />
                          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Category</span>
                        </div>
                        <span className="text-sm font-medium text-white">{formData.category || 'Uncategorized'}</span>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <MdTrendingUp className="w-4 h-4 text-gray-400" />
                          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Level</span>
                        </div>
                        <span className="text-sm font-medium text-white capitalize">{formData.level}</span>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <MdPeople className="w-4 h-4 text-gray-400" />
                          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Price</span>
                        </div>
                        <span className="text-sm font-medium text-white">₦{formData.price?.toLocaleString() || '0'}</span>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <MdVideoLibrary className="w-4 h-4 text-gray-400" />
                          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Sections</span>
                        </div>
                        <span className="text-sm font-medium text-white">{sections.length}</span>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <MdPlayArrow className="w-4 h-4 text-gray-400" />
                          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Videos</span>
                        </div>
                        <span className="text-sm font-medium text-white">{sections.reduce((total, section) => total + (section.videos?.length || 0), 0)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-gray-900 rounded-xl border border-gray-700 shadow-sm">
              <div className="border-b border-gray-700 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Course Curriculum</h3>
                    <p className="text-gray-400 text-sm mt-1">Organize your course into sections and lessons</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddSection(!showAddSection)}
                    className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm w-full sm:w-auto"
                  >
                    <MdAdd className="w-4 h-4" />
                    <span>Add Section</span>
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">

                {/* Add Section Form */}
                {showAddSection && (
                  <div className="mb-6 p-5 bg-blue-900/20 border border-blue-700/50 rounded-xl">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-8 h-8 bg-blue-900/50 rounded-lg flex items-center justify-center">
                        <MdAdd className="w-4 h-4 text-blue-400" />
                      </div>
                      <h4 className="text-white font-medium">Create New Section</h4>
                    </div>
                    <form onSubmit={handleAddSection} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Section Title</label>
                        <input
                          type="text"
                          name="title"
                          value={newSection.title}
                          onChange={handleNewSectionChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="e.g., Introduction to JavaScript"
                          required
                        />
                      </div>
                      <div className="flex justify-end space-x-3 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddSection(false)
                            setNewSection({ title: '' })
                          }}
                          className="px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium"
                          disabled={loading}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors font-medium inline-flex items-center space-x-2"
                        >
                          {loading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                              <span>Creating...</span>
                            </>
                          ) : (
                            <span>Create Section</span>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Sections List */}
                {sections.length > 0 ? (
                  <div className="space-y-3">
                    {sections.map((section, index) => (
                      <div key={section.id} className="border border-gray-700 rounded-xl overflow-hidden bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
                        {/* Section Header */}
                        <div className="p-5 bg-gray-800/50">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center justify-center w-8 h-8 bg-blue-900/50 text-blue-400 text-sm font-semibold rounded-lg">
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="text-white font-medium text-base">{section.title}</h4>
                                <span className="text-gray-400 text-sm">
                                  {section.videos?.length || 0} lessons • {section.videos?.reduce((total, video) => {
                                    const [minutes, seconds] = video.duration.split(':').map(Number);
                                    return total + (minutes || 0) + (seconds ? seconds/60 : 0);
                                  }, 0).toFixed(0) || 0} min
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => toggleSectionExpanded(section.id)}
                                className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                                title="Toggle section"
                              >
                                {expandedSections[section.id] ? (
                                  <MdExpandLess className="w-5 h-5" />
                                ) : (
                                  <MdExpandMore className="w-5 h-5" />
                                )}
                              </button>
                              <button
                                onClick={() => handleDeleteSection(section.id, section.title)}
                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                                disabled={loading}
                                title="Delete section"
                              >
                                <MdDelete className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Section Content - Expandable */}
                        {expandedSections[section.id] && (
                          <div className="px-5 pb-5 space-y-6">
                            {/* Videos List */}
                            <div>
                              <div className="flex justify-between items-center mb-4">
                                <h5 className="text-white font-medium flex items-center space-x-2">
                                  <div className="w-6 h-6 bg-emerald-900/50 rounded-lg flex items-center justify-center">
                                    <MdPlayArrow className="w-4 h-4 text-emerald-400" />
                                  </div>
                                  <span>Video Lessons</span>
                                </h5>
                                <button
                                  onClick={() => toggleAddVideo(section.id)}
                                  className="inline-flex items-center space-x-2 px-3 py-2 text-emerald-300 bg-emerald-900/20 hover:bg-emerald-900/30 rounded-lg text-sm font-medium transition-colors border border-emerald-700/50"
                                >
                                  <MdAdd className="w-4 h-4" />
                                  <span>Add Video</span>
                                </button>
                              </div>

                              {/* Add Video Form */}
                              {showAddVideo[section.id] && (
                                <div className="mb-6 p-5 bg-emerald-900/20 border border-emerald-700/50 rounded-xl">
                                  <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-8 h-8 bg-emerald-900/50 rounded-lg flex items-center justify-center">
                                      <MdVideoLibrary className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <h6 className="text-white font-medium">Add New Video Lesson</h6>
                                  </div>
                                  <form onSubmit={(e) => handleAddVideo(e, section.id)} className="space-y-5">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">Video Title *</label>
                                      <input
                                        type="text"
                                        name="title"
                                        value={newVideo.title}
                                        onChange={handleNewVideoChange}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        placeholder="e.g., Introduction to Variables"
                                        required
                                      />
                                    </div>
                                    
                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                      <textarea
                                        name="description"
                                        value={newVideo.description}
                                        onChange={handleNewVideoChange}
                                        rows={3}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none transition-colors"
                                        placeholder="Brief description of what students will learn (optional)"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">Video File *</label>
                                      <div className="relative">
                                        <input
                                          type="file"
                                          name="videoFile"
                                          onChange={handleNewVideoChange}
                                          accept="video/*"
                                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-emerald-900/30 file:text-emerald-300 hover:file:bg-emerald-900/50 file:font-medium transition-colors"
                                          required
                                        />
                                        {newVideo.videoFile && (
                                          <div className="mt-2 p-3 bg-green-900/30 border border-green-700/50 rounded-lg">
                                            <p className="text-green-300 text-sm font-medium">
                                              ✓ {newVideo.videoFile.name}
                                            </p>
                                            <p className="text-green-400 text-xs mt-1">
                                              Size: {uploadService.formatFileSize(newVideo.videoFile.size)}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                      <input
                                        type="checkbox"
                                        name="preview"
                                        id={`preview-${section.id}`}
                                        checked={newVideo.preview}
                                        onChange={handleNewVideoChange}
                                        className="mt-1 rounded bg-gray-700 border-gray-600 text-emerald-500 focus:ring-emerald-500"
                                      />
                                      <div>
                                        <label htmlFor={`preview-${section.id}`} className="text-sm font-medium text-gray-300">
                                          Preview Lesson
                                        </label>
                                        <p className="text-xs text-gray-400 mt-1">Allow students to watch this lesson for free</p>
                                      </div>
                                    </div>

                                    {/* Upload Progress */}
                                    {uploadingVideo && (
                                      <div className="p-4 bg-blue-900/30 border border-blue-700/50 rounded-lg">
                                        <div className="flex justify-between text-sm mb-2">
                                          <span className="text-blue-300 font-medium">Uploading video...</span>
                                          <span className="text-blue-400 font-semibold">{uploadProgress}%</span>
                                        </div>
                                        <div className="w-full bg-blue-900/50 rounded-full h-2">
                                          <div 
                                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${uploadProgress}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                    )}

                                    <div className="flex justify-end space-x-3 pt-2">
                                      <button
                                        type="button"
                                        onClick={() => toggleAddVideo(section.id)}
                                        className="px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium"
                                        disabled={uploadingVideo}
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        type="submit"
                                        disabled={uploadingVideo}
                                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-lg transition-colors font-medium inline-flex items-center space-x-2 shadow-sm"
                                      >
                                        {uploadingVideo ? (
                                          <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            <span>Uploading...</span>
                                          </>
                                        ) : (
                                          <>
                                            <MdCloudUpload className="w-4 h-4" />
                                            <span>Upload Video</span>
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              )}

                              {/* Video List */}
                              {section.videos && section.videos.length > 0 ? (
                                <div className="space-y-3">
                                  {section.videos.map((video, videoIndex) => (
                                    <div key={video.id} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600/50 hover:border-gray-500/50 transition-colors">
                                      <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                          <div className="flex items-center space-x-3 mb-2">
                                            <button 
                                              onClick={() => handlePlayVideo(video)}
                                              className="w-8 h-8 bg-blue-600/20 hover:bg-blue-600/40 rounded-lg flex items-center justify-center transition-colors group"
                                            >
                                              <MdPlayArrow className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                                            </button>
                                            <div>
                                              <h6 className="text-white font-medium text-sm">{video.title}</h6>
                                              <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                                                <span>Position: {video.position}</span>
                                                <span>Duration: {video.duration}</span>
                                                {video.preview && (
                                                  <span className="px-2 py-0.5 bg-green-600/20 text-green-400 rounded-full">Preview</span>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                          {video.description && (
                                            <p className="text-gray-300 text-xs ml-11">{video.description}</p>
                                          )}
                                        </div>
                                        <div className="flex items-center space-x-2 ml-4">
                                          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-600/50 rounded-lg transition-colors">
                                            <MdEdit className="w-3.5 h-3.5" />
                                          </button>
                                          <button 
                                            onClick={() => handleDeleteVideo(video.id, video.title)}
                                            disabled={loading}
                                            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-600/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                          >
                                            <MdDelete className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-8 px-4">
                                  <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <MdVideoLibrary className="w-6 h-6 text-gray-400" />
                                  </div>
                                  <p className="text-gray-300 text-sm font-medium mb-1">No video lessons yet</p>
                                  <p className="text-gray-500 text-xs">Click "Add Video" to upload your first lesson</p>
                                </div>
                              )}
                            </div>

                            {/* Materials Section */}
                            <div>
                              <div className="flex justify-between items-center mb-4">
                                <h5 className="text-white font-medium flex items-center space-x-2">
                                  <div className="w-6 h-6 bg-amber-900/50 rounded-lg flex items-center justify-center">
                                    <MdDescription className="w-4 h-4 text-amber-400" />
                                  </div>
                                  <span>Learning Materials</span>
                                </h5>
                                <button 
                                  onClick={() => setShowAddDocument(prev => ({
                                    ...prev,
                                    [section.id]: !prev[section.id]
                                  }))}
                                  className="inline-flex items-center space-x-2 px-3 py-2 text-amber-300 bg-amber-900/20 hover:bg-amber-900/30 rounded-lg text-sm font-medium transition-colors border border-amber-700/50"
                                >
                                  <MdAdd className="w-4 h-4" />
                                  <span>Add Material</span>
                                </button>
                              </div>

                              {/* Add Document Form */}
                              {showAddDocument[section.id] && (
                                <div className="mb-6 p-5 bg-amber-900/20 border border-amber-700/50 rounded-xl">
                                  <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-8 h-8 bg-amber-900/50 rounded-lg flex items-center justify-center">
                                      <MdDescription className="w-4 h-4 text-amber-400" />
                                    </div>
                                    <h6 className="text-white font-medium">Add Learning Material</h6>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Select Document *
                                      </label>
                                      <input
                                        type="file"
                                        accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.rtf"
                                        onChange={(e) => handleDocumentUpload(e, section.id)}
                                        disabled={uploadingDocument}
                                        className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-amber-600/20 file:text-amber-300 hover:file:bg-amber-600/30 file:transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                      />
                                      <p className="text-xs text-gray-400 mt-1">
                                        Supported formats: PDF, DOC, DOCX, PPT, PPTX, TXT, RTF (Max: 50MB)
                                      </p>
                                    </div>

                                    {uploadingDocument && (
                                      <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                          <span className="text-gray-300">Uploading document...</span>
                                          <span className="text-amber-400">{documentUploadProgress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                          <div 
                                            className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${documentUploadProgress}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                    )}

                                    <div className="flex justify-end space-x-3">
                                      <button
                                        type="button"
                                        onClick={() => setShowAddDocument(prev => ({
                                          ...prev,
                                          [section.id]: false
                                        }))}
                                        disabled={uploadingDocument}
                                        className="px-4 py-2 text-gray-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {/* Materials List */}
                              {section.resources ? (
                                <div className="p-4 bg-amber-900/10 rounded-lg border border-amber-700/30">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center">
                                      <MdDescription className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div className="flex-1">
                                      <h6 className="text-white font-medium text-sm">Learning Resource</h6>
                                      <p className="text-gray-300 text-xs">Click to download or view</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <a
                                        href={section.resources}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-amber-400 hover:text-amber-300 hover:bg-amber-600/10 rounded-lg transition-colors"
                                        title="Open resource"
                                      >
                                        <MdVisibility className="w-4 h-4" />
                                      </a>
                                      <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-600/10 rounded-lg transition-colors">
                                        <MdDelete className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center py-8 px-4">
                                  <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <MdDescription className="w-6 h-6 text-gray-400" />
                                  </div>
                                  <p className="text-gray-300 text-sm font-medium mb-1">No learning materials yet</p>
                                  <p className="text-gray-500 text-xs">Add PDFs, documents, or other resources for students</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                  </div>
                ))}
              </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <MdVideoLibrary className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-white font-medium mb-2">No sections yet</h4>
                    <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                      Get started by creating your first section to organize your course content
                    </p>
                    <button
                      onClick={() => setShowAddSection(true)}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                    >
                      <MdAdd className="w-4 h-4" />
                      <span>Create First Section</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Video Player Modal */}
      {showVideoPlayer && currentVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div>
                <h3 className="text-white font-semibold text-lg">{currentVideo.title}</h3>
                {currentVideo.description && (
                  <p className="text-gray-300 text-sm mt-1">{currentVideo.description}</p>
                )}
              </div>
              <button
                onClick={handleCloseVideoPlayer}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
              <video
                className="w-full h-auto max-h-[70vh]"
                controls
                autoPlay
                preload="metadata"
                controlsList="nodownload"
              >
                <source src={currentVideo.videoUrl} type="video/mp4" />
                <source src={currentVideo.videoUrl} type="video/webm" />
                <source src={currentVideo.videoUrl} type="video/quicktime" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Info */}
            <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4 text-gray-300">
                  <span>Duration: {currentVideo.duration}</span>
                  <span>Position: {currentVideo.position}</span>
                  {currentVideo.preview && (
                    <span className="px-2 py-1 bg-green-600/20 text-green-400 rounded-full text-xs">Preview Available</span>
                  )}
                </div>
                <div className="text-gray-400 text-xs">
                  Created: {new Date(currentVideo.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditCourse
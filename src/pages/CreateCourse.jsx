import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function CreateCourse() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    description: '',
    category: '',
    level: '',
    language: 'English',
    
    // Course Content
    objectives: [''],
    requirements: [''],
    whatYoullLearn: [''],
    
    // Pricing & Details
    price: '',
    estimatedHours: '',
    maxStudents: '',
    
    // Media
    thumbnail: null,
    previewVideo: null,
    
    // Course Content Structure
    sections: [
      {
        id: 1,
        title: '',
        videos: [{ id: 1, title: '', file: null, duration: '' }]
      }
    ]
  })

  const categories = [
    'Mathematics',
    'Physics', 
    'Chemistry',
    'Biology',
    'English',
    'Further Mathematics',
    'Economics',
    'Government',
    'Literature',
    'Geography'
  ]

  const levels = [
    'WAEC/SSCE Preparation',
    'JAMB/UTME Preparation', 
    'Post UTME Preparation',
    'A-Level',
    'Undergraduate',
    'Professional'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }))
  }

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleNext = (e) => {
    if (e) e.preventDefault()
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = (e) => {
    if (e) e.preventDefault()
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.description && formData.category && formData.level
      case 2:
        return formData.sections.some(section => section.title.trim() && section.videos.some(video => video.title.trim())) &&
               formData.objectives.some(obj => obj.trim()) && 
               formData.requirements.some(req => req.trim()) && 
               formData.whatYoullLearn.some(item => item.trim())
      case 3:
        return formData.price && formData.estimatedHours
      case 4:
        return true // Media is optional
      default:
        return true
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentStep < 4) {
      if (validateCurrentStep()) {
        handleNext()
      } else {
        alert('Please fill in all required fields before proceeding.')
      }
      return
    }
    // Only submit when we're on the final step
    if (validateCurrentStep()) {
      console.log('Course data:', formData)
      alert('Course created successfully!')
      navigate('/courses')
    } else {
      alert('Please complete all required information.')
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-2">🚀 Course Basics</h3>
              <p className="text-gray-400">Tell us about your amazing course</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Course Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Complete JAMB Mathematics Preparation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Course Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe what this course covers and why students should take it..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Level *</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a level</option>
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">📚 Course Content Structure</h3>
              <p className="text-gray-400">Organize your course into sections and lessons</p>
            </div>
            
            {/* Course Sections */}
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-6 rounded-xl border border-purple-500/30">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="text-2xl mr-2">🎬</span>
                Course Sections & Videos
              </h4>
              <p className="text-gray-400 text-sm mb-6">Break your course into organized sections with video lessons</p>
              
              {formData.sections.map((section, sectionIndex) => (
                <div key={section.id} className="bg-gray-800/50 p-4 rounded-lg mb-4 border border-gray-600">
                  <div className="flex items-center justify-between mb-4">
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => {
                        const newSections = [...formData.sections]
                        newSections[sectionIndex].title = e.target.value
                        setFormData(prev => ({ ...prev, sections: newSections }))
                      }}
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mr-4"
                      placeholder={`Section ${sectionIndex + 1}: e.g., Introduction to Algebra`}
                    />
                    {formData.sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newSections = formData.sections.filter((_, i) => i !== sectionIndex)
                          setFormData(prev => ({ ...prev, sections: newSections }))
                        }}
                        className="text-red-400 hover:text-red-300 p-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  {/* Videos in this section */}
                  <div className="ml-4">
                    <h5 className="text-white font-medium mb-3 flex items-center">
                      <span className="text-lg mr-2">📹</span>
                      Video Lessons
                    </h5>
                    {section.videos.map((video, videoIndex) => (
                      <div key={video.id} className="bg-gray-900/50 p-4 rounded-lg mb-3 border border-gray-800">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                          <div>
                            <label className="block text-xs text-gray-400 mb-2">Lesson Title</label>
                            <input
                              type="text"
                              value={video.title}
                              onChange={(e) => {
                                const newSections = [...formData.sections]
                                newSections[sectionIndex].videos[videoIndex].title = e.target.value
                                setFormData(prev => ({ ...prev, sections: newSections }))
                              }}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., Solving Linear Equations"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-2">Duration (optional)</label>
                            <input
                              type="text"
                              value={video.duration}
                              onChange={(e) => {
                                const newSections = [...formData.sections]
                                newSections[sectionIndex].videos[videoIndex].duration = e.target.value
                                setFormData(prev => ({ ...prev, sections: newSections }))
                              }}
                              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., 15 mins"
                            />
                          </div>
                          <div className="flex space-x-2">
                            <input
                              type="file"
                              accept="video/*"
                              onChange={(e) => {
                                const newSections = [...formData.sections]
                                newSections[sectionIndex].videos[videoIndex].file = e.target.files[0]
                                setFormData(prev => ({ ...prev, sections: newSections }))
                              }}
                              className="hidden"
                              id={`video-${section.id}-${video.id}`}
                            />
                            <label
                              htmlFor={`video-${section.id}-${video.id}`}
                              className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm text-center transition-colors"
                            >
                              {video.file ? '✓ Video Selected' : 'Upload Video'}
                            </label>
                            {section.videos.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const newSections = [...formData.sections]
                                  newSections[sectionIndex].videos = newSections[sectionIndex].videos.filter((_, i) => i !== videoIndex)
                                  setFormData(prev => ({ ...prev, sections: newSections }))
                                }}
                                className="text-red-400 hover:text-red-300 px-2 py-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newSections = [...formData.sections]
                        const newVideoId = Math.max(...newSections[sectionIndex].videos.map(v => v.id)) + 1
                        newSections[sectionIndex].videos.push({ id: newVideoId, title: '', file: null, duration: '' })
                        setFormData(prev => ({ ...prev, sections: newSections }))
                      }}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Video Lesson
                    </button>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => {
                  const newSectionId = Math.max(...formData.sections.map(s => s.id)) + 1
                  const newSection = {
                    id: newSectionId,
                    title: '',
                    videos: [{ id: 1, title: '', file: null, duration: '' }]
                  }
                  setFormData(prev => ({ ...prev, sections: [...prev.sections, newSection] }))
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Section
              </button>
            </div>

            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-6 rounded-xl border border-green-500/30">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="text-2xl mr-2">🎯</span>
                Learning Objectives
              </h4>
              <p className="text-gray-400 text-sm mb-4">What will students achieve after completing this course?</p>
              {formData.objectives.map((objective, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={objective}
                    onChange={(e) => handleArrayChange('objectives', index, e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Master quadratic equations and solve complex problems"
                  />
                  {formData.objectives.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('objectives', index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('objectives')}
                className="text-green-400 hover:text-green-300 text-sm font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Learning Objective
              </button>
            </div>

            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 p-6 rounded-xl border border-orange-500/30">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="text-2xl mr-2">📋</span>
                Prerequisites
              </h4>
              <p className="text-gray-400 text-sm mb-4">What should students know before taking this course?</p>
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Basic algebra knowledge"
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('requirements', index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('requirements')}
                className="text-orange-400 hover:text-orange-300 text-sm font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Prerequisite
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-6 rounded-xl border border-blue-500/30">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="text-2xl mr-2">✨</span>
                What You'll Learn
              </h4>
              <p className="text-gray-400 text-sm mb-4">Key skills and knowledge students will gain</p>
              {formData.whatYoullLearn.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('whatYoullLearn', index, e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Solve complex mathematical problems with confidence"
                  />
                  {formData.whatYoullLearn.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('whatYoullLearn', index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('whatYoullLearn')}
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Learning Outcome
              </button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-2">💰 Pricing & Details</h3>
              <p className="text-gray-400">Set your course price and important details</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Course Price (₦) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="15000"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Estimated Hours *</label>
                <input
                  type="number"
                  name="estimatedHours"
                  value={formData.estimatedHours}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="40"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Max Students</label>
                <input
                  type="number"
                  name="maxStudents"
                  value={formData.maxStudents}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="100"
                  min="1"
                />
                <p className="text-xs text-gray-400 mt-1">Leave empty for unlimited enrollment</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="English">English</option>
                  <option value="Yoruba">Yoruba</option>
                  <option value="Hausa">Hausa</option>
                  <option value="Igbo">Igbo</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-2">🎨 Course Media</h3>
              <p className="text-gray-400">Add visual elements to make your course attractive</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Course Thumbnail</label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <input
                  type="file"
                  name="thumbnail"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                  id="thumbnail"
                />
                <label htmlFor="thumbnail" className="cursor-pointer">
                  <div className="space-y-2">
                    <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="text-gray-400">
                      <span className="text-blue-400 hover:text-blue-300">Upload an image</span> or drag and drop
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </label>
                {formData.thumbnail && (
                  <p className="mt-2 text-sm text-green-400">✓ {formData.thumbnail.name}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Preview Video (Optional)</label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <input
                  type="file"
                  name="previewVideo"
                  onChange={handleFileChange}
                  accept="video/*"
                  className="hidden"
                  id="previewVideo"
                />
                <label htmlFor="previewVideo" className="cursor-pointer">
                  <div className="space-y-2">
                    <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <div className="text-gray-400">
                      <span className="text-blue-400 hover:text-blue-300">Upload a video</span> or drag and drop
                    </div>
                    <p className="text-xs text-gray-500">MP4, MOV, AVI up to 100MB</p>
                  </div>
                </label>
                {formData.previewVideo && (
                  <p className="mt-2 text-sm text-green-400">✓ {formData.previewVideo.name}</p>
                )}
              </div>
            </div>

            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2">Ready to Publish?</h4>
              <p className="text-gray-400 text-sm">
                Review all the information above. Once you submit, your course will be saved as a draft 
                and you can add lessons and content before publishing it to students.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 ml-56 p-6">
          <div className="max-w-4xl">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={() => navigate('/courses')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-white">Create New Course</h1>
                  <p className="text-base text-gray-400">Build an engaging learning experience for your students</p>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center space-x-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-400'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`w-16 h-1 mx-2 ${
                        currentStep > step ? 'bg-blue-600' : 'bg-gray-700'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-4 mt-2 text-sm text-gray-400">
                <span className={currentStep === 1 ? 'text-blue-400' : ''}>Basic Info</span>
                <span className={currentStep === 2 ? 'text-blue-400' : ''}>Content</span>
                <span className={currentStep === 3 ? 'text-blue-400' : ''}>Pricing</span>
                <span className={currentStep === 4 ? 'text-blue-400' : ''}>Media</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg border border-gray-800">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-800">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate('/courses')}
                    className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Save as Draft
                  </button>
                  
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Create Course
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default CreateCourse
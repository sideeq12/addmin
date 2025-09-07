import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { courseService } from '../services/courses'
import Sidebar from '../components/Sidebar'

function Courses() {
  const { user } = useAuth()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('all')
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    // Check for success message from navigation state
    if (location.state?.message) {
      setSuccessMessage(location.state.message)
      // Clear the message from history
      window.history.replaceState({}, document.title)
    }

    if (user?.id) {
      loadCourses()
    }
  }, [user, location.state])

  const loadCourses = async () => {
    try {
      setLoading(true)
      setError('')
      
      const response = await courseService.getTutorCourses(user.id)
      const coursesData = response.courses || []
      
      // Transform API data to match UI expectations
      const transformedCourses = coursesData.map(course => ({
        id: course.id,
        title: course.title,
        subject: course.category || 'General',
        students: 0, // Mock data - enrollment endpoint not yet available
        rating: 4.8, // Mock data - ratings endpoint not yet available
        status: course.is_published ? 'active' : 'draft',
        earnings: '₦0', // Mock data - earnings endpoint not yet available
        price: course.price,
        image: course.thumbnail_url || '/class.avif',
        description: course.description,
        level: course.level,
        created_at: course.created_at
      }))
      
      setCourses(transformedCourses)
    } catch (err) {
      console.error('Load courses error:', err)
      setError('Failed to load courses')
    } finally {
      setLoading(false)
    }
  }

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  const filteredCourses = courses.filter(course => {
    if (activeTab === 'all') return true
    if (activeTab === 'active') return course.status === 'active'
    if (activeTab === 'draft') return course.status === 'draft'
    return true
  })

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 lg:ml-56 p-4 lg:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-xl font-semibold text-white mb-1">Courses</h1>
              <p className="text-sm text-gray-400">Manage your courses and track performance</p>
            </div>
            <Link 
              to="/courses/create"
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors inline-flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Course</span>
            </Link>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-600/20 border border-green-600/50 rounded-lg">
              <p className="text-green-400">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-600/50 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-800 p-1 rounded mb-4 w-fit">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                activeTab === 'all' 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveTab('active')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                activeTab === 'active' 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Active
            </button>
            <button 
              onClick={() => setActiveTab('draft')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                activeTab === 'draft' 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Drafts
            </button>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white">Loading courses...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Courses Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filteredCourses.map(course => (
              <div key={course.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-600 transition-colors">
                <div className="relative h-48">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      course.status === 'active' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-yellow-600 text-white'
                    }`}>
                      {course.status === 'active' ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-base font-medium text-white mb-2">{course.title}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-gray-400 text-xs">{course.subject}</p>
                    {course.status === 'draft' && (
                      <span className="text-xs bg-orange-600/20 text-orange-400 px-2 py-1 rounded-full">
                        Needs Media
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-gray-300 text-sm">{course.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        <span className="text-gray-300 text-sm">{course.students}</span>
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm font-medium">₦{course.price?.toLocaleString() || '0'}</div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link 
                      to={`/courses/${course.id}/edit`} 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-xs font-medium transition-colors text-center"
                    >
                      {course.status === 'draft' ? 'Add Media' : 'Edit'}
                    </Link>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded text-xs font-medium transition-colors">
                      Stats
                    </button>
                  </div>
                </div>
              </div>
            ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {activeTab === 'all' && 'No courses found'}
                    {activeTab === 'active' && 'No published courses'}
                    {activeTab === 'draft' && 'No draft courses'}
                  </h3>
                  <p className="text-gray-400 mb-4">Get started by creating your first course</p>
                  <Link 
                    to="/courses/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Create New Course</span>
                  </Link>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default Courses
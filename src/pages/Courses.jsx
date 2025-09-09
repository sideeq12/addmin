import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { courseService } from '../services/courses'
import Sidebar from '../components/Sidebar'
import { 
  MdAdd, 
  MdStar, 
  MdPeople, 
  MdEdit, 
  MdAssessment,
  MdSchool
} from 'react-icons/md'

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
      
      console.log('🔍 Raw courses data from API:', coursesData)
      
      // Transform API data to match UI expectations
      const transformedCourses = coursesData.map(course => {
        console.log(`🔍 Course "${course.title}" - is_published:`, course.is_published, typeof course.is_published)
        console.log(`🖼️ Course "${course.title}" - thumbnail:`, course.thumbnail)
        
        return {
          id: course.id,
          title: course.title,
          subject: course.category || 'General',
          students: 0, // Mock data - enrollment endpoint not yet available
          rating: 4.8, // Mock data - ratings endpoint not yet available
          status: course.is_published === true || course.is_published === 'true' ? 'active' : 'draft',
          earnings: '₦0', // Mock data - earnings endpoint not yet available
          price: course.price,
          image: course.thumbnail || '/class.avif',
          description: course.description,
          level: course.level,
          created_at: course.created_at
        }
      })
      
      console.log('🔍 Transformed courses:', transformedCourses.map(c => ({ title: c.title, status: c.status })))
      
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
        <main className="flex-1 lg:ml-56 pl-8 p-4 lg:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-xl font-semibold text-white mb-1">Courses</h1>
              <p className="text-sm text-gray-400">Manage your courses and track performance</p>
            </div>
            <Link 
              to="/courses/create"
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-2 border border-gray-600"
            >
              <MdAdd className="w-4 h-4" />
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
                    onError={(e) => {
                      e.target.src = '/class.avif'
                    }}
                    loading="lazy"
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
                        <MdStar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">{course.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MdPeople className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300 text-sm">{course.students}</span>
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm font-medium">₦{course.price?.toLocaleString() || '0'}</div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link 
                      to={`/courses/${course.id}/edit`} 
                      className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors text-center border border-gray-600 inline-flex items-center justify-center space-x-1"
                    >
                      <MdEdit className="w-3 h-3" />
                      <span>{course.status === 'draft' ? 'Add Media' : 'Edit'}</span>
                    </Link>
                    <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors border border-gray-600 inline-flex items-center space-x-1">
                      <MdAssessment className="w-3 h-3" />
                      <span>Stats</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <MdSchool className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {activeTab === 'all' && 'No courses found'}
                    {activeTab === 'active' && 'No published courses'}
                    {activeTab === 'draft' && 'No draft courses'}
                  </h3>
                  <p className="text-gray-400 mb-4">Get started by creating your first course</p>
                  <Link 
                    to="/courses/create"
                    className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2 border border-gray-600"
                  >
                    <MdAdd className="w-4 h-4" />
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
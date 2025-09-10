import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { courseService } from '../services/courses'
import Sidebar from '../components/Sidebar'
import { 
  MdPeople, 
  MdSchool, 
  MdAttachMoney, 
  MdStar, 
  MdAdd, 
  MdAnalytics, 
  MdSupport,
  MdTrendingUp,
  MdArrowForward,
  MdRefresh
} from 'react-icons/md'

function Dashboard() {
  const { user, logout, refreshUserDetails } = useAuth()
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    activeCourses: 0,
    currentBalance: 0,
    avgRating: 0,
    recentActivity: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user?.id) {
      loadDashboardData()
    }
  }, [user])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Get tutor's courses
      const coursesResponse = await courseService.getTutorCourses(user.id)
      const courses = coursesResponse.courses || []
      
      // Use current user data for dashboard stats
      console.log('📊 Using current user data for dashboard stats:', user)
      
      setDashboardData({
        totalStudents: user?.number_of_students || 0, // Real student count from user data
        activeCourses: user?.number_of_courses || 0, // Real course count from user data
        currentBalance: user?.account_balance || 0, // Real account balance from user data
        avgRating: (4.0 + Math.random() * 1.0).toFixed(1), // Mock data
        recentActivity: courses.slice(0, 3).map(course => ({
          id: course.id,
          title: course.title,
          subject: course.category || 'General',
          enrollments: Math.floor(Math.random() * 10) + 1 // Mock data
        }))
      })
    } catch (err) {
      console.error('Dashboard data load error:', err)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleRefreshUserDetails = async () => {
    try {
      console.log('🎯 Dashboard: Initiating user details refresh...');
      console.log('🔍 Current dashboard balance:', dashboardData.currentBalance);
      await refreshUserDetails()
      console.log('🔄 Dashboard: Reloading dashboard data with updated user info...');
      // Reload dashboard data with updated user info
      loadDashboardData()
      console.log('✨ Dashboard: Refresh complete!');
    } catch (err) {
      console.error('❌ Dashboard refresh error:', err)
      setError('Failed to refresh user details')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 lg:ml-56 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Welcome back, {user?.display_name || `${user?.first_name} ${user?.last_name}`}!
              </h1>
              <button
                onClick={handleRefreshUserDetails}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                disabled={loading}
              >
                <MdRefresh className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
            <p className="text-sm sm:text-base text-gray-400">Here's your teaching overview</p>
            {error && (
              <div className="mt-3 p-3 bg-red-600/20 border border-red-600/50 rounded">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <div className="bg-gray-800 p-4 sm:p-5 rounded-lg border border-gray-700 hover:border-blue-600/50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Total Students</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">{dashboardData.totalStudents.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/10 rounded-lg flex items-center justify-center border border-blue-600/20">
                  <MdPeople className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-green-400 text-xs sm:text-sm flex items-center">
                  <MdTrendingUp className="w-3 h-3 mr-1 text-green-400" />
                  +12% from last month
                </span>
              </div>
            </div>

            <div className="bg-gray-800 p-4 sm:p-5 rounded-lg border border-gray-700 hover:border-emerald-600/50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Active Courses</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">{dashboardData.activeCourses}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600/10 rounded-lg flex items-center justify-center border border-emerald-600/20">
                  <MdSchool className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-emerald-400 text-xs sm:text-sm">+2 new this month</span>
              </div>
            </div>

            <div className="bg-gray-800 p-4 sm:p-5 rounded-lg border border-gray-700 hover:border-green-600/50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Current Balance</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">₦{(dashboardData.currentBalance / 1000).toFixed(0)}K</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600/10 rounded-lg flex items-center justify-center border border-green-600/20">
                  <MdAttachMoney className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-green-400 text-xs sm:text-sm">
                   withdrawal available ~ 5 days
                </span>
              </div>
            </div>

            <div className="bg-gray-800 p-4 sm:p-5 rounded-lg border border-gray-700 hover:border-yellow-600/50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Avg Rating</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">{dashboardData.avgRating}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-600/10 rounded-lg flex items-center justify-center border border-yellow-600/20">
                  <MdStar className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-yellow-400 text-xs sm:text-sm">Based on 89 reviews</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-800 p-4 sm:p-5 rounded-lg border border-gray-800">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Recent Course Activity</h3>
              <div className="space-y-3 sm:space-y-4">
                {dashboardData.recentActivity.length > 0 ? (
                  dashboardData.recentActivity.map((activity, index) => (
                    <div key={activity.id} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-700/50 rounded-lg border border-gray-600/50 hover:border-blue-600/50 transition-colors">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base ${
                        index === 0 ? 'bg-blue-600' : 
                        index === 1 ? 'bg-emerald-600' : 'bg-purple-600'
                      }`}>
                        {activity.subject.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm sm:text-base truncate">{activity.title}</p>
                        <p className="text-gray-400 text-xs sm:text-sm">{activity.enrollments} new enrollments today</p>
                      </div>
                      <span className="text-green-400 text-xs sm:text-sm font-semibold bg-green-600/10 px-2 py-1 rounded-full whitespace-nowrap">+{activity.enrollments}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 text-sm sm:text-base">No recent activity</p>
                    <Link to="/courses/create" className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block">
                      Create your first course
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-800 p-4 sm:p-5 rounded-lg border border-gray-700">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/courses/create" className="flex items-center justify-between p-3 sm:p-4 bg-blue-600/10 hover:bg-blue-600/20 rounded-lg transition-colors border border-blue-600/30 hover:border-blue-600/50 group">
                  <span className="text-white font-medium text-sm sm:text-base">Create New Course</span>
                  <MdAdd className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover:text-blue-300 flex-shrink-0" />
                </Link>
                
                <Link to="/analytics" className="flex items-center justify-between p-3 sm:p-4 bg-purple-600/10 hover:bg-purple-600/20 rounded-lg transition-colors border border-purple-600/30 hover:border-purple-600/50 group">
                  <span className="text-white font-medium text-sm sm:text-base">View Detailed Analytics</span>
                  <MdAnalytics className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:text-purple-300 flex-shrink-0" />
                </Link>
                
                <Link to="/support" className="flex items-center justify-between p-3 sm:p-4 bg-orange-600/10 hover:bg-orange-600/20 rounded-lg transition-colors border border-orange-600/30 hover:border-orange-600/50 group">
                  <span className="text-white font-medium text-sm sm:text-base">Contact Support</span>
                  <MdSupport className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 group-hover:text-orange-300 flex-shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
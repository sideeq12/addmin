import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function Dashboard() {
  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 lg:ml-56 p-4 lg:p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-base text-gray-400">Welcome back! Here's your teaching overview</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded border border-gray-950">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Students</p>
                  <p className="text-2xl font-bold text-white">142</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-green-400 text-sm">↗ +12% from last month</span>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Courses</p>
                  <p className="text-2xl font-bold text-white">8</p>
                </div>
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-green-400 text-sm">+2 new this month</span>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Monthly Earnings</p>
                  <p className="text-2xl font-bold text-white">₦425K</p>
                </div>
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-green-400 text-sm">+18% from last month</span>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg Rating</p>
                  <p className="text-2xl font-bold text-white">4.8</p>
                </div>
                <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-green-400 text-sm">Based on 89 reviews</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-5 rounded-lg border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Course Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    M
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Mathematics - WAEC Prep</p>
                    <p className="text-gray-400 text-sm">5 new enrollments today</p>
                  </div>
                  <span className="text-green-400 text-sm font-semibold">+5</span>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                    P
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Physics - JAMB Prep</p>
                    <p className="text-gray-400 text-sm">2 new enrollments today</p>
                  </div>
                  <span className="text-green-400 text-sm font-semibold">+2</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-5 rounded-lg border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/courses/create" className="flex items-center justify-between p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                  <span className="text-white font-medium">Create New Course</span>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </Link>
                
                <Link to="/analytics" className="flex items-center justify-between p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <span className="text-white font-medium">View Detailed Analytics</span>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </Link>
                
                <Link to="/support" className="flex items-center justify-between p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <span className="text-white font-medium">Contact Support</span>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
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
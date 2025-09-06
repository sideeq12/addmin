import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg shadow-lg transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed w-56 bg-black border border-gray-800 min-h-screen p-4 border-r border-gray-800 shadow-xl z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      <div className="mb-8">
        <Link to="/" className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
          Scholarbase
        </Link>
        <p className="text-gray-400 text-sm mt-1">Tutor Dashboard</p>
      </div>
      
      <nav className="space-y-2">
        <Link 
          to="/dashboard" 
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive('/dashboard') 
              ? 'text-white bg-blue-600 shadow-md' 
              : 'text-gray-300 hover:text-white hover:bg-gray-700 hover:shadow-sm'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h2a2 2 0 012 2v.09A2 2 0 0016 7a2 2 0 012 2v.09A2 2 0 0020 11v4a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
          </svg>
          <span className="font-medium">Dashboard</span>
        </Link>
        
        <Link 
          to="/courses" 
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive('/courses') 
              ? 'text-white bg-blue-600 shadow-md' 
              : 'text-gray-300 hover:text-white hover:bg-gray-700 hover:shadow-sm'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="font-medium">Courses</span>
        </Link>
        
        <Link 
          to="/analytics" 
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive('/analytics') 
              ? 'text-white bg-blue-600 shadow-md' 
              : 'text-gray-300 hover:text-white hover:bg-gray-700 hover:shadow-sm'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="font-medium">Analytics</span>
        </Link>
        
        <Link 
          to="/students-performance" 
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive('/students-performance') 
              ? 'text-white bg-blue-600 shadow-md' 
              : 'text-gray-300 hover:text-white hover:bg-gray-700 hover:shadow-sm'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 715 0z" />
          </svg>
          <span className="font-medium">Students</span>
        </Link>
        
        <Link 
          to="/earnings" 
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive('/earnings') 
              ? 'text-white bg-blue-600 shadow-md' 
              : 'text-gray-300 hover:text-white hover:bg-gray-700 hover:shadow-sm'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          <span className="font-medium">Earnings</span>
        </Link>
        
        <Link 
          to="/support" 
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive('/support') 
              ? 'text-white bg-blue-600 shadow-md' 
              : 'text-gray-300 hover:text-white hover:bg-gray-700 hover:shadow-sm'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Support</span>
        </Link>
      </nav>
      
      <div className="mt-auto pt-6">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </div>
            <div>
              <p className="text-white font-medium">
                {user?.display_name || `${user?.first_name} ${user?.last_name}`}
              </p>
              <p className="text-gray-400 text-sm">{user?.expertise || 'Tutor'}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="text-blue-400 text-sm hover:text-blue-300 transition-colors font-medium"
          >
            → Logout
          </button>
        </div>
      </div>
    </aside>
    </>
  )
}

export default Sidebar
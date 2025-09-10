import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  MdMenu, 
  MdClose, 
  MdDashboard, 
  MdSchool, 
  MdAnalytics, 
  MdPeople, 
  MdAttachMoney, 
  MdSupport,
  MdLogout
} from 'react-icons/md'

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
        {isOpen ? <MdClose className="w-6 h-6" /> : <MdMenu className="w-6 h-6" />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed w-56 bg-black border  min-h-screen p-4 border-r border-gray-800 shadow-xl z-50 transition-transform duration-300 ${
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
              ? 'text-white bg-gray-800 shadow-md border border-gray-600' 
              : 'text-gray-300 hover:text-white hover:bg-gray-800 hover:shadow-sm'
          }`}
        >
          <MdDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </Link>
        
        <Link 
          to="/courses" 
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive('/courses') 
              ? 'text-white bg-gray-800 shadow-md border border-gray-600' 
              : 'text-gray-300 hover:text-white hover:bg-gray-800 hover:shadow-sm'
          }`}
        >
          <MdSchool className="w-5 h-5" />
          <span className="font-medium">Courses</span>
        </Link>
        
        <Link 
          to="/quiz" 
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive('/quiz') 
              ? 'text-white bg-gray-800 shadow-md border border-gray-600' 
              : 'text-gray-300 hover:text-white hover:bg-gray-800 hover:shadow-sm'
          }`}
        >
          <MdAnalytics className="w-5 h-5" />
          <span className="font-medium">Quiz</span>
        </Link>
        
        <Link 
          to="/students-performance" 
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive('/students-performance') 
              ? 'text-white bg-gray-800 shadow-md border border-gray-600' 
              : 'text-gray-300 hover:text-white hover:bg-gray-800 hover:shadow-sm'
          }`}
        >
          <MdPeople className="w-5 h-5" />
          <span className="font-medium">Students</span>
        </Link>
        
        <Link 
          to="/earnings" 
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive('/earnings') 
              ? 'text-white bg-gray-800 shadow-md border border-gray-600' 
              : 'text-gray-300 hover:text-white hover:bg-gray-800 hover:shadow-sm'
          }`}
        >
          <MdAttachMoney className="w-5 h-5" />
          <span className="font-medium">Earnings</span>
        </Link>
        
        <Link 
          to="/support" 
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive('/support') 
              ? 'text-white bg-gray-800 shadow-md border border-gray-600' 
              : 'text-gray-300 hover:text-white hover:bg-gray-800 hover:shadow-sm'
          }`}
        >
          <MdSupport className="w-5 h-5" />
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
            className="text-gray-400 text-sm hover:text-white transition-colors font-medium flex items-center space-x-1"
          >
            <MdLogout className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
    </>
  )
}

export default Sidebar
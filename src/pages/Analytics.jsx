import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { courseService } from '../services/courses'
import Sidebar from '../components/Sidebar'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { 
  MdVisibility, 
  MdCheckCircle, 
  MdAccessTime, 
  MdStar,
  MdTrendingUp,
  MdAttachMoney,
  MdPeople,
  MdAnalytics
} from 'react-icons/md'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

function Analytics() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('30days')
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.id) {
      loadAnalyticsData()
    }
  }, [user])

  const loadAnalyticsData = async () => {
    try {
      setLoading(true)
      const response = await courseService.getTutorCourses(user.id)
      setCourses(response.courses || [])
    } catch (err) {
      console.error('Analytics data load error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Generate mock data for charts
  const generateEarningsData = () => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Earnings (₦)',
        data: [45000, 52000, 48000, 61000, 55000, 67000],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#10B981',
        pointBorderColor: '#10B981',
        pointHoverBackgroundColor: '#059669',
      },
    ],
  })

  const generateStudentsData = () => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Students',
        data: [12, 19, 15, 25, 22, 30],
        backgroundColor: '#3B82F6',
        borderColor: '#2563EB',
        borderWidth: 1,
        hoverBackgroundColor: '#2563EB',
      },
    ],
  })

  const generateRatingsData = () => ({
    labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
    datasets: [
      {
        data: [65, 25, 8, 2, 0],
        backgroundColor: [
          '#F59E0B',
          '#D97706',
          '#92400E',
          '#78350F',
          '#451A03',
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  })

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#9CA3AF',
        },
      },
      tooltip: {
        backgroundColor: '#374151',
        titleColor: '#FFFFFF',
        bodyColor: '#D1D5DB',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#6B7280',
        },
        grid: {
          color: '#374151',
        },
      },
      y: {
        ticks: {
          color: '#6B7280',
        },
        grid: {
          color: '#374151',
        },
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#9CA3AF',
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: '#374151',
        titleColor: '#FFFFFF',
        bodyColor: '#D1D5DB',
      },
    },
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 lg:ml-56 p-4 lg:p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-white mb-1">Analytics</h1>
            <p className="text-sm text-gray-400">Teaching performance insights</p>
          </div>

          {/* Time Period Selector */}
          <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg mb-6 w-fit">
            <button 
              onClick={() => setActiveTab('30days')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === '30days' 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              30 Days
            </button>
            <button 
              onClick={() => setActiveTab('3months')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === '3months' 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              3 Months
            </button>
            <button 
              onClick={() => setActiveTab('year')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'year' 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Year
            </button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-600/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-gray-400 text-xs">Total Views</p>
                  <p className="text-lg font-semibold text-white">12,847</p>
                </div>
                <div className="w-8 h-8 bg-blue-600/10 rounded-lg flex items-center justify-center border border-blue-600/20">
                  <MdVisibility className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <div className="text-green-400 text-xs flex items-center">
                <MdTrendingUp className="w-3 h-3 mr-1" />
                +15.2% vs last month
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-emerald-600/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-gray-400 text-xs">Completion Rate</p>
                  <p className="text-lg font-semibold text-white">87.3%</p>
                </div>
                <div className="w-8 h-8 bg-emerald-600/10 rounded-lg flex items-center justify-center border border-emerald-600/20">
                  <MdCheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <div className="text-green-400 text-xs flex items-center">
                <MdTrendingUp className="w-3 h-3 mr-1" />
                +4.1% vs last month
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-purple-600/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-gray-400 text-xs">Avg Watch Time</p>
                  <p className="text-lg font-semibold text-white">24m</p>
                </div>
                <div className="w-8 h-8 bg-purple-600/10 rounded-lg flex items-center justify-center border border-purple-600/20">
                  <MdAccessTime className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <div className="text-green-400 text-xs flex items-center">
                <MdTrendingUp className="w-3 h-3 mr-1" />
                +2.8% vs last month
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-yellow-600/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-gray-400 text-xs">Student Satisfaction</p>
                  <p className="text-lg font-semibold text-white">4.8/5</p>
                </div>
                <div className="w-8 h-8 bg-yellow-600/10 rounded-lg flex items-center justify-center border border-yellow-600/20">
                  <MdStar className="w-4 h-4 text-yellow-400" />
                </div>
              </div>
              <div className="text-yellow-400 text-xs flex items-center">
                <MdTrendingUp className="w-3 h-3 mr-1" />
                +0.2 vs last month
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Earnings Trend - Line Chart */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center space-x-2 mb-6">
                <MdAttachMoney className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-white">Earnings Trend</h3>
              </div>
              <div className="h-64">
                <Line data={generateEarningsData()} options={chartOptions} />
              </div>
            </div>

            {/* Student Enrollment - Bar Chart */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center space-x-2 mb-6">
                <MdPeople className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-white">Student Enrollment</h3>
              </div>
              <div className="h-64">
                <Bar data={generateStudentsData()} options={chartOptions} />
              </div>
            </div>

            {/* Rating Distribution - Pie Chart */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center space-x-2 mb-6">
                <MdStar className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-white">Rating Distribution</h3>
              </div>
              <div className="h-64">
                <Doughnut data={generateRatingsData()} options={doughnutOptions} />
              </div>
            </div>

            {/* Course Performance Summary */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center space-x-2 mb-6">
                <MdAnalytics className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-white">Course Performance</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Mathematics - WAEC</p>
                    <p className="text-gray-400 text-sm">89 students • 4.9★</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">₦125,000</p>
                    <p className="text-gray-400 text-sm flex items-center justify-end">
                      <MdTrendingUp className="w-3 h-3 mr-1" />
                      +18%
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Physics - JAMB</p>
                    <p className="text-gray-400 text-sm">67 students • 4.8★</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">₦98,500</p>
                    <p className="text-gray-400 text-sm flex items-center justify-end">
                      <MdTrendingUp className="w-3 h-3 mr-1" />
                      +12%
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Further Mathematics</p>
                    <p className="text-gray-400 text-sm">23 students • 4.7★</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">₦45,200</p>
                    <p className="text-gray-400 text-sm flex items-center justify-end">
                      <MdTrendingUp className="w-3 h-3 mr-1" />
                      +8%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

      
        </main>
      </div>
    </div>
  )
}

export default Analytics
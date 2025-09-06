import Sidebar from '../components/Sidebar'

function Analytics() {
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
          <div className="flex space-x-1 bg-gray-800 p-1 rounded mb-4 w-fit">
            <button className="px-3 py-1 bg-gray-700 text-white rounded text-sm font-medium">30 Days</button>
            <button className="px-3 py-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded text-sm font-medium">3 Months</button>
            <button className="px-3 py-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded text-sm font-medium">Year</button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-gray-400 text-xs">Total Views</p>
                  <p className="text-lg font-semibold text-white">12,847</p>
                </div>
                <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              <div className="text-gray-500 text-xs">+15.2% vs last month</div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Completion Rate</p>
                  <p className="text-3xl font-bold text-white">87.3%</p>
                </div>
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-green-400 text-sm">↗ +4.1% vs last month</div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Avg Watch Time</p>
                  <p className="text-3xl font-bold text-white">24m</p>
                </div>
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-green-400 text-sm">↗ +2.8% vs last month</div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Student Satisfaction</p>
                  <p className="text-3xl font-bold text-white">4.8/5</p>
                </div>
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div className="text-green-400 text-sm">↗ +0.2 vs last month</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6 lg:gap-8 mb-8">
            {/* Course Performance Chart */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-6">Course Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Mathematics - WAEC</p>
                    <p className="text-gray-400 text-sm">89 students • 4.9★</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">₦125,000</p>
                    <p className="text-gray-400 text-sm">+18%</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Physics - JAMB</p>
                    <p className="text-gray-400 text-sm">67 students • 4.8★</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">₦98,500</p>
                    <p className="text-gray-400 text-sm">+12%</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Further Mathematics</p>
                    <p className="text-gray-400 text-sm">23 students • 4.7★</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">₦45,200</p>
                    <p className="text-gray-400 text-sm">+8%</p>
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
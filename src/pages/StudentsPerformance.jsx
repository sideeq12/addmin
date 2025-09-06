import Sidebar from '../components/Sidebar'

function StudentsPerformance() {
  const students = [
    { id: 1, name: 'Adaora Mba', course: 'Mathematics - WAEC', progress: 85, grade: 'A', lastActive: '2 hours ago' },
    { id: 2, name: 'Kemi Johnson', course: 'Physics - JAMB', progress: 72, grade: 'B+', lastActive: '1 day ago' },
    { id: 3, name: 'Tunde Adebayo', course: 'Mathematics - WAEC', progress: 91, grade: 'A+', lastActive: '3 hours ago' },
    { id: 4, name: 'Fatima Ahmed', course: 'Further Mathematics', progress: 68, grade: 'B', lastActive: '2 days ago' },
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 ml-56 p-6">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-white mb-1">Students Performance</h1>
            <p className="text-sm text-gray-400">Track student progress and achievements</p>
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-800">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">78%</div>
                <p className="text-gray-400">Average Progress</p>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-800">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">4.6/5</div>
                <p className="text-gray-400">Average Grade</p>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-800">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">92%</div>
                <p className="text-gray-400">Completion Rate</p>
              </div>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-gray-800 rounded-lg border border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-xl font-semibold text-white">Student Progress</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {students.map(student => (
                    <tr key={student.id} className="hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {student.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{student.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{student.course}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{width: `${student.progress}%`}}></div>
                          </div>
                          <span className="text-sm text-gray-300">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          student.grade.startsWith('A') ? 'bg-green-600 text-white' :
                          student.grade.startsWith('B') ? 'bg-blue-600 text-white' :
                          'bg-yellow-600 text-white'
                        }`}>
                          {student.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{student.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default StudentsPerformance
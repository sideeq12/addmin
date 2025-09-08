import Sidebar from '../components/Sidebar'
import { 
  MdPeople,
  MdTrendingUp,
  MdSchool,
  MdStar,
  MdCheckCircle
} from 'react-icons/md'

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
        <main className="flex-1 lg:ml-56 pl-8 p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-white mb-1">Students Performance</h1>
            <p className="text-sm text-gray-400">Track student progress and achievements</p>
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-emerald-600/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-600/10 rounded-lg flex items-center justify-center border border-emerald-600/20">
                  <MdTrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-emerald-400">78%</div>
              </div>
              <p className="text-gray-400 text-center">Average Progress</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-yellow-600/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-600/10 rounded-lg flex items-center justify-center border border-yellow-600/20">
                  <MdStar className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold text-yellow-400">4.6/5</div>
              </div>
              <p className="text-gray-400 text-center">Average Grade</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-600/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center border border-blue-600/20">
                  <MdCheckCircle className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-blue-400">92%</div>
              </div>
              <p className="text-gray-400 text-center">Completion Rate</p>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <MdSchool className="w-5 h-5 text-gray-400" />
                <h3 className="text-xl font-semibold text-white">Student Progress</h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Student</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell">Course</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Progress</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Grade</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden lg:table-cell">Last Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {students.map(student => (
                    <tr key={student.id} className="hover:bg-gray-700/50">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-600/10 rounded-full flex items-center justify-center border border-blue-600/20">
                            <MdPeople className="w-5 h-5 text-blue-400" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{student.name}</div>
                            <div className="text-xs text-gray-400 sm:hidden">{student.course}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-300 hidden sm:table-cell">{student.course}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-12 sm:w-16 bg-gray-700 rounded-full h-2 mr-2">
                            <div className="bg-emerald-600 h-2 rounded-full" style={{width: `${student.progress}%`}}></div>
                          </div>
                          <span className="text-sm text-gray-300">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          student.grade.startsWith('A') ? 'bg-green-600 text-white' :
                          student.grade.startsWith('B') ? 'bg-blue-600 text-white' :
                          'bg-yellow-600 text-white'
                        }`}>
                          {student.grade}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-400 hidden lg:table-cell">{student.lastActive}</td>
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
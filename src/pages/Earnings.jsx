import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { 
  MdAttachMoney,
  MdTrendingUp,
  MdAccountBalance,
  MdHistory
} from 'react-icons/md'

function Earnings() {
  const transactions = [
    { id: 1, type: 'Course Sale', course: 'Mathematics - WAEC', amount: 15000, date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'Course Sale', course: 'Physics - JAMB', amount: 12000, date: '2024-01-14', status: 'completed' },
    { id: 3, type: 'Payout', course: 'Monthly Payout', amount: -85000, date: '2024-01-10', status: 'completed' },
    { id: 4, type: 'Course Sale', course: 'Further Mathematics', amount: 18000, date: '2024-01-08', status: 'pending' },
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 lg:ml-56 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-semibold text-white mb-1">Earnings</h1>
            <p className="text-sm text-gray-400">Track your income and payouts</p>
          </div>

          {/* Earnings Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-700 hover:border-emerald-600/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600/10 rounded-lg flex items-center justify-center border border-emerald-600/20">
                  <MdTrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400">₦425K</div>
                  <p className="text-gray-400 text-xs sm:text-sm">This Month</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-700 hover:border-blue-600/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/10 rounded-lg flex items-center justify-center border border-blue-600/20">
                  <MdAttachMoney className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">₦65K</div>
                  <p className="text-gray-400 text-xs sm:text-sm">Available</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-700 hover:border-purple-600/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/10 rounded-lg flex items-center justify-center border border-purple-600/20">
                  <MdAccountBalance className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-bold text-purple-400">₦1.2M</div>
                  <p className="text-gray-400 text-xs sm:text-sm">Total Earned</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payout Section */}
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-700 hover:border-emerald-600/50 transition-colors mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <MdAccountBalance className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">Ready for Payout</h3>
              </div>
              <button className="w-full sm:w-auto bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 border border-emerald-600/30 hover:border-emerald-600/50 px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-center">
                Request Payout
              </button>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-400">₦65,000</div>
                <p className="text-gray-400 text-xs sm:text-sm">Next payout in 5 days</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-gray-400 text-xs sm:text-sm">GTB ****1234</p>
                <Link to="#" className="text-blue-400 text-xs sm:text-sm hover:underline">Update</Link>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-4 sm:p-6 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <MdHistory className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">Recent Transactions</h3>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {transactions.slice(0, 3).map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-3 sm:p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      transaction.type === 'Course Sale' ? 'bg-emerald-600/10 border border-emerald-600/20' : 'bg-blue-600/10 border border-blue-600/20'
                    }`}>
                      <MdAttachMoney className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        transaction.type === 'Course Sale' ? 'text-emerald-400' : 'text-blue-400'
                      }`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-medium text-sm sm:text-base truncate">{transaction.course}</p>
                      <p className="text-gray-400 text-xs sm:text-sm">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right ml-3 flex-shrink-0">
                    <p className={`font-semibold text-sm sm:text-base ${
                      transaction.amount > 0 ? 'text-emerald-400' : 'text-blue-400'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}₦{Math.abs(transaction.amount).toLocaleString()}
                    </p>
                    <p className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'completed' ? 'text-emerald-400' : 'text-yellow-400'
                    }`}>
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))}
              <Link to="#" className="block text-center text-blue-400 hover:text-blue-300 text-sm font-medium mt-4">
                View All Transactions →
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Earnings
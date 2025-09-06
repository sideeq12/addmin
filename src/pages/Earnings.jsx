import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

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
        <main className="flex-1 lg:ml-56 p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-white mb-1">Earnings</h1>
            <p className="text-sm text-gray-400">Track your income and payouts</p>
          </div>

          {/* Earnings Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded border border-gray-800">
              <div className="text-center">
                <div className="text-lg font-semibold text-white mb-1">₦425K</div>
                <p className="text-xs text-gray-400">This Month</p>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-800">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">₦65K</div>
                <p className="text-gray-400">Pending</p>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-800">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">₦1.2M</div>
                <p className="text-gray-400">Total Earned</p>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-800">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">15%</div>
                <p className="text-gray-400">Platform Fee</p>
              </div>
            </div>
          </div>

          {/* Payout Section */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-800 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h3 className="text-xl font-semibold text-white">Available for Payout</h3>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">
                Request Payout
              </button>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="text-2xl font-bold text-green-400">₦65,000</div>
                <p className="text-gray-400 text-sm">Next payout in 5 days</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">Bank Account: GTB ****1234</p>
                <Link to="#" className="text-blue-400 text-sm hover:underline">Update payment method</Link>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-gray-800 rounded-lg border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-xl font-semibold text-white">Transaction History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Type</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase hidden sm:table-cell">Description</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Amount</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase hidden md:table-cell">Date</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {transactions.map(transaction => (
                    <tr key={transaction.id} className="hover:bg-gray-700/50">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            transaction.type === 'Course Sale' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                          }`}>
                            {transaction.type}
                          </span>
                          <div className="text-xs text-gray-400 mt-1 sm:hidden">{transaction.course}</div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-300 hidden sm:table-cell">{transaction.course}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-semibold ${
                          transaction.amount > 0 ? 'text-green-400' : 'text-blue-400'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}₦{Math.abs(transaction.amount).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-400 hidden md:table-cell">{transaction.date}</td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
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

export default Earnings
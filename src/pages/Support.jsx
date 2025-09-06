import { Link } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'

function Support() {
  const [selectedCategory, setSelectedCategory] = useState('technical')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Support ticket submitted successfully!')
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 ml-56 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Contact Support</h1>
            <p className="text-base text-gray-400">Get help from our support team</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Support Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-6">Submit a Support Request</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="technical">Technical Issues</option>
                      <option value="payment">Payment & Billing</option>
                      <option value="course">Course Management</option>
                      <option value="account">Account Settings</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Please provide detailed information about your issue..."
                      required
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                  >
                    Submit Support Request
                  </button>
                </form>
              </div>
            </div>

            {/* Support Info */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">📧 Email Support</h4>
                    <p className="text-gray-400 text-sm">support@scholarbase.ng</p>
                    <p className="text-gray-400 text-sm">Response within 24 hours</p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-2">📞 Phone Support</h4>
                    <p className="text-gray-400 text-sm">+234 901 234 5678</p>
                    <p className="text-gray-400 text-sm">Mon-Fri, 9AM-6PM WAT</p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-2">💬 Live Chat</h4>
                    <p className="text-gray-400 text-sm">Available on website</p>
                    <p className="text-gray-400 text-sm">Mon-Fri, 9AM-6PM WAT</p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white text-sm font-medium mb-1">How do I upload a new course?</h4>
                    <p className="text-gray-400 text-sm">Go to Courses > Create New Course and follow the step-by-step guide.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-white text-sm font-medium mb-1">When do I receive payments?</h4>
                    <p className="text-gray-400 text-sm">Payments are processed weekly every Friday for completed courses.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-white text-sm font-medium mb-1">How to change my payout method?</h4>
                    <p className="text-gray-400 text-sm">Visit Earnings section to update your bank account details.</p>
                  </div>
                </div>
                
                <Link to="/guide" className="inline-block mt-4 text-blue-400 text-sm hover:underline">
                  View full documentation →
                </Link>
              </div>

              {/* Status */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Platform Status</span>
                    <span className="flex items-center text-green-400 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      Operational
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Payment System</span>
                    <span className="flex items-center text-green-400 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      Operational
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Video Streaming</span>
                    <span className="flex items-center text-green-400 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      Operational
                    </span>
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

export default Support
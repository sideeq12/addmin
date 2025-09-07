import { Link } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { 
  MdSupport,
  MdEmail,
  MdPhone,
  MdChat,
  MdHelpOutline,
  MdCheckCircle,
  MdSend
} from 'react-icons/md'

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
        <main className="flex-1 lg:ml-56 p-4 lg:p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Contact Support</h1>
            <p className="text-base text-gray-400">Get help from our support team</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Support Form */}
            <div className="order-2 lg:order-1 lg:col-span-2">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-600/50 transition-colors">
                <div className="flex items-center space-x-2 mb-6">
                  <MdSupport className="w-5 h-5 text-gray-400" />
                  <h3 className="text-xl font-semibold text-white">Submit a Support Request</h3>
                </div>
                
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
                    className="w-full bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 border border-blue-600/30 hover:border-blue-600/50 py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <MdSend className="w-4 h-4" />
                    <span>Submit Support Request</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Support Info */}
            <div className="order-1 lg:order-2 space-y-4 lg:space-y-6">
              {/* Contact Information */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-600/50 transition-colors">
                <div className="flex items-center space-x-2 mb-4">
                  <MdPhone className="w-5 h-5 text-gray-400" />
                  <h3 className="text-lg font-semibold text-white">Contact Information</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-blue-600/10 rounded-lg border border-blue-600/20">
                    <MdEmail className="w-5 h-5 text-blue-400 mt-1" />
                    <div>
                      <h4 className="text-white font-medium mb-1">Email Support</h4>
                      <p className="text-gray-400 text-sm">support@scholarbase.ng</p>
                      <p className="text-gray-400 text-sm">Response within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-emerald-600/10 rounded-lg border border-emerald-600/20">
                    <MdPhone className="w-5 h-5 text-emerald-400 mt-1" />
                    <div>
                      <h4 className="text-white font-medium mb-1">Phone Support</h4>
                      <p className="text-gray-400 text-sm">+234 901 234 5678</p>
                      <p className="text-gray-400 text-sm">Mon-Fri, 9AM-6PM WAT</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-purple-600/10 rounded-lg border border-purple-600/20">
                    <MdChat className="w-5 h-5 text-purple-400 mt-1" />
                    <div>
                      <h4 className="text-white font-medium mb-1">Live Chat</h4>
                      <p className="text-gray-400 text-sm">Available on website</p>
                      <p className="text-gray-400 text-sm">Mon-Fri, 9AM-6PM WAT</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-yellow-600/50 transition-colors">
                <div className="flex items-center space-x-2 mb-4">
                  <MdHelpOutline className="w-5 h-5 text-gray-400" />
                  <h3 className="text-lg font-semibold text-white">Frequently Asked Questions</h3>
                </div>
                
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
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-emerald-600/50 transition-colors">
                <div className="flex items-center space-x-2 mb-4">
                  <MdCheckCircle className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-semibold text-white">System Status</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-emerald-600/10 rounded-lg">
                    <span className="text-gray-300 text-sm">Platform Status</span>
                    <span className="flex items-center text-emerald-400 text-sm">
                      <MdCheckCircle className="w-4 h-4 mr-1" />
                      Operational
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-emerald-600/10 rounded-lg">
                    <span className="text-gray-300 text-sm">Payment System</span>
                    <span className="flex items-center text-emerald-400 text-sm">
                      <MdCheckCircle className="w-4 h-4 mr-1" />
                      Operational
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-emerald-600/10 rounded-lg">
                    <span className="text-gray-300 text-sm">Video Streaming</span>
                    <span className="flex items-center text-emerald-400 text-sm">
                      <MdCheckCircle className="w-4 h-4 mr-1" />
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
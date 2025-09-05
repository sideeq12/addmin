import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Join TutorBase</h2>
          <p className="mt-2 text-gray-400">Start teaching and earning today</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <form className="space-y-6">
            {/* Personal Information */}
            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+234 801 234 5678"
                  />
                </div>
              </div>
            </div>

            {/* Teaching Information */}
            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Teaching Information</h3>
              
              <div>
                <label htmlFor="subjects" className="block text-sm font-medium text-gray-300 mb-2">
                  Subjects You Can Teach *
                </label>
                <select
                  id="subjects"
                  name="subjects"
                  multiple
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  size="6"
                >
                  <option value="mathematics">Mathematics</option>
                  <option value="english">English Language</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="biology">Biology</option>
                  <option value="economics">Economics</option>
                  <option value="geography">Geography</option>
                  <option value="government">Government</option>
                  <option value="literature">Literature</option>
                  <option value="agricultural-science">Agricultural Science</option>
                  <option value="further-mathematics">Further Mathematics</option>
                  <option value="technical-drawing">Technical Drawing</option>
                  <option value="computer-studies">Computer Studies</option>
                  <option value="civic-education">Civic Education</option>
                  <option value="history">History</option>
                </select>
                <p className="text-xs text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple subjects</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
                    Teaching Experience
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1">0-1 years</option>
                    <option value="2-5">2-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-gray-300 mb-2">
                    Highest Education Level
                  </label>
                  <select
                    id="education"
                    name="education"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select education level</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="phd">Ph.D</option>
                    <option value="professional">Professional Certificate</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
                  Brief Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your teaching background and expertise..."
                />
              </div>
            </div>

            {/* Account Security */}
            <div className="border-b border-gray-700 pb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Account Security</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password *
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Create a strong password"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div>
              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 mt-1"
                />
                <label htmlFor="terms" className="ml-3 text-sm text-gray-300">
                  I agree to the{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <div className="flex items-start mt-3">
                <input
                  id="marketing"
                  name="marketing"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 mt-1"
                />
                <label htmlFor="marketing" className="ml-3 text-sm text-gray-300">
                  I would like to receive updates about new features and opportunities
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Create Tutor Account
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* What happens next */}
        <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-3">What happens next?</h3>
          <ol className="space-y-2 text-sm text-gray-300">
            <li>1. We'll review your application within 24-48 hours</li>
            <li>2. You'll receive an email with verification instructions</li>
            <li>3. Complete your profile and upload sample content</li>
            <li>4. Start teaching and earning immediately after approval</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default Signup
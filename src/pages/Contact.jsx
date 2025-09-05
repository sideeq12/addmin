import { Link } from 'react-router-dom'

function Contact() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-gray-400">
            Get in touch with our team or find what you're looking for
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Get In Touch</h2>
            
            <div className="space-y-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">📧 Email Support</h3>
                <div className="space-y-2">
                  <p className="text-gray-300">
                    <strong>General Inquiries:</strong> <a href="mailto:info@tutorbase.ng" className="text-blue-400 hover:text-blue-300">info@tutorbase.ng</a>
                  </p>
                  <p className="text-gray-300">
                    <strong>Tutor Support:</strong> <a href="mailto:tutors@tutorbase.ng" className="text-blue-400 hover:text-blue-300">tutors@tutorbase.ng</a>
                  </p>
                  <p className="text-gray-300">
                    <strong>Technical Issues:</strong> <a href="mailto:tech@tutorbase.ng" className="text-blue-400 hover:text-blue-300">tech@tutorbase.ng</a>
                  </p>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">📞 Phone Support</h3>
                <p className="text-gray-300">
                  <strong>Support Line:</strong> <a href="tel:+2349012345678" className="text-blue-400 hover:text-blue-300">+234 901 234 5678</a>
                </p>
                <p className="text-gray-300 text-sm mt-2">
                  Available Monday - Friday, 9:00 AM - 6:00 PM (WAT)
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">🏢 Office Address</h3>
                <p className="text-gray-300">
                  TutorBase Nigeria<br />
                  Plot 123, Education Avenue<br />
                  Victoria Island, Lagos<br />
                  Nigeria
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">🌐 Social Media</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Facebook</a>
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Twitter</a>
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">LinkedIn</a>
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Instagram</a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-gray-800 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="tutor-support">Tutor Support</option>
                    <option value="technical">Technical Issue</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Site Map Section */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Site Map</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Main Pages</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">Homepage</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link to="/guide" className="text-gray-300 hover:text-blue-400 transition-colors">Tutor Guide</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Account</h3>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-gray-300 hover:text-blue-400 transition-colors">Sign In</Link></li>
                <li><Link to="/signup" className="text-gray-300 hover:text-blue-400 transition-colors">Create Account</Link></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Forgot Password</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Profile Settings</a></li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Tutorial Videos</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Best Practices</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Content Guidelines</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="bg-gray-800 rounded-lg">
              <button className="w-full p-6 text-left focus:outline-none">
                <h3 className="text-lg font-semibold text-white">How do I become a verified tutor?</h3>
              </button>
              <div className="px-6 pb-6">
                <p className="text-gray-300">Complete your profile, submit your educational credentials, and pass our verification process. This typically takes 2-3 business days.</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg">
              <button className="w-full p-6 text-left focus:outline-none">
                <h3 className="text-lg font-semibold text-white">What equipment do I need to start teaching?</h3>
              </button>
              <div className="px-6 pb-6">
                <p className="text-gray-300">You need a good camera (1080p minimum), clear audio setup, stable internet, and a quiet teaching environment. Check our Guide page for detailed requirements.</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg">
              <button className="w-full p-6 text-left focus:outline-none">
                <h3 className="text-lg font-semibold text-white">How much can I earn as a tutor?</h3>
              </button>
              <div className="px-6 pb-6">
                <p className="text-gray-300">Earnings vary based on your subjects, content quality, and student engagement. Top tutors earn ₦300,000 - ₦800,000 monthly. You set your own rates.</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg">
              <button className="w-full p-6 text-left focus:outline-none">
                <h3 className="text-lg font-semibold text-white">What subjects can I teach?</h3>
              </button>
              <div className="px-6 pb-6">
                <p className="text-gray-300">We cover all WAEC, JAMB, and NECO subjects including Mathematics, English, Sciences, Arts, and Commercial subjects. You can teach multiple subjects if qualified.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
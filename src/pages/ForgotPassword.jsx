import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authService } from '../services/auth'
import { MdEmail, MdArrowBack, MdCheck } from 'react-icons/md'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState('tutor')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setError('Email is required')
      return
    }

    try {
      setLoading(true)
      setError('')
      
      await authService.forgotPassword(email, userType)
      setSuccess(true)
    } catch (err) {
      console.error('Forgot password error:', err)
      setError(err.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
              <MdCheck className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Check Your Email</h2>
            <p className="text-gray-400 mb-6">
              We've sent a password reset link to <strong className="text-white">{email}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Check your email and click the reset link to create a new password. 
              If you don't see the email, check your spam folder.
            </p>
            
            <div className="space-y-4">
              <Link
                to="/tutor/signin"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Back to Sign In
              </Link>
              
              <button
                onClick={() => setSuccess(false)}
                className="w-full text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                Try different email
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link
            to="/tutor/signin"
            className="flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
          >
            <MdArrowBack className="w-4 h-4 mr-2" />
            Back to Sign In
          </Link>
          
          <h2 className="text-center text-3xl font-bold text-white">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your tutor email address and we'll send you a reset link
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdEmail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Remember your password?{' '}
              <Link
                to="/tutor/signin"
                className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
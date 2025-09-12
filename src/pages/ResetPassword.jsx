import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { authService } from '../services/auth'
import { MdLock, MdVisibility, MdVisibilityOff, MdCheck } from 'react-icons/md'

function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [userType] = useState('tutor')
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    // Extract JWT token from URL fragment (hash) - new method
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const jwtToken = urlParams.get('access_token');
    
    console.log('🔗 Password reset page loaded:');
    console.log('🌐 Full URL:', window.location.href);
    console.log('🔗 Hash params:', window.location.hash);
    console.log('🎫 JWT Token found:', jwtToken ? 'YES' : 'NO');
    console.log('👤 User type: tutor (fixed)');
    
    if (jwtToken) {
      setToken(jwtToken);
      console.log('✅ JWT token set:', jwtToken.substring(0, 20) + '...');
    } else {
      console.log('❌ No JWT token found in URL fragment');
      setError('Invalid reset link. Please request a new password reset.');
    }
  }, [searchParams])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.password || !formData.confirmPassword) {
      setError('All fields are required')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    if (!token) {
      setError('Invalid reset token')
      return
    }

    try {
      setLoading(true)
      setError('')
      
      console.log('🚀 Submitting password reset with:', {
        userType,
        hasToken: !!token,
        passwordLength: formData.password.length
      });
      
      await authService.resetPassword(token, formData.password, userType)
      setSuccess(true)
      
      console.log('✅ Password reset successful, redirecting...');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (err) {
      console.error('❌ Reset password error:', err)
      setError(err.message || 'Failed to reset password')
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
            <h2 className="text-3xl font-bold text-white mb-2">Password Reset Successfully</h2>
            <p className="text-gray-400 mb-6">
              Your password has been reset successfully. You can now sign in with your new password.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Redirecting to sign in page in a few seconds...
            </p>
            
            <Link
              to="/login"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Go to Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your new password below. Your email will be automatically detected from the reset link.
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="appearance-none relative block w-full pl-10 pr-10 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="New password (min 6 characters)"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <MdVisibilityOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  ) : (
                    <MdVisibility className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  )}
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="appearance-none relative block w-full pl-10 pr-10 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <MdVisibilityOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  ) : (
                    <MdVisibility className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !token}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Remember your password?{' '}
              <Link
                to="/login"
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

export default ResetPassword
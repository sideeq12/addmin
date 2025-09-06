import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function Signup() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { signup } = useAuth()
  
  const subjectOptions = [
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'English Language', label: 'English Language' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Biology', label: 'Biology' },
    { value: 'Economics', label: 'Economics' },
    { value: 'Geography', label: 'Geography' },
    { value: 'Government', label: 'Government' },
    { value: 'Literature', label: 'Literature in English' },
    { value: 'Agricultural Science', label: 'Agricultural Science' },
    { value: 'Further Mathematics', label: 'Further Mathematics' },
    { value: 'Technical Drawing', label: 'Technical Drawing' },
    { value: 'Computer Studies', label: 'Computer Studies' },
    { value: 'Civic Education', label: 'Civic Education' },
    { value: 'History', label: 'History' }
  ]
  
  const qualificationOptions = [
    { value: 'SSCE', label: 'SSCE/WAEC/NECO' },
    { value: 'OND', label: 'OND (Ordinary National Diploma)' },
    { value: 'HND', label: 'HND (Higher National Diploma)' },
    { value: 'NCE', label: 'NCE (Nigeria Certificate in Education)' },
    { value: 'Bachelor', label: "Bachelor's Degree (B.Sc/B.A/B.Ed)" },
    { value: 'Master', label: "Master's Degree (M.Sc/M.A/M.Ed)" },
    { value: 'PhD', label: 'PhD (Doctor of Philosophy)' },
    { value: 'Other', label: 'Other Professional Certification' }
  ]
  const [formData, setFormData] = useState({
    // Step 1 - Basic Information
    first_name: '',
    last_name: '',
    email: '',
    display_name: '',
    
    // Step 2 - Account & Expertise  
    expertise: '',
    highest_qualification: '',
    password: '',
    confirm_password: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const nextStep = () => {
    setCurrentStep(2)
  }

  const prevStep = () => {
    setCurrentStep(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Password validation
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match!')
      return
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long!')
      return
    }

    if (!formData.expertise) {
      setError('Please select your subject expertise!')
      return
    }
    
    setLoading(true)

    try {
      await signup({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        expertise: formData.expertise,
        display_name: formData.display_name || undefined,
        // Add additional fields as needed for the API
        bio: '', // Default empty bio
        experience_years: 0, // Default to 0, can be updated later
      }, 'tutor')
      
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stripes-diagonal-reverse">
      <div className="grid md:grid-cols-2">
        <div className='col-span-1 py-4 px-8 text-left'>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Join Scholarbase</h2>
            <p className="mt-2 text-gray-400">Start teaching and earning today</p>
            
            {/* Step Indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-400' : 'text-gray-500'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'}`}>
                    1
                  </div>
                  <span className="ml-2 text-sm">Basic Info</span>
                </div>
                <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-600'}`}></div>
                <div className={`flex items-center ${currentStep >= 2 ? 'text-blue-400' : 'text-gray-500'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'}`}>
                    2
                  </div>
                  <span className="ml-2 text-sm">Account Setup</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-stripes-horizontal rounded-lg shadow-lg p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-600/20 border border-red-600/50 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">Basic Information</h3>
                  
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-300 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="display_name" className="block text-sm font-medium text-gray-300 mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        id="display_name"
                        name="display_name"
                        value={formData.display_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="How you'd like to be known (optional)"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      Next Step →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Account Setup & Expertise */}
              {currentStep === 2 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">Account Setup & Expertise</h3>
                  
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Subject Expertise *
                        </label>
                        <Select
                          value={formData.expertise}
                          onValueChange={(value) => setFormData({...formData, expertise: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your primary expertise" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjectOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Highest Qualification *
                        </label>
                        <Select
                          value={formData.highest_qualification}
                          onValueChange={(value) => setFormData({...formData, highest_qualification: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your qualification" />
                          </SelectTrigger>
                          <SelectContent>
                            {qualificationOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                          Password *
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Create a strong password"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-300 mb-2">
                          Confirm Password *
                        </label>
                        <input
                          type="password"
                          id="confirm_password"
                          name="confirm_password"
                          value={formData.confirm_password}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Confirm your password"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      ← Previous
                    </button>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        <div className='col-span-1 relative overflow-hidden'>
          <img 
            src="/class.avif" 
            alt="Students learning" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-3xl font-bold text-white mb-4">Join Thousands of Successful Tutors</h3>
              <p className="text-xl text-blue-100">Start earning from your expertise today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
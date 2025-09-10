import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { quizService } from '../services/quiz'
import Sidebar from '../components/Sidebar'
import { 
  MdAdd,
  MdQuiz,
  MdEdit,
  MdDelete,
  MdPublish,
  MdVisibility,
  MdRefresh,
  MdClose,
  MdSave,
  MdRemove,
  MdCheck,
  MdAccessTime,
  MdPeople,
  MdAssignment,
  MdPreview,
  MdPlayArrow,
  MdScore,
  MdGrade
} from 'react-icons/md'

function Quiz() {
  const { user, refreshUserDetails } = useAuth()
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [questions, setQuestions] = useState([])

  // Form states
  const [quizForm, setQuizForm] = useState({
    title: '',
    description: '',
    time_limit: '',
    passing_score: 70,
    max_attempts: 3,
    is_published: false
  })

  const [questionForm, setQuestionForm] = useState({
    question: '',
    options: ['', ''],
    correct_answer: "",
    explanation: '',
    points: 1
  })

  const [showPreview, setShowPreview] = useState(false)
  const [showSubmissions, setShowSubmissions] = useState(false)
  const [submissions, setSubmissions] = useState([])

  useEffect(() => {
    if (user?.id) {
      loadQuizData()
    }
  }, [user])

  const loadQuizData = async () => {
    try {
      setLoading(true)
      
      // Load standalone quizzes (no course dependency)
      const quizzesResponse = await quizService.getTutorQuizzes(user.id)
      const quizzesWithCounts = quizzesResponse.quizzes || []
      
      // Fetch question count and submission count for each quiz
      for (let quiz of quizzesWithCounts) {
        try {
          const questionsResponse = await quizService.getQuizQuestions(quiz.id)
          quiz.question_count = questionsResponse.questions?.length || 0
        } catch (error) {
          console.log(`Could not fetch questions for quiz ${quiz.id}:`, error)
          quiz.question_count = 0
        }
        
        try {
          const submissionsResponse = await quizService.getQuizSubmissions(quiz.id)
          quiz.submission_count = submissionsResponse.submissions?.length || 0
        } catch (error) {
          console.log(`Could not fetch submissions for quiz ${quiz.id}:`, error)
          quiz.submission_count = 0
        }
      }
      
      setQuizzes(quizzesWithCounts)
      
      console.log('🧠 Quiz data loaded:', { quizzes: quizzesWithCounts?.length })
    } catch (err) {
      console.error('Quiz data load error:', err)
      setError('Failed to load quiz data')
    } finally {
      setLoading(false)
    }
  }

  const handleRefreshQuizzes = async () => {
    try {
      setError('')
      console.log('🔄 Refreshing quiz data...')
      await refreshUserDetails()
      loadQuizData()
      console.log('✅ Quiz data refresh complete!')
    } catch (err) {
      console.error('❌ Quiz refresh error:', err)
      setError('Failed to refresh quiz data')
    }
  }

  const handleCreateQuiz = async (e) => {
    e.preventDefault()
    
    // Form validation
    if (quizForm.title.length < 3) {
      setError('Quiz title must be at least 3 characters')
      return
    }
    
    try {
      setLoading(true)
      console.log('🧠 Creating quiz:', quizForm)
      
      // Prepare data with proper types
      const quizData = {
        ...quizForm,
        time_limit: quizForm.time_limit ? parseInt(quizForm.time_limit) : null,
        passing_score: parseInt(quizForm.passing_score),
        max_attempts: parseInt(quizForm.max_attempts)
      }
      
      await quizService.createQuiz(quizData)
      
      // Reset form and reload data
      setQuizForm({
        title: '',
        description: '',
        time_limit: '',
        passing_score: 70,
        max_attempts: 3,
        is_published: false
      })
      setShowCreateModal(false)
      setError('')
      loadQuizData()
      
      console.log('✅ Quiz created successfully!')
    } catch (err) {
      console.error('❌ Create quiz error:', err)
      setError('Failed to create quiz')
    } finally {
      setLoading(false)
    }
  }

  const handlePublishQuiz = async (quizId, currentStatus) => {
    try {
      if (currentStatus) {
        await quizService.unpublishQuiz(quizId)
        console.log('📝 Quiz unpublished')
      } else {
        await quizService.publishQuiz(quizId)
        console.log('📢 Quiz published')
      }
      loadQuizData()
    } catch (err) {
      console.error('Publish/unpublish error:', err)
      setError('Failed to update quiz status')
    }
  }

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await quizService.deleteQuiz(quizId)
        loadQuizData()
        console.log('🗑️ Quiz deleted')
      } catch (err) {
        console.error('Delete quiz error:', err)
        setError('Failed to delete quiz')
      }
    }
  }

  const openQuestionModal = async (quiz) => {
    try {
      setSelectedQuiz(quiz)
      const questionsResponse = await quizService.getQuizQuestions(quiz.id)
      setQuestions(questionsResponse.questions || [])
      setShowQuestionModal(true)
    } catch (err) {
      console.error('Load questions error:', err)
      setError('Failed to load questions')
    }
  }

  const handleAddQuestion = async (e) => {
    e.preventDefault()
    
    // Form validation
    if (questionForm.question.length < 5) {
      setError('Question must be at least 5 characters')
      return
    }
    
    const filledOptions = questionForm.options.filter(opt => opt.trim())
    if (filledOptions.length < 2) {
      setError('At least 2 answer options are required')
      return
    }
    
    if (questionForm.correct_answer === "" || questionForm.correct_answer >= filledOptions.length) {
      setError('Please select a valid correct answer')
      return
    }
    
    try {
      const questionData = {
        ...questionForm,
        options: filledOptions,
        correct_answer: filledOptions[questionForm.correct_answer], // Convert index to actual answer text
        points: parseInt(questionForm.points)
      }
      
      await quizService.addQuestion(selectedQuiz.id, questionData)
      
      // Reset form and reload questions
      setQuestionForm({
        question: '',
        options: ['', ''],
        correct_answer: "",
        explanation: '',
        points: 1
      })
      
      // Reload questions
      const questionsResponse = await quizService.getQuizQuestions(selectedQuiz.id)
      setQuestions(questionsResponse.questions || [])
      setError('')
      
      console.log('✅ Question added successfully!')
    } catch (err) {
      console.error('❌ Add question error:', err)
      setError('Failed to add question')
    }
  }

  const addOption = () => {
    if (questionForm.options.length < 6) {
      setQuestionForm({
        ...questionForm,
        options: [...questionForm.options, '']
      })
    }
  }

  const removeOption = (index) => {
    if (questionForm.options.length > 2) {
      const newOptions = questionForm.options.filter((_, i) => i !== index)
      const newCorrectAnswer = questionForm.correct_answer >= index ? 
        Math.max(0, questionForm.correct_answer - 1) : questionForm.correct_answer
      
      setQuestionForm({
        ...questionForm,
        options: newOptions,
        correct_answer: newCorrectAnswer
      })
    }
  }

  const viewSubmissions = async (quiz) => {
    try {
      const submissionsResponse = await quizService.getQuizSubmissions(quiz.id)
      setSubmissions(submissionsResponse.submissions || [])
      setSelectedQuiz(quiz)
      setShowSubmissions(true)
    } catch (err) {
      console.error('Load submissions error:', err)
      setError('Failed to load submissions')
    }
  }

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await quizService.deleteQuestion(selectedQuiz.id, questionId)
        
        // Reload questions
        const questionsResponse = await quizService.getQuizQuestions(selectedQuiz.id)
        setQuestions(questionsResponse.questions || [])
        
        console.log('🗑️ Question deleted')
      } catch (err) {
        console.error('Delete question error:', err)
        setError('Failed to delete question')
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading quizzes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 lg:ml-56 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl sm:text-2xl font-semibold text-white">My Quizzes</h1>
              <div className="flex space-x-3">
                <button
                  onClick={handleRefreshQuizzes}
                  className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                  disabled={loading}
                >
                  <MdRefresh className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                >
                  <MdAdd className="w-4 h-4" />
                  <span>+ Create New Quiz</span>
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-400">Create and manage standalone quizzes</p>
            {error && (
              <div className="mt-3 p-3 bg-red-600/20 border border-red-600/50 rounded">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Quizzes List */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <div key={quiz.id} className="bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <MdQuiz className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        <h3 className="text-lg font-semibold text-white truncate">{quiz.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          quiz.is_published 
                            ? 'bg-green-600/20 text-green-400 border border-green-600/50'
                            : 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/50'
                        }`}>
                          {quiz.is_published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-3">{quiz.description || 'No description'}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                        <div className="flex items-center space-x-1">
                          <MdAccessTime className="w-4 h-4" />
                          <span>{quiz.time_limit} min</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MdCheck className="w-4 h-4" />
                          <span>{quiz.passing_score}% to pass</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MdAssignment className="w-4 h-4" />
                          <span>{quiz.question_count || 0} questions</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MdPeople className="w-4 h-4" />
                          <span>{quiz.submission_count || 0} submissions</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 ml-4">
                      <button
                        onClick={() => openQuestionModal(quiz)}
                        className="flex items-center space-x-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                      >
                        <MdEdit className="w-4 h-4" />
                        <span>Questions</span>
                      </button>
                      
                      <button
                        onClick={() => setSelectedQuiz(quiz) || setShowPreview(true)}
                        className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                      >
                        <MdPreview className="w-4 h-4" />
                        <span>Preview</span>
                      </button>
                      
                      <button
                        onClick={() => viewSubmissions(quiz)}
                        className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                      >
                        <MdScore className="w-4 h-4" />
                        <span>Submissions</span>
                      </button>
                      
                      <button
                        onClick={() => handlePublishQuiz(quiz.id, quiz.is_published)}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors text-sm ${
                          quiz.is_published
                            ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        <MdPublish className="w-4 h-4" />
                        <span>{quiz.is_published ? 'Unpublish' : 'Publish'}</span>
                      </button>
                      
                      <button
                        onClick={() => handleDeleteQuiz(quiz.id)}
                        className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                      >
                        <MdDelete className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 text-center">
                <MdQuiz className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No Quizzes Yet</h3>
                <p className="text-gray-400 mb-4">Create your first standalone quiz to get started</p>
                
                {/* Backend Status Info */}
                <div className="mb-4 p-3 bg-green-600/10 border border-green-600/30 rounded-lg">
                  <p className="text-green-400 text-sm">
                    ✅ <strong>Backend Status:</strong> Quiz endpoints are working!<br/>
                    Ready to create your first quiz.
                  </p>
                </div>
                
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  + Create New Quiz
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Create Quiz Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Create New Quiz</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateQuiz} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Quiz Title</label>
                <input
                  type="text"
                  value={quizForm.title}
                  onChange={(e) => setQuizForm({...quizForm, title: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Midterm Quiz (minimum 3 characters)"
                  minLength="3"
                  required
                />
                {quizForm.title.length > 0 && quizForm.title.length < 3 && (
                  <p className="text-red-400 text-xs mt-1">Title must be at least 3 characters</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description (Optional)</label>
                <textarea
                  value={quizForm.description}
                  onChange={(e) => setQuizForm({...quizForm, description: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Brief description of the quiz"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Time Limit (minutes) - Optional</label>
                  <input
                    type="number"
                    value={quizForm.time_limit}
                    onChange={(e) => setQuizForm({...quizForm, time_limit: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Leave empty for no time limit"
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Passing Score (%)</label>
                  <input
                    type="number"
                    value={quizForm.passing_score}
                    onChange={(e) => setQuizForm({...quizForm, passing_score: parseInt(e.target.value)})}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="100"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Max Attempts</label>
                <input
                  type="number"
                  value={quizForm.max_attempts}
                  onChange={(e) => setQuizForm({...quizForm, max_attempts: parseInt(e.target.value)})}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  required
                />
              </div>
              
              <div>
                <label className="flex items-center space-x-2 text-gray-300">
                  <input
                    type="checkbox"
                    checked={quizForm.is_published}
                    onChange={(e) => setQuizForm({...quizForm, is_published: e.target.checked})}
                    className="text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span>Publish immediately</span>
                </label>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Quiz'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Question Management Modal */}
      {showQuestionModal && selectedQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Manage Questions - {selectedQuiz.title}</h2>
              <button
                onClick={() => setShowQuestionModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>
            
            {/* Add Question Form */}
            <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
              <h3 className="text-white font-medium mb-4">Add New Question</h3>
              
              <form onSubmit={handleAddQuestion} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Question</label>
                  <textarea
                    value={questionForm.question}
                    onChange={(e) => setQuestionForm({...questionForm, question: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Enter your question here (minimum 5 characters)..."
                    minLength="5"
                    required
                  />
                  {questionForm.question.length > 0 && questionForm.question.length < 5 && (
                    <p className="text-red-400 text-xs mt-1">Question must be at least 5 characters</p>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-300">Answer Options (2-6 options)</label>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={addOption}
                        disabled={questionForm.options.length >= 6}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-2 py-1 rounded text-xs"
                      >
                        <MdAdd className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  
                  {questionForm.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <span className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...questionForm.options]
                          newOptions[index] = e.target.value
                          setQuestionForm({...questionForm, options: newOptions})
                        }}
                        className="flex-1 bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                        required
                      />
                      {questionForm.options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeOption(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <MdRemove className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Correct Answer</label>
                  <select
                    value={questionForm.correct_answer}
                    onChange={(e) => setQuestionForm({...questionForm, correct_answer: parseInt(e.target.value)})}
                    className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select correct answer</option>
                    {questionForm.options.map((option, index) => {
                      const filledOptions = questionForm.options.filter(opt => opt.trim())
                      const isOptionFilled = option.trim() !== ""
                      const isWithinFilledRange = index < filledOptions.length
                      
                      return isOptionFilled && isWithinFilledRange ? (
                        <option key={index} value={index}>
                          {String.fromCharCode(65 + index)} - {option.trim().substring(0, 30)}{option.trim().length > 30 ? '...' : ''}
                        </option>
                      ) : null
                    })}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">Choose which option (A, B, C, etc.) is the correct answer</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Points</label>
                    <input
                      type="number"
                      value={questionForm.points}
                      onChange={(e) => setQuestionForm({...questionForm, points: parseInt(e.target.value)})}
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Explanation (Optional)</label>
                    <input
                      type="text"
                      value={questionForm.explanation}
                      onChange={(e) => setQuestionForm({...questionForm, explanation: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Explain the correct answer"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <MdAdd className="w-4 h-4" />
                    <span>Add Question</span>
                  </button>
                </div>
              </form>
            </div>
            
            {/* Questions List */}
            <div>
              <h3 className="text-white font-medium mb-4">Questions ({questions.length})</h3>
              
              {questions.length > 0 ? (
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <div key={question.id} className="bg-gray-700/50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-medium">Question {index + 1}</h4>
                        <button
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <MdDelete className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-gray-300 mb-3">{question.question}</p>
                      
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        {question.options?.map((option, optIndex) => (
                          <div key={optIndex} className={`p-2 rounded ${
                            question.correct_answer === optIndex
                              ? 'bg-green-600/20 border border-green-600/50 text-green-400'
                              : 'bg-gray-600/50 text-gray-300'
                          }`}>
                            {option}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Points: {question.points}</span>
                        {question.explanation && <span>Explanation: {question.explanation}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MdQuiz className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No questions added yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quiz Preview Modal */}
      {showPreview && selectedQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Preview: {selectedQuiz.title}</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-white"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-gray-700/50 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Time Limit:</span>
                  <span className="text-white ml-2">{selectedQuiz.time_limit ? `${selectedQuiz.time_limit} minutes` : 'No limit'}</span>
                </div>
                <div>
                  <span className="text-gray-400">Passing Score:</span>
                  <span className="text-white ml-2">{selectedQuiz.passing_score}%</span>
                </div>
                <div>
                  <span className="text-gray-400">Max Attempts:</span>
                  <span className="text-white ml-2">{selectedQuiz.max_attempts}</span>
                </div>
                <div>
                  <span className="text-gray-400">Questions:</span>
                  <span className="text-white ml-2">{questions.length}</span>
                </div>
              </div>
              {selectedQuiz.description && (
                <div className="mt-3">
                  <span className="text-gray-400">Description:</span>
                  <p className="text-white mt-1">{selectedQuiz.description}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {questions.length > 0 ? (
                questions.map((question, index) => (
                  <div key={question.id} className="bg-gray-700/50 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Question {index + 1} ({question.points} point{question.points !== 1 ? 's' : ''})</h4>
                    <p className="text-gray-300 mb-3">{question.question}</p>
                    
                    <div className="space-y-2">
                      {question.options?.map((option, optIndex) => (
                        <div key={optIndex} className={`p-2 rounded flex items-center ${
                          question.correct_answer === optIndex
                            ? 'bg-green-600/20 border border-green-600/50'
                            : 'bg-gray-600/50'
                        }`}>
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-3 ${
                            question.correct_answer === optIndex
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-500 text-gray-300'
                          }`}>
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          <span className={question.correct_answer === optIndex ? 'text-green-400' : 'text-gray-300'}>
                            {option}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {question.explanation && (
                      <div className="mt-3 p-2 bg-blue-600/10 border border-blue-600/30 rounded">
                        <span className="text-blue-400 text-xs font-medium">Explanation:</span>
                        <p className="text-gray-300 text-sm mt-1">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MdQuiz className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No questions added yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quiz Submissions Modal */}
      {showSubmissions && selectedQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Submissions: {selectedQuiz.title}</h2>
              <button
                onClick={() => setShowSubmissions(false)}
                className="text-gray-400 hover:text-white"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {submissions.length > 0 ? (
                submissions.map((submission) => (
                  <div key={submission.id} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {/* Profile Picture */}
                        <div className="relative">
                          {submission.student_profile_picture ? (
                            <img
                              src={submission.student_profile_picture}
                              alt={`${submission.student_first_name} ${submission.student_last_name}`}
                              className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div 
                            className={`w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold border-2 border-gray-600 ${
                              submission.student_profile_picture ? 'hidden' : 'flex'
                            }`}
                          >
                            {submission.student_first_name?.[0]}{submission.student_last_name?.[0]}
                          </div>
                        </div>
                        
                        {/* Student Info */}
                        <div>
                          <h4 className="text-white font-medium">
                            {submission.student_first_name && submission.student_last_name 
                              ? `${submission.student_first_name} ${submission.student_last_name}`
                              : submission.student_name || 'Student'
                            }
                          </h4>
                          <p className="text-gray-400 text-sm">{submission.student_email}</p>
                          {submission.student_academic_level && (
                            <p className="text-blue-400 text-sm font-medium">
                              {submission.student_academic_level}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          submission.passed
                            ? 'bg-green-600/20 text-green-400 border border-green-600/50'
                            : 'bg-red-600/20 text-red-400 border border-red-600/50'
                        }`}>
                          {submission.passed ? 'Passed' : 'Failed'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Score:</span>
                        <span className="text-white ml-2">{submission.score}%</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Attempt:</span>
                        <span className="text-white ml-2">{submission.attempt_number}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Time Taken:</span>
                        <span className="text-white ml-2">
                          {submission.time_taken ? `${Math.round(submission.time_taken)} min` : 'N/A'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Date:</span>
                        <span className="text-white ml-2">{new Date(submission.submitted_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MdGrade className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No submissions yet</p>
                  <p className="text-gray-500 text-sm mt-2">Students haven't taken this quiz yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Quiz
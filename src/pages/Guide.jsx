function Guide() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Tutor Guide</h1>
          <p className="text-xl text-gray-400">
            Everything you need to know about creating quality content and succeeding as a tutor
          </p>
        </div>

        {/* Getting Started */}
        <div className="bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Getting Started</h2>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Create Your Profile</h3>
                <p className="text-gray-300">Complete your tutor profile with your qualifications, experience, and expertise areas.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Verify Your Credentials</h3>
                <p className="text-gray-300">Upload your educational certificates and teaching credentials for verification.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Set Up Your Teaching Space</h3>
                <p className="text-gray-300">Prepare your recording environment and equipment for creating quality content.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Create & Upload Content</h3>
                <p className="text-gray-300">Start creating your first lessons following our quality guidelines.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Quality Standards */}
        <div className="bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Video Quality Standards</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">📹 Camera Requirements</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong>Resolution:</strong> Minimum 1080p (1920x1080)</li>
                <li>• <strong>Frame Rate:</strong> 30fps or higher</li>
                <li>• <strong>Stability:</strong> Use tripod or stable surface</li>
                <li>• <strong>Focus:</strong> Ensure clear, sharp image</li>
                <li>• <strong>Composition:</strong> Face should occupy 1/3 of screen</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">💡 Lighting Guidelines</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Face evenly lit, no harsh shadows</li>
                <li>• Natural light from window preferred</li>
                <li>• Use soft, diffused lighting if artificial</li>
                <li>• Avoid backlighting (window behind you)</li>
                <li>• Test lighting before recording</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">🎤 Audio Requirements</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Clear, crisp audio without echo</li>
                <li>• Use external microphone when possible</li>
                <li>• Record in quiet environment</li>
                <li>• Test audio levels before recording</li>
                <li>• Speak clearly and at moderate pace</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">🎨 Background & Setup</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Clean, uncluttered background</li>
                <li>• Professional or educational setting</li>
                <li>• Whiteboard/blackboard visible if used</li>
                <li>• Consistent setup across videos</li>
                <li>• Remove distracting elements</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content Creation Guidelines */}
        <div className="bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Content Creation Guidelines</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">📚 Lesson Structure</h3>
              <div className="bg-gray-700 p-4 rounded-lg">
                <ol className="space-y-2 text-gray-300">
                  <li><strong>1. Introduction (1-2 minutes)</strong> - Greet students, introduce topic, outline what will be covered</li>
                  <li><strong>2. Main Content (8-15 minutes)</strong> - Detailed explanation with examples and illustrations</li>
                  <li><strong>3. Practice Problems (3-5 minutes)</strong> - Work through relevant questions step-by-step</li>
                  <li><strong>4. Summary (1-2 minutes)</strong> - Recap key points and preview next lesson</li>
                </ol>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">✅ Quality Checklist</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-gray-300">
                  <li>✓ Content is curriculum-aligned</li>
                  <li>✓ Explanations are clear and logical</li>
                  <li>✓ Examples are relevant to exam format</li>
                  <li>✓ Mathematical work is visible and neat</li>
                </ul>
                <ul className="space-y-2 text-gray-300">
                  <li>✓ Audio is clear throughout</li>
                  <li>✓ Video is stable and well-framed</li>
                  <li>✓ Lesson objectives are met</li>
                  <li>✓ Content is accurate and up-to-date</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Process */}
        <div className="bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">How to Upload Your Content</h2>
          
          <div className="space-y-6">
            <div className="border border-gray-600 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Step 1: Prepare Your Files</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• <strong>Video Format:</strong> MP4, MOV, or AVI</li>
                <li>• <strong>File Size:</strong> Maximum 2GB per video</li>
                <li>• <strong>Naming:</strong> Use clear, descriptive names (e.g., "Math_Quadratic_Equations_Lesson1.mp4")</li>
                <li>• <strong>Thumbnails:</strong> Create custom thumbnail images (1280x720 pixels)</li>
              </ul>
            </div>
            
            <div className="border border-gray-600 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Step 2: Upload Process</h3>
              <ol className="space-y-2 text-gray-300 text-sm">
                <li>1. Log into your tutor dashboard</li>
                <li>2. Click "Create New Lesson" or "Upload Content"</li>
                <li>3. Select your video file and wait for upload to complete</li>
                <li>4. Add lesson title, description, and tags</li>
                <li>5. Select subject, topic, and difficulty level</li>
                <li>6. Upload custom thumbnail (optional)</li>
                <li>7. Preview your content before publishing</li>
              </ol>
            </div>
            
            <div className="border border-gray-600 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Step 3: Optimization</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Write compelling lesson descriptions</li>
                <li>• Use relevant keywords and tags</li>
                <li>• Add chapter markers for longer videos</li>
                <li>• Include practice questions and resources</li>
                <li>• Set appropriate pricing for your content</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start?</h2>
          <p className="text-blue-100 mb-6">
            Follow these guidelines to create professional, engaging content that helps students succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Creating Content
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
              View Examples
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Guide
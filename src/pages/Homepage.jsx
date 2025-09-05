import { Link } from 'react-router-dom'
import { useState } from 'react'

function Homepage() {
  const [earnings, setEarnings] = useState(250)

  return (
    <div className="min-h-screen">
      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-900">
        {/* Background Image Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gray-900/90 z-10"></div>
          <img 
            src="/teaching.avif" 
            alt="Teaching Background" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-700/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gray-600/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-gray-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="mb-8">
                <span className="inline-flex items-center bg-gray-800/80 backdrop-blur-sm border border-gray-600 text-gray-300 px-6 py-3 rounded-full text-lg font-semibold">
                  🚀 Nigeria's #1 Tutor Platform
                  <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs animate-pulse">HOT</span>
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight">
                Teach
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 animate-gradient">
                  & Earn Big
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed font-light">
                Join <span className="text-green-400 font-bold">2,500+</span> expert tutors earning 
                <span className="text-blue-400 font-bold"> ₦300K - ₦800K</span> monthly teaching 
                WAEC, JAMB & NECO prep online
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <Link 
                  to="/signup" 
                  className="group relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-500 hover:via-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-105 shadow-2xl hover:shadow-green-500/25"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Teaching Now
                    <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                
                <Link 
                  to="/guide" 
                  className="group border-2 border-gray-500 text-white hover:bg-gray-800/50 px-8 py-4 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm hover:border-gray-400 hover:shadow-lg"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    See Success Stories
                  </span>
                </Link>
              </div>
              
              {/* Enhanced Quick Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center group hover:scale-105 transition-transform">
                  <div className="text-4xl md:text-5xl font-black text-green-400">2.5K+</div>
                  <div className="text-gray-400 font-medium">Active Tutors</div>
                </div>
                <div className="text-center group hover:scale-105 transition-transform">
                  <div className="text-4xl md:text-5xl font-black text-blue-400">₦2.5B+</div>
                  <div className="text-gray-400 font-medium">Total Earned</div>
                </div>
                <div className="text-center group hover:scale-105 transition-transform">
                  <div className="text-4xl md:text-5xl font-black text-purple-400">50K+</div>
                  <div className="text-gray-400 font-medium">Students</div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Hero Image Section */}
            <div className="relative lg:block">
              <div className="relative">
                {/* Main Hero Image */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
                  <img 
                    src="/class.avif" 
                    alt="Online Teaching" 
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-gray-800/40"></div>
                </div>
                
                {/* Floating Dashboard Card */}
                <div className="absolute -top-8 -left-8 bg-gray-800/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-gray-600/50 animate-float">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">Monthly Earnings</h3>
                      <p className="text-green-400 font-black text-2xl">₦{earnings.toLocaleString()},000</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">📈 +40% from last month</div>
                </div>
                
                {/* Floating Success Card */}
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 shadow-2xl text-white animate-float animation-delay-1000">
                  <div className="flex items-center space-x-3">
                    <div className="flex">
                      {[1,2,3,4,5].map(i => (
                        <svg key={i} className="w-5 h-5 text-yellow-300 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                    <div>
                      <div className="font-bold text-lg">4.9 Rating</div>
                      <div className="text-xs opacity-90">From 1,200+ reviews</div>
                    </div>
                  </div>
                </div>
                
                {/* Additional floating classroom image */}
                <div className="absolute top-16 -right-12 w-48 h-48 rounded-2xl overflow-hidden shadow-xl transform -rotate-12 hover:rotate-0 transition-all duration-500">
                  <img 
                    src="/classs.avif" 
                    alt="Classroom Teaching" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Section 2: Earnings Calculator */}
      <section className="py-20 bg-gray-800 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-600/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gray-500/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900/80 rounded-3xl p-8 border border-gray-600/20 shadow-2xl backdrop-blur-sm">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-gray-700/50 backdrop-blur-sm border border-gray-500 text-gray-300 px-6 py-3 rounded-full text-lg font-semibold mb-6">
                💰 Earnings Calculator
                <span className="ml-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs animate-pulse">NEW</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-6">
                Calculate Your Potential
              </h2>
              <p className="text-lg text-gray-300">See exactly how much you could earn based on your teaching activity</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="bg-gray-700/50 p-6 rounded-2xl border border-gray-600/50">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-lg font-semibold text-gray-300">Students per month</label>
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-1 rounded-full text-white font-bold">
                      150
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="500" 
                    value="150" 
                    className="w-full h-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>10</span>
                    <span>500+</span>
                  </div>
                </div>
                
                <div className="bg-gray-700/50 p-6 rounded-2xl border border-gray-600/50">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-lg font-semibold text-gray-300">Course price</label>
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1 rounded-full text-white font-bold">
                      ₦5,000
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="1000" 
                    max="15000" 
                    value="5000" 
                    className="w-full h-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>₦1,000</span>
                    <span>₦15,000+</span>
                  </div>
                </div>
                
                <div className="bg-gray-700/50 p-6 rounded-2xl border border-gray-600/50">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-lg font-semibold text-gray-300">Hours per week</label>
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 rounded-full text-white font-bold">
                      20 hrs
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="40" 
                    value="20" 
                    className="w-full h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>5 hrs</span>
                    <span>40+ hrs</span>
                  </div>
                </div>
                
                <div className="bg-gray-700/30 border border-gray-500/30 p-6 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-yellow-300 font-semibold">Pro Tip</span>
                  </div>
                  <p className="text-gray-300 text-sm">Upload 3+ courses to maximize your earning potential!</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gray-900/90 rounded-3xl p-8 border border-gray-600/30 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700/10 via-gray-600/10 to-gray-800/10 animate-gradient"></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-bold text-white mb-2">Monthly Potential</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-xl border border-gray-600/30">
                        <span className="text-gray-300 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                          Gross Revenue
                        </span>
                        <span className="text-2xl font-bold text-white">₦750,000</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-xl border border-gray-600/30">
                        <span className="text-gray-300 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          Platform Fee (15%)
                        </span>
                        <span className="text-xl text-red-400 font-semibold">-₦112,500</span>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-2 border-green-400/40 p-6 rounded-2xl">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xl font-semibold text-white">Your Take-Home</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                              ₦637,500
                            </span>
                            <div className="text-green-400 animate-bounce">🎉</div>
                          </div>
                        </div>
                        <div className="text-green-300 text-sm">That's ₦21,250 per day!</div>
                      </div>
                      
                      <div className="bg-gray-700/30 border border-gray-500/30 p-4 rounded-xl">
                        <p className="text-gray-300 text-sm flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          Top tutors in your subjects earn 40% more on average
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Key Features */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Everything You Need to Succeed</h2>
            <p className="text-lg text-gray-400">Professional tools and support to grow your teaching business</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-700/50 hover:bg-gray-700 p-6 rounded-xl transition-all border border-gray-600/50 hover:border-blue-500/50">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Video Hosting</h3>
              <p className="text-gray-300 text-sm">HD video hosting with global CDN for smooth streaming</p>
            </div>
            
            <div className="bg-gray-700/50 hover:bg-gray-700 p-6 rounded-xl transition-all border border-gray-600/50 hover:border-indigo-500/50">
              <div className="bg-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Instant Payments</h3>
              <p className="text-gray-300 text-sm">Get paid weekly via bank transfer or mobile money</p>
            </div>
            
            <div className="bg-gray-700/50 hover:bg-gray-700 p-6 rounded-xl transition-all border border-gray-600/50 hover:border-blue-700/50">
              <div className="bg-blue-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
              <p className="text-gray-300 text-sm">Track earnings, student engagement, and course performance</p>
            </div>
            
            <div className="bg-gray-700/50 hover:bg-gray-700 p-6 rounded-xl transition-all border border-gray-600/50 hover:border-gray-500/50">
              <div className="bg-gray-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">24/7 Support</h3>
              <p className="text-gray-300 text-sm">Dedicated support team to help you succeed</p>
            </div>
          </div>
          
          {/* Feature Highlights */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Setup</h3>
              <p className="text-gray-300">Get started in under 10 minutes. Upload your first course today and start earning tomorrow.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">Growing Community</h3>
              <p className="text-gray-300">Join thousands of tutors sharing best practices, tips, and celebrating success together.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">Quality Assurance</h3>
              <p className="text-gray-300">Our content review team ensures all courses meet high educational standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Course Creation Workflow */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Create Courses Like a Pro</h2>
            <p className="text-lg text-gray-400">Our intuitive course builder makes it easy to create engaging content</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Plan Your Course</h3>
                    <p className="text-gray-300 text-sm">Use our course outline template to structure your lessons effectively. Define learning objectives and outcomes.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Record & Upload</h3>
                    <p className="text-gray-300 text-sm">Record high-quality videos using our recording guidelines. Our platform supports HD video uploads up to 2GB.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Add Assessments</h3>
                    <p className="text-gray-300 text-sm">Create practice questions, quizzes, and assignments to reinforce learning and track student progress.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Publish & Promote</h3>
                    <p className="text-gray-300 text-sm">Set your pricing, add course descriptions, and launch. Our marketing tools help you reach more students.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Course Builder Preview */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Course Builder</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span className="text-white text-sm">Introduction to Quadratic Equations</span>
                      <span className="text-green-400 text-xs ml-auto">✓</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-purple-500 rounded"></div>
                      <span className="text-white text-sm">Solving by Factorization</span>
                      <span className="text-yellow-400 text-xs ml-auto">📝</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 p-3 rounded-lg border-2 border-blue-500">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className="text-white text-sm">The Quadratic Formula</span>
                      <span className="text-blue-400 text-xs ml-auto">🎬 EDITING</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700/50 p-3 rounded-lg border-2 border-dashed border-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-500 rounded"></div>
                      <span className="text-gray-400 text-sm">+ Add New Lesson</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-gray-400 text-xs">3 lessons completed</span>
                  <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm">Publish Course</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: How It Works */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Start Teaching in Minutes</h2>
            <p className="text-lg text-gray-400">Join thousands of tutors already earning on our platform</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-6 group-hover:scale-110 transition-transform">1</div>
              <h3 className="text-lg font-semibold text-white mb-4">Sign Up & Verify</h3>
              <p className="text-gray-300 leading-relaxed">Create your tutor profile and verify your expertise in your chosen subjects. Get approved in 24-48 hours.</p>
              <div className="mt-4 text-blue-400 text-sm font-medium">⏱️ Takes 10 minutes</div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-6 group-hover:scale-110 transition-transform">2</div>
              <h3 className="text-lg font-semibold text-white mb-4">Create Content</h3>
              <p className="text-gray-300 leading-relaxed">Upload high-quality videos, create practice questions, and build comprehensive courses using our tools.</p>
              <div className="mt-4 text-purple-400 text-sm font-medium">🎥 Start with 1 lesson</div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-6 group-hover:scale-110 transition-transform">3</div>
              <h3 className="text-lg font-semibold text-white mb-4">Start Earning</h3>
              <p className="text-gray-300 leading-relaxed">Publish your content and start earning as students enroll. Get paid weekly directly to your bank account.</p>
              <div className="mt-4 text-green-400 text-sm font-medium">💰 Earn from day 1</div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/signup" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg text-base font-semibold transition-all transform hover:scale-105 shadow-lg inline-flex items-center"
            >
              Start Your Teaching Journey
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Success Statistics */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-lg text-gray-400">Numbers that speak for themselves</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">2,500+</div>
              <div className="text-gray-300">Active Tutors</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">50,000+</div>
              <div className="text-gray-300">Students Reached</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">98%</div>
              <div className="text-gray-300">Success Rate</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">15</div>
              <div className="text-gray-300">Subjects Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Tutor Testimonials */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">What Our Tutors Say</h2>
            <p className="text-lg text-gray-400">Success stories from our teaching community</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  AM
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold">Adaora Mba</h4>
                  <p className="text-gray-400 text-sm">Mathematics Tutor</p>
                </div>
              </div>
              <p className="text-gray-300">"I've earned over ₦800,000 in 6 months teaching mathematics. The platform is so easy to use!"</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  EO
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold">Emeka Okafor</h4>
                  <p className="text-gray-400 text-sm">Physics Tutor</p>
                </div>
              </div>
              <p className="text-gray-300">"My students consistently score A's in WAEC Physics. This platform amplifies my impact!"</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  FA
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold">Fatima Ahmed</h4>
                  <p className="text-gray-400 text-sm">English Tutor</p>
                </div>
              </div>
              <p className="text-gray-300">"Teaching here has allowed me to reach students across Nigeria. It's incredibly fulfilling!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Subject Categories */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Teach Your Expertise</h2>
            <p className="text-lg text-gray-400">We cover all major WAEC, JAMB & NECO subjects</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              'Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology',
              'Economics', 'Geography', 'Government', 'Literature', 'Agricultural Science',
              'Further Mathematics', 'Technical Drawing', 'Computer Studies', 'Civic Education', 'History'
            ].map((subject, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition-colors">
                <p className="text-white font-medium">{subject}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Teaching?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of tutors making a difference in students' lives while earning from their expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg text-base font-semibold transition-colors"
            >
              Create Tutor Account
            </Link>
            <Link 
              to="/guide" 
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-lg text-base font-semibold transition-colors"
            >
              View Teaching Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Homepage
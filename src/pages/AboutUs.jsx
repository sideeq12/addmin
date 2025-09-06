function AboutUs() {
  return (
    <div className="min-h-screen py-12 bg-stripes-diagonal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative mb-8">
            <img 
              src="/class.avif" 
              alt="Classroom with students learning" 
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gray-900/50 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Scholarbase</h1>
                <p className="text-lg text-gray-200 max-w-2xl mx-auto px-4">
                  Empowering Nigerian tutors to share knowledge and transform education across the nation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-800 rounded-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 text-base leading-relaxed mb-4">
                To democratize quality education in Nigeria by connecting expert tutors with students 
                preparing for WAEC, JAMB, and NECO examinations.
              </p>
              <p className="text-gray-300 text-base leading-relaxed">
                We believe that every Nigerian student deserves access to world-class educational 
                content, and every qualified tutor should have a platform to share their expertise 
                and earn from their knowledge.
              </p>
            </div>
            <div className="relative">
              <img 
                src="/teaching.avif" 
                alt="Teacher helping students" 
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-blue-600/80 rounded-lg flex items-center justify-center text-center p-6">
                <div>
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Our Goal</h3>
                  <p className="text-blue-100">
                    To help 1 million Nigerian students pass their exams through quality tutoring
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-blue-400 text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold text-white mb-4">Excellence</h3>
              <p className="text-gray-300">
                We maintain the highest standards in educational content and tutor qualifications
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-blue-400 text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-white mb-4">Community</h3>
              <p className="text-gray-300">
                Building a supportive community of educators dedicated to student success
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-blue-400 text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-4">Innovation</h3>
              <p className="text-gray-300">
                Leveraging technology to make quality education accessible to all
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-3xl text-white font-bold mx-auto mb-4">
                AO
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Adebayo Ogundimu</h3>
              <p className="text-blue-400 mb-3">Founder & CEO</p>
              <p className="text-gray-300 text-sm">
                Former Mathematics teacher with 15+ years experience in Nigerian education
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-3xl text-white font-bold mx-auto mb-4">
                NK
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Ngozi Kalu</h3>
              <p className="text-blue-400 mb-3">Head of Education</p>
              <p className="text-gray-300 text-sm">
                Ph.D in Educational Technology, former WAEC examiner and curriculum developer
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-3xl text-white font-bold mx-auto mb-4">
                TI
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Tunde Ibrahim</h3>
              <p className="text-blue-400 mb-3">CTO</p>
              <p className="text-gray-300 text-sm">
                Software engineer and EdTech specialist, passionate about educational innovation
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-800 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="/classs.avif" 
                alt="Students studying together" 
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-8">Our Impact So Far</h2>
              <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">2,500+</div>
              <div className="text-gray-300">Verified Tutors</div>
            </div>
            
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">50,000+</div>
              <div className="text-gray-300">Students Helped</div>
            </div>
            
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">₦2.5B+</div>
              <div className="text-gray-300">Paid to Tutors</div>
            </div>
            
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">98%</div>
              <div className="text-gray-300">Pass Rate</div>
            </div>
          </div>
            </div>
          </div>
        </div>

        {/* Join Us CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mt-16 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Join Our Mission</h3>
          <p className="text-blue-100 text-lg mb-6">
            Be part of transforming Nigerian education. Share your knowledge and earn while making a difference.
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Become a Tutor Today
          </button>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
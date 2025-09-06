import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import AboutUs from './pages/AboutUs'
import Guide from './pages/Guide'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import CreateCourse from './pages/CreateCourse'
import Analytics from './pages/Analytics'
import StudentsPerformance from './pages/StudentsPerformance'
import Earnings from './pages/Earnings'
import Support from './pages/Support'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Routes>
          {/* Public routes with Navbar and Footer */}
          <Route path="/" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Homepage />
              </main>
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <AboutUs />
              </main>
              <Footer />
            </>
          } />
          <Route path="/guide" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Guide />
              </main>
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Contact />
              </main>
              <Footer />
            </>
          } />
          <Route path="/login" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Login />
              </main>
              <Footer />
            </>
          } />
          <Route path="/signup" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Signup />
              </main>
              <Footer />
            </>
          } />

          {/* Dashboard routes without Navbar and Footer */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/students-performance" element={<StudentsPerformance />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

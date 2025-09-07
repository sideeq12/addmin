import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
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
import EditCourse from './pages/EditCourse'
import Analytics from './pages/Analytics'
import StudentsPerformance from './pages/StudentsPerformance'
import Earnings from './pages/Earnings'
import Support from './pages/Support'
import './App.css'

function App() {
  return (
    <AuthProvider>
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

          {/* Protected Dashboard routes without Navbar and Footer */}
          <Route path="/dashboard" element={
            <ProtectedRoute requiredUserType="tutor">
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/courses" element={
            <ProtectedRoute requiredUserType="tutor">
              <Courses />
            </ProtectedRoute>
          } />
          <Route path="/courses/create" element={
            <ProtectedRoute requiredUserType="tutor">
              <CreateCourse />
            </ProtectedRoute>
          } />
          <Route path="/courses/:courseId/edit" element={
            <ProtectedRoute requiredUserType="tutor">
              <EditCourse />
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute requiredUserType="tutor">
              <Analytics />
            </ProtectedRoute>
          } />
          <Route path="/students-performance" element={
            <ProtectedRoute requiredUserType="tutor">
              <StudentsPerformance />
            </ProtectedRoute>
          } />
          <Route path="/earnings" element={
            <ProtectedRoute requiredUserType="tutor">
              <Earnings />
            </ProtectedRoute>
          } />
          <Route path="/support" element={
            <ProtectedRoute requiredUserType="tutor">
              <Support />
            </ProtectedRoute>
          } />
        </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

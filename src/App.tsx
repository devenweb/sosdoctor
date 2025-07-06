
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { Layout } from './components/Layout'
import { AuthForm } from './components/AuthForm'
import { Dashboard } from './pages/Dashboard'
import { DoctorSearch } from './pages/DoctorSearch'
import { Appointments } from './pages/Appointments'
import { VideoCall } from './pages/VideoCall'
import { Profile } from './pages/Profile'
import './App.css'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/auth" 
          element={!user ? <AuthForm /> : <Navigate to="/dashboard" />} 
        />
        
        {/* Video Call Route (can be accessed without full auth) */}
        <Route path="/video-call/:appointmentId" element={<VideoCall />} />
        
        {/* Protected Routes */}
        {user ? (
          <Route path="/" element={<Layout><Dashboard /></Layout>}>
            <Route index element={<Navigate to="/dashboard" />} />
          </Route>
        ) : (
          <Route path="/" element={<Navigate to="/auth" />} />
        )}
        
        {user && (
          <>
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/doctors" element={<Layout><DoctorSearch /></Layout>} />
            <Route path="/appointments" element={<Layout><Appointments /></Layout>} />
            <Route path="/video-calls" element={<Layout><Appointments /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
          </>
        )}
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/auth"} />} />
      </Routes>
    </Router>
  )
}

export default App
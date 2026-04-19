import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in and has a valid token
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn')
    const adminToken = localStorage.getItem('adminToken')
    
    if (!isAdminLoggedIn || !adminToken) {
      // Redirect to login page if not authenticated
      navigate('/admin/login')
      setIsAuthenticated(false)
    } else {
      setIsAuthenticated(true)
    }
  }, [navigate])

  if (isAuthenticated === null) {
    // Show loading state while checking authentication
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated) {
    // Don't render children if not authenticated
    return null
  }

  // Render children if authenticated
  return <>{children}</>
}
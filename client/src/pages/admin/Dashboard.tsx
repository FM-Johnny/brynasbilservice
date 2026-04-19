import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookingManagement } from '../../components/admin/BookingManagement'
import { ServiceManagement } from '../../components/admin/ServiceManagement'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'services'>('bookings')
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn')
    const adminToken = localStorage.getItem('adminToken')
    
    if (!isAdminLoggedIn || !adminToken) {
      navigate('/admin/login')
    }
  }, [navigate])

  const handleLogout = () => {
    // Clear authentication tokens
    localStorage.removeItem('isAdminLoggedIn')
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'bookings'
                        ? 'bg-indigo-700 text-white'
                        : 'text-indigo-200 hover:text-white'
                    }`}
                  >
                    Bookings
                  </button>
                  <button
                    onClick={() => setActiveTab('services')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'services'
                        ? 'bg-indigo-700 text-white'
                        : 'text-indigo-200 hover:text-white'
                    }`}
                  >
                    Services
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {activeTab === 'bookings' && <BookingManagement />}
            {activeTab === 'services' && <ServiceManagement />}
          </div>
        </div>
      </main>
    </div>
  )
}
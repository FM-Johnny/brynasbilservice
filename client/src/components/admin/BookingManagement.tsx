import { useState, useEffect } from 'react'
import axiosInstance from '../../api/axiosConfig'
import { useLanguage } from '../../context/useLanguage'

interface Booking {
  id: number
  customer_name: string
  service: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  created_at: string
}

export function BookingManagement() {
  const { t } = useLanguage()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('adminToken')
        const response = await axiosInstance.get('/api/admin/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setBookings(response.data)
        setFilteredBookings(response.data)
        setLoading(false)
      } catch (error) {
        setError('Failed to fetch bookings')
        setLoading(false)
        console.error(error)
      }
    }

    fetchBookings()
  }, [])

  useEffect(() => {
    // Filter bookings based on search term and status filter
    const filterBookings = () => {
      let result = bookings
      
      if (searchTerm) {
        result = result.filter(booking => 
          booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.service.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      
      if (statusFilter !== 'all') {
        result = result.filter(booking => booking.status === statusFilter)
      }
      
      setFilteredBookings(result)
    }
    
    filterBookings()
  }, [bookings, searchTerm, statusFilter])

  const updateBookingStatus = async (id: number, status: Booking['status']) => {
    try {
      const token = localStorage.getItem('adminToken')
      await axiosInstance.put(`/api/admin/bookings/${id}`, { status }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      // Update locally
      setBookings(bookings.map(booking => 
        booking.id === id ? {...booking, status} : booking
      ))
    } catch (error) {
      setError('Failed to update booking status')
      console.error(error)
    }
  }

  const deleteBooking = async (id: number) => {
    try {
      const token = localStorage.getItem('adminToken')
      await axiosInstance.delete(`/api/admin/bookings/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      // Remove locally
      setBookings(bookings.filter(booking => booking.id !== id))
    } catch (error) {
      setError('Failed to delete booking')
      console.error(error)
    }
  }

  if (loading) {
    return <div className="p-6">{t('loading')}...</div>
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {t('bookingManagement')}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {t('viewManageBookings')}
        </p>
      </div>
      
      {/* Search and Filter Controls */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                placeholder={t('searchBookings')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="all">{t('allStatuses')}</option>
              <option value="pending">{t('pending')}</option>
              <option value="confirmed">{t('confirmed')}</option>
              <option value="completed">{t('completed')}</option>
              <option value="cancelled">{t('cancelled')}</option>
            </select>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-red-400">!</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {t('failedToFetch')} {t('bookingManagement')}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="border-t border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('customer')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('service')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('dateTime')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('status')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  {t('noBookingsFound')}
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.customer_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.date} {t('dateTime').split(' ')[2]} {booking.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                      booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {t(`statusBadge.${booking.status}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <select
                      value={booking.status}
                      onChange={(e) => updateBookingStatus(booking.id, e.target.value as Booking['status'])}
                      className="text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
                    >
                      <option value="pending">{t('pending')}</option>
                      <option value="confirmed">{t('confirmed')}</option>
                      <option value="completed">{t('completed')}</option>
                      <option value="cancelled">{t('cancelled')}</option>
                    </select>
                    <button
                      onClick={() => deleteBooking(booking.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      {t('delete')}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
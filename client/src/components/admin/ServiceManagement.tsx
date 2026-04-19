import { useState, useEffect } from 'react'
import axios from 'axios'
import axiosInstance from '../../api/axiosConfig'

interface Service {
  id: number
  name: string
  description: string
  price: number
  created_at: string
}

export function ServiceManagement() {
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [currentService, setCurrentService] = useState<Service | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('adminToken')
        const response = await axiosInstance.get('/api/admin/services', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setServices(response.data)
        setFilteredServices(response.data)
        setLoading(false)
      } catch (error) {
        setError('Failed to fetch services')
        setLoading(false)
        console.error(error)
      }
    }

    fetchServices()
  }, [])

  useEffect(() => {
    // Filter services based on search term
    const filterServices = () => {
      if (searchTerm) {
        const filtered = services.filter(service => 
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredServices(filtered)
      } else {
        setFilteredServices(services)
      }
    }
    
    filterServices()
  }, [services, searchTerm])

  const handleEdit = (service: Service) => {
    setCurrentService(service)
    setIsEditing(true)
  }

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('adminToken')
      await axiosInstance.delete(`/api/admin/services/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      // Remove locally
      setServices(services.filter(service => service.id !== id))
    } catch (error) {
      setError('Failed to delete service')
      console.error(error)
    }
  }

  const handleSave = async () => {
    try {
      if (!currentService) return
      
      const token = localStorage.getItem('adminToken')
      
      if (currentService.id) {
        // Update existing service
        await axiosInstance.put(`/api/admin/services/${currentService.id}`, currentService, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        // Update locally
        setServices(services.map(service => 
          service.id === currentService.id ? currentService : service
        ))
      } else {
        // Add new service
        const response = await axiosInstance.post('/api/admin/services', currentService, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        // Add locally
        setServices([...services, {...currentService, id: response.data.id}])
      }
      
      setIsEditing(false)
      setCurrentService(null)
    } catch (error) {
      setError('Failed to save service')
      console.error(error)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setCurrentService(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentService) return
    
    const { name, value } = e.target
    setCurrentService({
      ...currentService,
      [name]: name === 'price' ? parseFloat(value) : value
    })
  }

  const handleAddNew = () => {
    setCurrentService({
      id: 0,
      name: '',
      description: '',
      price: 0,
      created_at: new Date().toISOString()
    })
    setIsEditing(true)
  }

  if (loading) {
    return <div className="p-6">Loading services...</div>
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Service Management
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Manage the services offered
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New Service
          </button>
        </div>
        
        {/* Search Control */}
        <div className="mt-4">
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search services..."
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
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-red-400">!</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {isEditing ? (
        <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Service Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={currentService?.name || ''}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price (SEK)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={currentService?.price || ''}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={currentService?.description || ''}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    No services found
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr key={service.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{service.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{service.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{service.price} SEK</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(service)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
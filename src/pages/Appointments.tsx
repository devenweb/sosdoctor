import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { Calendar, Clock, User, Video, MapPin } from 'lucide-react'

interface Appointment {
  id: string
  appointment_date: string
  appointment_time: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'in_progress'
  type: 'in_person' | 'video_call'
  symptoms: string | null
  notes: string | null
  doctors: {
    profiles: {
      full_name: string
    }
    specialization: string
  }
}

export function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchAppointments()
    }
  }, [user])

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          doctors (
            profiles (
              full_name
            ),
            specialization
          )
        `)
        .eq('patient_id', user?.id)
        .order('appointment_date', { ascending: true })

      if (error) throw error
      setAppointments(data || [])
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const upcomingAppointments = appointments.filter(apt => 
    apt.status === 'scheduled' || apt.status === 'in_progress'
  )

  const pastAppointments = appointments.filter(apt => 
    apt.status === 'completed' || apt.status === 'cancelled'
  )

  const displayAppointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments

  const handleJoinVideoCall = (appointmentId: string) => {
    // Navigate to video call
    window.open(`/video-call/${appointmentId}`, '_blank')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
        <p className="text-gray-600">Manage your medical appointments</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'upcoming'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Upcoming ({upcomingAppointments.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'past'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Past ({pastAppointments.length})
          </button>
        </nav>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {displayAppointments.map((appointment) => (
          <div key={appointment.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Dr. {appointment.doctors.profiles.full_name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status.replace('_', ' ')}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  {appointment.doctors.specialization}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(appointment.appointment_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {appointment.appointment_time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {appointment.type === 'video_call' ? (
                      <Video className="h-4 w-4 text-gray-400" />
                    ) : (
                      <MapPin className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-sm text-gray-600">
                      {appointment.type === 'video_call' ? 'Video Call' : 'In Person'}
                    </span>
                  </div>
                </div>

                {appointment.symptoms && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700">Symptoms:</p>
                    <p className="text-sm text-gray-600">{appointment.symptoms}</p>
                  </div>
                )}

                {appointment.notes && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700">Notes:</p>
                    <p className="text-sm text-gray-600">{appointment.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                {appointment.type === 'video_call' && appointment.status === 'scheduled' && (
                  <button
                    onClick={() => handleJoinVideoCall(appointment.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Video className="h-4 w-4" />
                    <span>Join Call</span>
                  </button>
                )}
                
                {appointment.status === 'scheduled' && (
                  <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {displayAppointments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No {activeTab} appointments found.
          </p>
        </div>
      )}
    </div>
  )
}
import { useParams } from 'react-router-dom'

export function VideoCall() {
  const { appointmentId } = useParams()

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <h1 className="text-white text-lg font-semibold">
          Video Consultation - Appointment #{appointmentId}
        </h1>
        <div className="flex items-center space-x-2">
          <span className="text-green-400 text-sm">● Connected</span>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 flex">
        <div className="flex-1 relative">
          {/* Remote Video */}
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <div className="text-center text-white">
              <p>Video call functionality removed due to conflicts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
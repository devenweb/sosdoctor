import React from 'react'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🏥 SOS Doctor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted healthcare management system - connecting patients with medical professionals quickly and efficiently.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">👨‍⚕️</div>
            <h3 className="text-xl font-semibold mb-2">Find Doctors</h3>
            <p className="text-gray-600">
              Connect with qualified medical professionals in your area for consultations and treatments.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">Book Appointments</h3>
            <p className="text-gray-600">
              Schedule appointments with your preferred doctors at convenient times.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">🚨</div>
            <h3 className="text-xl font-semibold mb-2">Emergency Care</h3>
            <p className="text-gray-600">
              Get immediate medical assistance during emergencies with our 24/7 support.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">Medical Records</h3>
            <p className="text-gray-600">
              Securely store and access your medical history and test results.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">💊</div>
            <h3 className="text-xl font-semibold mb-2">Prescriptions</h3>
            <p className="text-gray-600">
              Manage your prescriptions and get reminders for medication schedules.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Telemedicine</h3>
            <p className="text-gray-600">
              Consult with doctors remotely through secure video calls and messaging.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
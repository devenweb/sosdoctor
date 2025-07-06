import React, { useState } from 'react';

interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  type: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, patientName: 'Alice Smith', doctorName: 'Dr. John Doe', type: 'video', date: '2025-07-10 10:00 AM', status: 'scheduled' },
    { id: 2, patientName: 'Bob Johnson', doctorName: 'Dr. Jane Smith', type: 'chat', date: '2025-07-09 02:30 PM', status: 'completed' },
    { id: 3, patientName: 'Charlie Brown', doctorName: 'Dr. John Doe', type: 'video', date: '2025-07-11 11:00 AM', status: 'scheduled' },
    { id: 4, patientName: 'Diana Prince', doctorName: 'Dr. Jane Smith', type: 'chat', date: '2025-07-08 04:00 PM', status: 'cancelled' },
  ]);

  const handleUpdateStatus = (id: number, newStatus: 'scheduled' | 'completed' | 'cancelled') => {
    setAppointments(appointments.map(appt =>
      appt.id === id ? { ...appt, status: newStatus } : appt
    ));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Manage Appointments</h1>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Patient</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Doctor</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Type</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Date</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Status</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.patientName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.doctorName}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.type}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.date}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{appointment.status}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <select
                  value={appointment.status}
                  onChange={(e) => handleUpdateStatus(appointment.id, e.target.value as 'scheduled' | 'completed' | 'cancelled')}
                  style={{ padding: '5px', borderRadius: '3px' }}
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentsPage;
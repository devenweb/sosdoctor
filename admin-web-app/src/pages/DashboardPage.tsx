import React from 'react';

function DashboardPage() {
  // Simulated data for reports
  const totalAppointments = 1250;
  const completedAppointments = 1100;
  const pendingAppointments = 150;
  const totalDoctors = 25;
  const totalPatients = 5000;
  const totalRevenue = 75000;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h2>Total Appointments</h2>
          <p style={{ fontSize: '36px', fontWeight: 'bold' }}>{totalAppointments}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h2>Completed Appointments</h2>
          <p style={{ fontSize: '36px', fontWeight: 'bold' }}>{completedAppointments}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h2>Pending Appointments</h2>
          <p style={{ fontSize: '36px', fontWeight: 'bold' }}>{pendingAppointments}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h2>Total Doctors</h2>
          <p style={{ fontSize: '36px', fontWeight: 'bold' }}>{totalDoctors}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h2>Total Patients</h2>
          <p style={{ fontSize: '36px', fontWeight: 'bold' }}>{totalPatients}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h2>Total Revenue</h2>
          <p style={{ fontSize: '36px', fontWeight: 'bold' }}>${totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      <h2>Recent Activity (Placeholder)</h2>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        <li style={{ border: '1px solid #eee', padding: '10px', marginBottom: '5px', borderRadius: '5px' }}>New appointment booked by Patient ID 123.</li>
        <li style={{ border: '1px solid #eee', padding: '10px', marginBottom: '5px', borderRadius: '5px' }}>Dr. Smith completed a video consult.</li>
        <li style={{ border: '1px solid #eee', padding: '10px', marginBottom: '5px', borderRadius: '5px' }}>Payout processed for Dr. Jane Doe.</li>
      </ul>
    </div>
  );
}

export default DashboardPage;
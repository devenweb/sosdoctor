import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';

function DashboardPage() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading dashboard data...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h2>Total Appointments</h2>
          <p style={{ fontSize: '36px', fontWeight: 'bold' }}>{data.totalAppointments}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h2>Completed Appointments</h2>
          <p style={{ fontSize: '36px', fontWeight: 'bold' }}>{data.completedAppointments}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h2>Pending Appointments</h2>
          <p style={{ fontSize: '36px', fontWeight: 'bold' }}>{data.pendingAppointments}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h2>Total Doctors</h2>
          <p style={{ fontSize: '36px', fontWeight: 'bold' }}>{data.totalDoctors}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h2>Total Patients</h2>
          <p style={{ fontSize: '36px', fontWeight: 'bold' }}>{data.totalPatients}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h2>Total Revenue</h2>
          <p style={{ fontSize: '36px', fontWeight: 'bold' }}>${data.totalRevenue.toLocaleString()}</p>
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
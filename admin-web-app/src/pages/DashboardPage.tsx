import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

function DashboardPage() {
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [completedAppointments, setCompletedAppointments] = useState(0);
  const [pendingAppointments, setPendingAppointments] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Total Revenue remains simulated as there's no payment table yet
  const totalRevenue = 75000;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Total Appointments
        const { count: apptCount, error: apptError } = await supabase
          .from('appointments')
          .select('id', { count: 'exact', head: true });
        if (apptError) throw apptError;
        setTotalAppointments(apptCount || 0);

        // Fetch Completed Appointments
        const { count: completedApptCount, error: completedApptError } = await supabase
          .from('appointments')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'completed');
        if (completedApptError) throw completedApptError;
        setCompletedAppointments(completedApptCount || 0);

        // Fetch Pending Appointments
        const { count: pendingApptCount, error: pendingApptError } = await supabase
          .from('appointments')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'pending');
        if (pendingApptError) throw pendingApptError;
        setPendingAppointments(pendingApptCount || 0);

        // Fetch Total Doctors
        const { count: doctorCount, error: doctorError } = await supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true })
          .eq('is_doctor', true);
        if (doctorError) throw doctorError;
        setTotalDoctors(doctorCount || 0);

        // Fetch Total Patients
        const { count: patientCount, error: patientError } = await supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true })
          .eq('is_doctor', false); // Assuming non-doctors are patients
        if (patientError) throw patientError;
        setTotalPatients(patientCount || 0);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
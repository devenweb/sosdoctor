import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

interface Appointment {
  id: string; // Changed to string for UUID
  patientName: string;
  doctorName: string;
  type: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();

    const appointmentSubscription = supabase
      .from('appointments')
      .on('*', payload => {
        fetchAppointments(); // Re-fetch all appointments on any change
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(appointmentSubscription);
    };
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(
          `
          id,
          appointment_type,
          time_slot,
          status,
          patient:profiles!appointments_patient_id_fkey(full_name),
          doctor:doctors!appointments_doctor_id_fkey(profiles(full_name))
        `
        );

      if (error) {
        throw error;
      }

      const fetchedAppointments: Appointment[] = data.map((appt: any) => ({
        id: appt.id,
        patientName: appt.patient?.full_name || 'N/A',
        doctorName: appt.doctor?.profiles?.full_name || 'N/A',
        type: appt.appointment_type,
        date: new Date(appt.time_slot).toLocaleString(),
        status: appt.status,
      }));
      setAppointments(fetchedAppointments);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: 'scheduled' | 'completed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        throw error;
      }
      // Optimistically update UI or re-fetch
      fetchAppointments();
    } catch (err: any) {
      alert(`Error updating status: ${err.message}`);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading appointments...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
  }

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
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { APPOINTMENT_STATUS } from '../constants/AppointmentConstants';

export const useDashboardData = () => {
  const [data, setData] = useState({
    totalAppointments: 0,
    completedAppointments: 0,
    pendingAppointments: 0,
    totalDoctors: 0,
    totalPatients: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [apptCountRes, completedApptRes, pendingApptRes, doctorCountRes, patientCountRes, revenueRes] = await Promise.all([
          supabase.from('appointments').select('id', { count: 'exact', head: true }),
          supabase.from('appointments').select('id', { count: 'exact', head: true }).eq('status', APPOINTMENT_STATUS.COMPLETED),
          supabase.from('appointments').select('id', { count: 'exact', head: true }).eq('status', APPOINTMENT_STATUS.PENDING),
          supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('is_doctor', true),
          supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('is_doctor', false),
          supabase.from('payments').select('amount'), // Assuming a 'payments' table with an 'amount' column
        ]);

        if (apptCountRes.error) throw apptCountRes.error;
        if (completedApptRes.error) throw completedApptRes.error;
        if (pendingApptRes.error) throw pendingApptRes.error;
        if (doctorCountRes.error) throw doctorCountRes.error;
        if (patientCountRes.error) throw patientCountRes.error;
        if (revenueRes.error) throw revenueRes.error;

        const totalRevenue = revenueRes.data ? revenueRes.data.reduce((sum, payment) => sum + payment.amount, 0) : 0;

        setData({
          totalAppointments: apptCountRes.count || 0,
          completedAppointments: completedApptRes.count || 0,
          pendingAppointments: pendingApptRes.count || 0,
          totalDoctors: doctorCountRes.count || 0,
          totalPatients: patientCountRes.count || 0,
          totalRevenue: totalRevenue,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

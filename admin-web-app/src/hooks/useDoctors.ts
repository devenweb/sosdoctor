import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

interface Doctor {
  id: string; // Changed to string for UUID
  name: string;
  specialty: string;
  email: string;
}

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDoctors();

    const doctorSubscription = supabase
      .from('profiles')
      .on('*', payload => {
        // For simplicity, re-fetch all doctors on any change
        fetchDoctors();
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(doctorSubscription);
    };
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(
          `
          id,
          full_name,
          email,
          doctors ( specialty, bio )
        `
        )
        .eq('is_doctor', true);

      if (error) {
        throw error;
      }

      const fetchedDoctors: Doctor[] = data.map((profile: any) => ({
        id: profile.id,
        name: profile.full_name,
        specialty: profile.doctors ? profile.doctors.specialty : '',
        email: profile.email,
      }));
      setDoctors(fetchedDoctors);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addDoctor = async (doctor: Omit<Doctor, 'id'>) => {
    try {
      // First, create a user in auth.users (optional, but good practice for doctors)
      const { user, error: authError } = await supabase.auth.signUp({
        email: doctor.email,
        password: 'temporary_password', // Admins should set a temporary password or send an invite
      });

      if (authError) {
        throw authError;
      }

      if (!user) {
        throw new Error('User creation failed.');
      }

      // Then, create the profile entry
      const { error: profileError } = await supabase.from('profiles').insert({
        id: user.id,
        full_name: doctor.name,
        email: doctor.email,
        is_doctor: true,
      });

      if (profileError) {
        throw profileError;
      }

      // Finally, create the doctor entry
      const { error: doctorError } = await supabase.from('doctors').insert({
        id: user.id,
        specialty: doctor.specialty,
      });

      if (doctorError) {
        throw doctorError;
      }
      fetchDoctors(); // Re-fetch to update the list
    } catch (err: any) {
      setError(err.message);
      alert(`Error adding doctor: ${err.message}`);
    }
  };

  const updateDoctor = async (updatedDoctor: Doctor) => {
    try {
      // Update profile details
      const { error: profileError } = await supabase.from('profiles').update({
        full_name: updatedDoctor.name,
        email: updatedDoctor.email,
      }).eq('id', updatedDoctor.id);

      if (profileError) {
        throw profileError;
      }

      // Update doctor-specific details
      const { error: doctorError } = await supabase.from('doctors').update({
        specialty: updatedDoctor.specialty,
      }).eq('id', updatedDoctor.id);

      if (doctorError) {
        throw doctorError;
      }
      fetchDoctors(); // Re-fetch to update the list
    } catch (err: any) {
      setError(err.message);
      alert(`Error updating doctor: ${err.message}`);
    }
  };

  const deleteDoctor = async (id: string) => {
    try {
      // Deleting the profile will cascade delete the doctor entry due to foreign key constraints
      const { error } = await supabase.from('profiles').delete().eq('id', id);

      if (error) {
        throw error;
      }
      fetchDoctors(); // Re-fetch to update the list
    } catch (err: any) {
      setError(err.message);
      alert(`Error deleting doctor: ${err.message}`);
    }
  };

  return {
    doctors,
    loading,
    error,
    addDoctor,
    updateDoctor,
    deleteDoctor,
  };
};

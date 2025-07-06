import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select(`
            id,
            full_name,
            doctors ( specialty, bio )
          `)
          .eq('is_doctor', true);

        if (error) {
          throw error;
        }

        // Flatten the data structure for easier use
        const fetchedDoctors = data.map(profile => ({
          id: profile.id,
          name: profile.full_name,
          specialty: profile.doctors ? profile.doctors.specialty : 'N/A',
          bio: profile.doctors ? profile.doctors.bio : 'N/A',
        }));
        setDoctors(fetchedDoctors);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return { doctors, loading, error };
};

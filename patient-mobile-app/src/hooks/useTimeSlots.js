import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export const useTimeSlots = (doctorId) => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!doctorId) {
      setTimeSlots([]);
      setLoading(false);
      return;
    }

    const fetchTimeSlots = async () => {
      try {
        const { data, error } = await supabase
          .from('time_slots')
          .select('slot_time')
          .eq('doctor_id', doctorId)
          .eq('is_booked', false)
          .order('slot_time', { ascending: true });

        if (error) {
          throw error;
        }

        setTimeSlots(data.map(slot => slot.slot_time));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSlots();
  }, [doctorId]);

  return { timeSlots, loading, error };
};

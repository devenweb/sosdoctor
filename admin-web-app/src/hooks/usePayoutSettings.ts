import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export const usePayoutSettings = () => {
  const [payoutThreshold, setPayoutThreshold] = useState(100);
  const [payoutMethod, setPayoutMethod] = useState('bank_transfer');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const { data: thresholdData, error: thresholdError } = await supabase
          .from('settings')
          .select('value')
          .eq('key', 'payout_threshold')
          .single();
        if (thresholdError) throw thresholdError;
        if (thresholdData) setPayoutThreshold(thresholdData.value);

        const { data: methodData, error: methodError } = await supabase
          .from('settings')
          .select('value')
          .eq('key', 'payout_method')
          .single();
        if (methodError) throw methodError;
        if (methodData) setPayoutMethod(methodData.value);

      } catch (err: any) {
        console.error('Error fetching payout settings:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const saveSettings = async (newThreshold: number, newMethod: string) => {
    try {
      const { error: thresholdError } = await supabase
        .from('settings')
        .upsert({ key: 'payout_threshold', value: newThreshold });
      if (thresholdError) throw thresholdError;

      const { error: methodError } = await supabase
        .from('settings')
        .upsert({ key: 'payout_method', value: newMethod });
      if (methodError) throw methodError;

      setPayoutThreshold(newThreshold);
      setPayoutMethod(newMethod);
      alert('Settings saved successfully!');
    } catch (err: any) {
      setError(err.message);
      alert(`Error saving settings: ${err.message}`);
    }
  };

  return {
    payoutThreshold,
    setPayoutThreshold,
    payoutMethod,
    setPayoutMethod,
    loading,
    error,
    saveSettings,
  };
};

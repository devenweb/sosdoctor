import React from 'react';
import { usePayoutSettings } from '../hooks/usePayoutSettings';

function SettingsPage() {
  const { payoutThreshold, setPayoutThreshold, payoutMethod, setPayoutMethod, loading, error, saveSettings } = usePayoutSettings();

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading settings...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Settings</h1>

      <div style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
        <h2>Payout Configurations</h2>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Payout Threshold ($):
          <input
            type="number"
            value={payoutThreshold}
            onChange={(e) => setPayoutThreshold(Number(e.target.value))}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Payout Method:
          <select
            value={payoutMethod}
            onChange={(e) => setPayoutMethod(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="bank_transfer">Bank Transfer</option>
            <option value="paypal">PayPal</option>
            <option value="stripe_connect">Stripe Connect</option>
          </select>
        </label>
        <button onClick={() => saveSettings(payoutThreshold, payoutMethod)} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Save Payout Settings</button>
      </div>

      {/* Other settings can be added here */}
      <h2>General Settings (Placeholder)</h2>
      <p>More general settings options will be available here.</p>
    </div>
  );
}

export default SettingsPage;
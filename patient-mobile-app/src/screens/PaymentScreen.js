import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';

export default function PaymentScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    // Simulate Stripe payment processing
    setTimeout(() => {
      setLoading(false);
      const paymentSuccess = Math.random() > 0.5; // Simulate success or failure

      if (paymentSuccess) {
        Alert.alert('Payment Successful', 'Your appointment has been confirmed!');
        navigation.navigate('Home'); // Navigate to home or appointment details screen
      } else {
        Alert.alert('Payment Failed', 'There was an issue processing your payment. Please try again.');
        // Optionally navigate back to booking or show retry option
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>
      <Text style={styles.infoText}>Total: $XX.XX (Placeholder)</Text>
      <Button
        title={loading ? 'Processing...' : 'Pay with Stripe (Simulated)'}
        onPress={handlePayment}
        disabled={loading}
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.spinner} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 30,
  },
  spinner: {
    marginTop: 20,
  },
});

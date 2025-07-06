import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

export default function VideoCallScreen({ navigation, route }) {
  const { appointmentId, patientName } = route.params || {};
  const [callActive, setCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    // Simulate joining a video call
    const timer = setTimeout(() => {
      setCallActive(true);
      Alert.alert('Call Connected', `You are now in a video call with ${patientName} for appointment ${appointmentId}.`);
      // Start call duration timer
      const durationInterval = setInterval(() => {
        setCallDuration(prevDuration => prevDuration + 1);
      }, 1000);
      return () => clearInterval(durationInterval);
    }, 2000); // Simulate 2 seconds to connect

    return () => clearTimeout(timer);
  }, [appointmentId, patientName]);

  const handleEndCall = () => {
    setCallActive(false);
    Alert.alert('Call Ended', `Call with ${patientName} for appointment ${appointmentId} has ended. Duration: ${callDuration} seconds.`);
    navigation.goBack(); // Or navigate to a call summary screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Call with {patientName}</Text>
      {appointmentId && <Text>Appointment ID: {appointmentId}</Text>}
      {callActive ? (
        <>
          <Text style={styles.statusText}>Call Active</Text>
          <Text>Duration: {callDuration} seconds</Text>
          <Button title="End Call" onPress={handleEndCall} color="red" />
        </>
      ) : (
        <Text style={styles.statusText}>Connecting to call...</Text>
      )}
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
  statusText: {
    fontSize: 18,
    marginVertical: 10,
  },
});

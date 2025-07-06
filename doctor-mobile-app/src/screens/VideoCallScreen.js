import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../services/supabase';
import { APPOINTMENT_STATUS } from '../constants/AppointmentConstants';

export default function VideoCallScreen({ navigation, route }) {
  const { appointmentId, patientName } = route.params || {};
  const [callActive, setCallActive] = useState(true); // Assume call is active upon entering screen

  const handleEndCall = async () => {
    if (!appointmentId) return;

    const { error } = await supabase
      .from('appointments')
      .update({ status: APPOINTMENT_STATUS.COMPLETED })
      .eq('id', appointmentId);

    if (error) {
      console.error('Error ending video call session:', error);
      Alert.alert('Error', 'Failed to end video call session.');
    } else {
      setCallActive(false);
      Alert.alert('Call Ended', `Video call with ${patientName} for appointment ${appointmentId} has ended.`);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Call with {patientName}</Text>
      {appointmentId && <Text>Appointment ID: {appointmentId}</Text>}
      {callActive ? (
        <>
          <Text style={styles.statusText}>Call Active</Text>
          {/* In a real app, video stream would be rendered here */}
          <Button title="End Call" onPress={handleEndCall} color="red" />
        </>
      ) : (
        <Text style={styles.statusText}>Call has ended.</Text>
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

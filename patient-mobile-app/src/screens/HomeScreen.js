import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { signOut, session } = useAuth();

  useEffect(() => {
    if (!session) {
      navigation.navigate('Auth');
    }
  }, [session, navigation]);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button title="Start Video Call" onPress={() => navigation.navigate('VideoCall', { appointmentId: 'appt_123' })} />
      <Button title="Start Chat" onPress={() => navigation.navigate('Chat', { appointmentId: 'appt_456' })} />
      <Button title="Book Appointment" onPress={() => navigation.navigate('AppointmentBooking')} />
      <Button title="View Prescription" onPress={() => navigation.navigate('Prescription', { prescriptionId: 'pres_789' })} />
      <Button title="Sign Out" onPress={handleSignOut} />
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
});
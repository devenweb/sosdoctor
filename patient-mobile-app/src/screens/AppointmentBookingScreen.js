import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { supabase } from '../services/supabase'; // Assuming supabase.js is in the services folder

export default function AppointmentBookingScreen({ navigation }) {
  const [bookingStartTime, setBookingStartTime] = useState(null);
  const [consultConfirmed, setConsultConfirmed] = useState(false);
  const [consultType, setConsultType] = useState(null); // 'video' or 'chat'
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Placeholder for selected doctor
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null); // Placeholder for selected time slot

  useEffect(() => {
    setBookingStartTime(Date.now());
  }, []);

  const bookAppointment = async () => {
    const user = supabase.auth.user();
    if (!user) {
      throw new Error('User not logged in.');
    }

    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          patient_id: user.id,
          doctor_id: selectedDoctor,
          appointment_type: consultType,
          time_slot: selectedTimeSlot,
          status: 'pending',
          booking_time: new Date().toISOString(),
        },
      ]);

    if (error) {
      throw error;
    }
    return data;
  };

  const showBookingConfirmation = () => {
    setConsultConfirmed(true);
    Alert.alert('Consult confirmed', 'Your video consult has been successfully booked.');
    navigation.navigate('Payment'); // Navigate to payment screen
  };

  const showBookingError = (message) => {
    Alert.alert('Booking Error', message);
  };

  const handleBookConsult = async () => {
    if (!consultType || !selectedDoctor || !selectedTimeSlot) {
      Alert.alert('Error', 'Please select consult type, doctor, and time slot.');
      return;
    }

    const bookingDuration = Date.now() - bookingStartTime;

    if (bookingDuration < 60000) {
      try {
        await bookAppointment();
        showBookingConfirmation();
      } catch (error) {
        showBookingError(error.message);
      }
    } else {
      Alert.alert('Booking Failed', 'Booking took longer than 60 seconds. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment Booking Screen</Text>

      {!consultConfirmed ? (
        <>
          <Text style={styles.sectionTitle}>Select Consult Type:</Text>
          <View style={styles.buttonContainer}>
            <Button title="Video Consult" onPress={() => setConsultType('video')} disabled={consultType === 'video'} />
            <Button title="Chat Consult" onPress={() => setConsultType('chat')} disabled={consultType === 'chat'} />
          </View>
          {consultType && <Text>Selected Type: {consultType}</Text>}

          <Text style={styles.sectionTitle}>Choose Doctor:</Text>
          <Button title="Select Doctor (Placeholder)" onPress={() => setSelectedDoctor('doctor_id_123')} />
          {selectedDoctor && <Text>Selected Doctor: {selectedDoctor}</Text>}

          <Text style={styles.sectionTitle}>Select Time Slot:</Text>
          <Button title="Select Time Slot (Placeholder)" onPress={() => setSelectedTimeSlot('2025-07-15T10:00:00Z')} />
          {selectedTimeSlot && <Text>Selected Time: {selectedTimeSlot}</Text>}

          <Button title="Book Consult" onPress={handleBookConsult} />
        </>
      ) : (
        <Text style={styles.confirmationText}>Consult confirmed</Text>
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
  sectionTitle: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 10,
  },
  confirmationText: {
    fontSize: 20,
    color: 'green',
  },
});

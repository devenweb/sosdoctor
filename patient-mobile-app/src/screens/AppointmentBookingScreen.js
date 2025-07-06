import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { supabase } from '../services/supabase';
import ConsultTypeSelection from '../components/ConsultTypeSelection';
import DoctorSelection from '../components/DoctorSelection';
import TimeSlotSelection from '../components/TimeSlotSelection';
import { APPOINTMENT_STATUS } from '../constants/AppointmentConstants';

export default function AppointmentBookingScreen({ navigation }) {
  const [bookingStartTime, setBookingStartTime] = useState(null);
  const [consultConfirmed, setConsultConfirmed] = useState(false);
  const [consultType, setConsultType] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

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
          doctor_id: selectedDoctor.id,
          appointment_type: consultType,
          time_slot: selectedTimeSlot,
          status: APPOINTMENT_STATUS.PENDING,
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
    navigation.navigate('Payment');
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
          <ConsultTypeSelection consultType={consultType} setConsultType={setConsultType} />
          <DoctorSelection selectedDoctor={selectedDoctor} setSelectedDoctor={setSelectedDoctor} />
          <TimeSlotSelection
            selectedDoctor={selectedDoctor}
            selectedTimeSlot={selectedTimeSlot}
            setSelectedTimeSlot={setSelectedTimeSlot}
          />
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
  confirmationText: {
    fontSize: 20,
    color: 'green',
  },
});

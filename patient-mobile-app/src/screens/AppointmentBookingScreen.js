import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { supabase } from '../services/supabase';
import { useDoctors } from '../hooks/useDoctors'; // Import the new hook
import { useTimeSlots } from '../hooks/useTimeSlots'; // Import the new hook

export default function AppointmentBookingScreen({ navigation }) {
  const [bookingStartTime, setBookingStartTime] = useState(null);
  const [consultConfirmed, setConsultConfirmed] = useState(false);
  const [consultType, setConsultType] = useState(null); // 'video' or 'chat'
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const { doctors, loading: doctorsLoading, error: doctorsError } = useDoctors();
  const { timeSlots, loading: timeSlotsLoading, error: timeSlotsError } = useTimeSlots(selectedDoctor?.id);

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
          {doctorsLoading ? (
            <Text>Loading doctors...</Text>
          ) : doctorsError ? (
            <Text>Error loading doctors: {doctorsError.message}</Text>
          ) : (
            <FlatList
              data={doctors}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.doctorItem, selectedDoctor?.id === item.id && styles.selectedDoctorItem]}
                  onPress={() => setSelectedDoctor(item)}
                >
                  <Text>{item.name} ({item.specialty})</Text>
                </TouchableOpacity>
              )}
            />
          )}
          {selectedDoctor && <Text>Selected Doctor: {selectedDoctor.name}</Text>}

          <Text style={styles.sectionTitle}>Select Time Slot:</Text>
          {selectedDoctor ? (
            timeSlotsLoading ? (
              <Text>Loading time slots...</Text>
            ) : timeSlotsError ? (
              <Text>Error loading time slots: {timeSlotsError.message}</Text>
            ) : (
              <FlatList
                data={timeSlots}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.timeSlotItem, selectedTimeSlot === item && styles.selectedTimeSlotItem]}
                    onPress={() => setSelectedTimeSlot(item)}
                  >
                    <Text>{new Date(item).toLocaleString()}</Text>
                  </TouchableOpacity>
                )}
              />
            )
          ) : (
            <Text>Please select a doctor to see available time slots.</Text>
          )}
          {selectedTimeSlot && <Text>Selected Time: {new Date(selectedTimeSlot).toLocaleString()}</Text>}

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
  doctorItem: {
    padding: 10,
    marginVertical: 5,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
  },
  selectedDoctorItem: {
    backgroundColor: '#d3d3d3',
  },
  timeSlotItem: {
    padding: 10,
    marginVertical: 5,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
  },
  selectedTimeSlotItem: {
    backgroundColor: '#d3d3d3',
  },
});

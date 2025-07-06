import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/AuthContext';
import { APPOINTMENT_STATUS } from '../constants/AppointmentConstants';

export default function AppointmentsScreen({ navigation }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { session } = useAuth();

  useEffect(() => {
    if (!session) {
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select(`
            *,
            patient:profiles(full_name)
          `)
          .eq('doctor_id', session.user.id)
          .order('time_slot', { ascending: true });

        if (error) {
          throw error;
        }
        setAppointments(data);
      } catch (err) {
        setError(err.message);
        Alert.alert('Error', 'Failed to fetch appointments: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();

    // Real-time listener for appointments (optional but good for dynamic updates)
    const appointmentSubscription = supabase
      .from('appointments')
      .on('*', payload => {
        // Handle real-time updates (insert, update, delete)
        fetchAppointments(); // Re-fetch all appointments for simplicity
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(appointmentSubscription);
    };
  }, [session]);

  const updateAppointmentStatus = async (id, newStatus) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        throw error;
      }
      // Update local state to reflect the change
      setAppointments(prevAppointments =>
        prevAppointments.map(appt =>
          appt.id === id ? { ...appt, status: newStatus } : appt
        )
      );
      Alert.alert('Success', `Appointment ${id} status updated to ${newStatus}.`);
    } catch (err) {
      Alert.alert('Error', 'Failed to update appointment status: ' + err.message);
    }
  };

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentCard}>
      <Text style={styles.patientName}>{item.patient.full_name || 'N/A'}</Text>
      <Text>Type: {item.appointment_type}</Text>
      <Text>Time: {new Date(item.time_slot).toLocaleString()}</Text>
      <Text>Status: {item.status}</Text>
      {item.status === APPOINTMENT_STATUS.SCHEDULED && (
        <View style={styles.buttonContainer}>
          {item.appointment_type === 'video_consult' && (
            <Button
              title="Start Video Call"
              onPress={() => {
                updateAppointmentStatus(item.id, APPOINTMENT_STATUS.IN_PROGRESS);
                navigation.navigate('VideoCall', { appointmentId: item.id, patientName: item.patient.full_name });
              }}
            />
          )}
          {item.appointment_type === 'chat_consult' && (
            <Button
              title="Start Chat"
              onPress={() => {
                updateAppointmentStatus(item.id, APPOINTMENT_STATUS.IN_PROGRESS);
                navigation.navigate('Chat', { appointmentId: item.id, patientName: item.patient.full_name });
              }}
            />
          )}
          <Button
            title="Send Prescription"
            onPress={() => navigation.navigate('Prescription', { appointmentId: item.id, patientName: item.patient.full_name })}
          />
        </View>
      )}
      {item.status === APPOINTMENT_STATUS.IN_PROGRESS && (
        <Button
          title="Mark as Completed"
          onPress={() => updateAppointmentStatus(item.id, APPOINTMENT_STATUS.COMPLETED)}
        />
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading appointments...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Appointments</Text>
      {appointments.length === 0 ? (
        <Text>No appointments found.</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={renderAppointmentItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  listContent: {
    width: '100%',
  },
  appointmentCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

export default function AppointmentsScreen({ navigation }) {
  const [appointments, setAppointments] = useState([
    { id: '1', patientName: 'Alice Smith', type: 'video', status: 'scheduled' },
    { id: '2', patientName: 'Bob Johnson', type: 'chat', status: 'scheduled' },
    { id: '3', patientName: 'Charlie Brown', type: 'video', status: 'completed' },
  ]);

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentCard}>
      <Text style={styles.patientName}>{item.patientName}</Text>
      <Text>Type: {item.type}</Text>
      <Text>Status: {item.status}</Text>
      {item.status === 'scheduled' && (
        <View style={styles.buttonContainer}>
          {item.type === 'video' && (
            <Button
              title="Start Video Call"
              onPress={() => navigation.navigate('VideoCall', { appointmentId: item.id, patientName: item.patientName })}
            />
          )}
          {item.type === 'chat' && (
            <Button
              title="Start Chat"
              onPress={() => navigation.navigate('Chat', { appointmentId: item.id, patientName: item.patientName })}
            />
          )}
          <Button
            title="Send Prescription"
            onPress={() => navigation.navigate('Prescription', { appointmentId: item.id, patientName: item.patientName })}
          />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={renderAppointmentItem}
        contentContainerStyle={styles.listContent}
      />
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
});

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function PrescriptionScreen({ navigation, route }) {
  const { appointmentId, patientName } = route.params || {};
  const [prescriptionText, setPrescriptionText] = useState('');

  const handleSendPrescription = () => {
    if (prescriptionText.trim()) {
      // In a real app, you would generate a PDF and send it to the patient
      Alert.alert(
        'Prescription Sent',
        `Prescription for ${patientName} (Appointment ID: ${appointmentId}) sent successfully!`
      );
      console.log('Prescription Content:', prescriptionText);
      navigation.goBack(); // Go back to appointments screen
    } else {
      Alert.alert('Error', 'Please enter prescription details.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Prescription</Text>
      {patientName && <Text style={styles.infoText}>To: {patientName}</Text>}
      {appointmentId && <Text style={styles.infoText}>Appointment ID: {appointmentId}</Text>}

      <TextInput
        style={styles.textArea}
        placeholder="Enter prescription details here..."
        multiline
        numberOfLines={10}
        value={prescriptionText}
        onChangeText={setPrescriptionText}
      />

      <Button title="Send Prescription" onPress={handleSendPrescription} />
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
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    width: '100%',
    textAlignVertical: 'top',
  },
});

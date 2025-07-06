import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../../src/services/supabase'; // Adjust path as needed

export default function PrescriptionScreen({ navigation, route }) {
  const { appointmentId, patientName } = route.params || {};
  const [prescriptionText, setPrescriptionText] = useState('');

  const handleSendPrescription = async () => {
    if (!prescriptionText.trim()) {
      Alert.alert('Error', 'Please enter prescription details.');
      return;
    }

    if (!appointmentId) {
      Alert.alert('Error', 'Appointment ID is missing. Cannot send prescription.');
      return;
    }

    try {
      // In a real app, you would generate a PDF and upload it to Supabase Storage,
      // then store the URL in the database.
      // For now, we'll just store a placeholder URL.
      const placeholderPdfUrl = `https://example.com/prescriptions/${appointmentId}.pdf`;

      const { data, error } = await supabase
        .from('prescriptions')
        .insert([
          {
            appointment_id: appointmentId,
            pdf_url: placeholderPdfUrl,
            details: prescriptionText, // Assuming you add a 'details' column to prescriptions table
          },
        ]);

      if (error) {
        throw error;
      }

      Alert.alert(
        'Prescription Sent',
        `Prescription for ${patientName} (Appointment ID: ${appointmentId}) sent successfully!`
      );
      console.log('Prescription Content:', prescriptionText);
      navigation.goBack(); // Go back to appointments screen
    } catch (err) {
      Alert.alert('Error', 'Failed to send prescription: ' + err.message);
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

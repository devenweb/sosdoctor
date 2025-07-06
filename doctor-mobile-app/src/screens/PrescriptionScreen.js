import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../services/supabase';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function PrescriptionScreen({ navigation, route }) {
  const { appointmentId, patientName, patientId } = route.params || {};
  const [prescriptionText, setPrescriptionText] = useState('');

  const generatePdf = async (htmlContent) => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        width: 612,
        height: 792, // Standard A4 size
      });
      return uri;
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('PDF Generation Error', 'Could not generate PDF.');
      return null;
    }
  };

  const uploadPdfToSupabase = async (pdfUri, fileName) => {
    try {
      const response = await fetch(pdfUri);
      const blob = await response.blob();

      const { data, error } = await supabase.storage
        .from('prescriptions') // Assuming you have a bucket named 'prescriptions'
        .upload(fileName, blob, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const { data: publicUrlData } = supabase.storage.from('prescriptions').getPublicUrl(fileName);
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error('Error uploading PDF to Supabase:', error);
      Alert.alert('Upload Error', 'Could not upload prescription PDF.');
      return null;
    }
  };

  const handleSendPrescription = async () => {
    if (!prescriptionText.trim()) {
      Alert.alert('Error', 'Please enter prescription details.');
      return;
    }

    if (!appointmentId || !patientId) {
      Alert.alert('Error', 'Appointment ID or Patient ID is missing. Cannot send prescription.');
      return;
    }

    const htmlContent = `
      <h1>Prescription for ${patientName}</h1>
      <p><strong>Appointment ID:</strong> ${appointmentId}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
      <hr/>
      <p>${prescriptionText.replace(/\n/g, '<br/>')}</p>
      <hr/>
      <p>Doctor's Signature: _________________________</p>
    `;

    const pdfUri = await generatePdf(htmlContent);
    if (!pdfUri) return;

    const fileName = `prescription_${appointmentId}_${Date.now()}.pdf`;
    const publicUrl = await uploadPdfToSupabase(pdfUri, fileName);

    if (!publicUrl) return;

    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .insert([
          {
            appointment_id: appointmentId,
            patient_id: patientId, // Ensure patient_id is stored
            pdf_url: publicUrl,
            details: prescriptionText,
          },
        ]);

      if (error) {
        throw error;
      }

      Alert.alert(
        'Prescription Sent',
        `Prescription for ${patientName} (Appointment ID: ${appointmentId}) sent successfully!`
      );
      // Optionally share the PDF directly
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(pdfUri);
      }
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', 'Failed to send prescription: ' + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Prescription</Text>
      {patientName && <Text style={styles.infoText}>To: ${patientName}</Text>}
      {appointmentId && <Text style={styles.infoText}>Appointment ID: ${appointmentId}</Text>}

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

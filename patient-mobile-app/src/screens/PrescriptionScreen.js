import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../services/supabase';
import * as FileSystem from 'expo-file-system';
import * as WebBrowser from 'expo-web-browser';

export default function PrescriptionScreen({ navigation, route }) {
  const { prescriptionId } = route.params || {};
  const [prescriptionUrl, setPrescriptionUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrescription = async () => {
      if (!prescriptionId) {
        setError('No prescription ID provided.');
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('prescriptions')
          .select('pdf_url')
          .eq('id', prescriptionId)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setPrescriptionUrl(data.pdf_url);
        } else {
          setError('Prescription not found.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [prescriptionId]);

  const handleDownloadPrescription = async () => {
    if (prescriptionUrl) {
      try {
        const filename = `prescription_${prescriptionId}.pdf`;
        const downloadResumable = FileSystem.createDownloadResumable(
          prescriptionUrl,
          FileSystem.documentDirectory + filename
        );
        const { uri } = await downloadResumable.downloadAsync();
        Alert.alert('Download Complete', `Prescription saved to ${uri}`);
        await WebBrowser.openBrowserAsync(uri);
      } catch (e) {
        console.error(e);
        Alert.alert('Download Failed', 'Could not download or open the prescription.');
      }
    } else {
      Alert.alert('No Prescription', 'No prescription available to download.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading prescription...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prescription Details</Text>
      {prescriptionId ? (
        <>
          <Text style={styles.infoText}>Prescription ID: {prescriptionId}</Text>
          {prescriptionUrl ? (
            <>
              <Text style={styles.infoText}>View/Download your prescription:</Text>
              <Button title="Download Prescription" onPress={handleDownloadPrescription} />
            </>
          ) : (
            <Text>Prescription not found.</Text>
          )}
        </>
      ) : (
        <Text>No prescription selected.</Text>
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
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
});

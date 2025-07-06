import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
// import * as FileSystem from 'expo-file-system'; // Uncomment if actual file download is needed
// import * as WebBrowser from 'expo-web-browser'; // Uncomment if opening PDF in browser is needed

export default function PrescriptionScreen({ navigation, route }) {
  const { prescriptionId } = route.params || {};
  const [prescriptionUrl, setPrescriptionUrl] = useState(null); // Placeholder for PDF URL

  // In a real app, you would fetch the prescription URL based on prescriptionId
  // For now, let's simulate a URL
  React.useEffect(() => {
    if (prescriptionId) {
      setPrescriptionUrl(`https://example.com/prescriptions/${prescriptionId}.pdf`);
    }
  }, [prescriptionId]);

  const handleDownloadPrescription = async () => {
    if (prescriptionUrl) {
      Alert.alert('Download Started', 'Simulating prescription download...');
      // In a real app, you would use expo-file-system to download the file
      /*
      try {
        const downloadResumable = FileSystem.createDownloadResumable(
          prescriptionUrl,
          FileSystem.documentDirectory + `prescription_${prescriptionId}.pdf`
        );
        const { uri } = await downloadResumable.downloadAsync();
        console.log('Finished downloading to ', uri);
        Alert.alert('Download Complete', `Prescription saved to ${uri}`);
        // Optionally open the PDF
        // await WebBrowser.openBrowserAsync(uri);
      } catch (e) {
        console.error(e);
        Alert.alert('Download Failed', 'Could not download the prescription.');
      }
      */
    } else {
      Alert.alert('No Prescription', 'No prescription available to download.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prescription Details</Text>
      {prescriptionId ? (
        <>
          <Text style={styles.infoText}>Prescription ID: {prescriptionId}</Text>
          {prescriptionUrl ? (
            <>
              <Text style={styles.infoText}>View/Download your prescription:</Text>
              <Button title="Download Prescription (Simulated)" onPress={handleDownloadPrescription} />
              {/* In a real app, you might embed a PDF viewer or link to open in browser */}
            </>
          ) : (
            <Text>Loading prescription...</Text>
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

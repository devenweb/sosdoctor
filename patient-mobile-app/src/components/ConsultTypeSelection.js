import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CONSULT_TYPES } from '../constants/AppointmentConstants';

export default function ConsultTypeSelection({ consultType, setConsultType }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Select Consult Type:</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Video Consult"
          onPress={() => setConsultType(CONSULT_TYPES.VIDEO)}
          disabled={consultType === CONSULT_TYPES.VIDEO}
        />
        <Button
          title="Chat Consult"
          onPress={() => setConsultType(CONSULT_TYPES.CHAT)}
          disabled={consultType === CONSULT_TYPES.CHAT}
        />
      </View>
      {consultType && <Text>Selected Type: {consultType}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
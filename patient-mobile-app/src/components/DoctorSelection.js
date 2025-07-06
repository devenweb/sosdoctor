import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDoctors } from '../hooks/useDoctors';

export default function DoctorSelection({ selectedDoctor, setSelectedDoctor }) {
  const { doctors, loading: doctorsLoading, error: doctorsError } = useDoctors();

  return (
    <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 10,
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
});
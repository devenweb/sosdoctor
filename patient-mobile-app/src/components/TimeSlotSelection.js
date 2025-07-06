import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTimeSlots } from '../hooks/useTimeSlots';

export default function TimeSlotSelection({ selectedDoctor, selectedTimeSlot, setSelectedTimeSlot }) {
  const { timeSlots, loading: timeSlotsLoading, error: timeSlotsError } = useTimeSlots(selectedDoctor?.id);

  return (
    <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 10,
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
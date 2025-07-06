import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Doctor Home Screen</Text>
      <Button title="View Appointments" onPress={() => navigation.navigate('Appointments')} />
    </View>
  );
}
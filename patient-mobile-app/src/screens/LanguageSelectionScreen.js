import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LanguageSelectionScreen({ navigation }) {
  const selectLanguage = async (language) => {
    await AsyncStorage.setItem('selectedLanguage', language);
    console.log(`Selected language: ${language}`);
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Language</Text>
      <Button title="English" onPress={() => selectLanguage('en')} />
      <Button title="Français" onPress={() => selectLanguage('fr')} />
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
});

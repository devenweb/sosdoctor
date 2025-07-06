import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function FileAttachmentScreen({ navigation, route }) {
  const { appointmentId } = route.params || {};
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUploadFile = () => {
    if (image) {
      // In a real app, you would upload the image to a storage service (e.g., Supabase Storage)
      Alert.alert('File Uploaded', `File attached for appointment ${appointmentId}.`);
      console.log('Uploading file:', image);
      navigation.goBack(); // Go back to the previous screen (VideoCall or Chat)
    } else {
      Alert.alert('No File Selected', 'Please select a file to upload.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attach Files</Text>
      {appointmentId && <Text>Appointment ID: {appointmentId}</Text>}

      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      <Button title="Upload File" onPress={handleUploadFile} disabled={!image} />
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
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
    resizeMode: 'contain',
  },
});

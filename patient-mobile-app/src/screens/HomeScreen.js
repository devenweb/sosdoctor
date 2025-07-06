import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { signOut, session } = useAuth();

  useEffect(() => {
    if (!session) {
      navigation.navigate('Auth');
    }
  }, [session, navigation]);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}
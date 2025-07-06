import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function AuthScreen({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { isSignUp } = route.params || { isSignUp: false }; // Default to false if not provided

  const { signUp, signIn } = useAuth();

  const handleSignUp = async () => {
    setLoading(true);
    setError('');
    try {
      const { error } = await signUp(email, password);
      if (error) throw error;
      Alert.alert('Success', 'Account created! Please check your email for verification.');
      navigation.navigate('ProfileSetup'); // Navigate to profile setup after successful sign-up
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      navigation.navigate('Home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, width: '100%' }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 20, width: '100%' }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
      <Button title={loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')} onPress={isSignUp ? handleSignUp : handleSignIn} disabled={loading} />
    </View>
  );
}
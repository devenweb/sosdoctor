import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import LanguageSelectionScreen from './src/screens/LanguageSelectionScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import VideoCallScreen from './src/screens/VideoCallScreen';
import ChatScreen from './src/screens/ChatScreen';
import FileAttachmentScreen from './src/screens/FileAttachmentScreen';
import PrescriptionScreen from './src/screens/PrescriptionScreen';
import { AuthProvider } from './src/context/AuthContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LanguageSelection">
          <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
          <Stack.Screen name="VideoCall" component={VideoCallScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
          <Stack.Screen name="FileAttachment" component={FileAttachmentScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Prescription" component={PrescriptionScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
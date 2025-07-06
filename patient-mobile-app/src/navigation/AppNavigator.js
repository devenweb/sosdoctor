import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LanguageSelectionScreen from '../screens/LanguageSelectionScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthScreen from '../screens/AuthScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import HomeScreen from '../screens/HomeScreen';
import PaymentScreen from '../screens/PaymentScreen';
import VideoCallScreen from '../screens/VideoCallScreen';
import ChatScreen from '../screens/ChatScreen';
import FileAttachmentScreen from '../screens/FileAttachmentScreen';
import PrescriptionScreen from '../screens/PrescriptionScreen';
import AppointmentBookingScreen from '../screens/AppointmentBookingScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
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
        <Stack.Screen name="AppointmentBooking" component={AppointmentBookingScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function ChatScreen({ navigation, route }) {
  const { appointmentId } = route.params || {};
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: messages.length.toString(), text: message, sender: 'patient' }]);
      setMessage('');
      // Simulate doctor response
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { id: (prevMessages.length).toString(), text: `Doctor: ${message}`, sender: 'doctor' }]);
      }, 1000);
    }
  };

  const handleAttachFiles = () => {
    navigation.navigate('FileAttachment', { appointmentId });
  };

  const handleEndSession = () => {
    // In a real app, you would update appointment status in Supabase
    alert('Chat session ended.');
    navigation.goBack(); // Or navigate to a session summary screen
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <Text style={styles.title}>Chat with Doctor</Text>
      {appointmentId && <Text>Appointment ID: {appointmentId}</Text>}

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === 'patient' ? styles.patientBubble : styles.doctorBubble]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        style={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.messageInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>

      <View style={styles.actionButtons}>
        <Button title="Attach Files" onPress={handleAttachFiles} />
        <Button title="End Session" onPress={handleEndSession} color="red" />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  messageList: {
    flex: 1,
    marginBottom: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
    maxWidth: '80%',
  },
  patientBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  doctorBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

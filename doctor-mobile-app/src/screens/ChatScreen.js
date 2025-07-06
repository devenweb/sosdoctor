import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/AuthContext';
import { APPOINTMENT_STATUS } from '../constants/AppointmentConstants';

export default function ChatScreen({ navigation, route }) {
  const { appointmentId, patientName } = route.params || {};
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { session } = useAuth();

  useEffect(() => {
    if (!appointmentId) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('appointment_id', appointmentId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data);
      }
    };

    fetchMessages();

    const messageListener = supabase
      .channel(`chat_${appointmentId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `appointment_id=eq.${appointmentId}` }, payload => {
        setMessages(prevMessages => [...prevMessages, payload.new]);
      })
      .subscribe();

    return () => {
      messageListener.unsubscribe();
    };
  }, [appointmentId]);

  const handleSendMessage = async () => {
    if (message.trim() && session?.user?.id) {
      const { error } = await supabase.from('messages').insert({
        appointment_id: appointmentId,
        sender_id: session.user.id,
        content: message,
        sender_type: 'doctor',
      });

      if (error) {
        console.error('Error sending message:', error);
        Alert.alert('Error', 'Failed to send message.');
      } else {
        setMessage('');
      }
    }
  };

  const handleEndSession = async () => {
    if (!appointmentId) return;

    const { error } = await supabase
      .from('appointments')
      .update({ status: APPOINTMENT_STATUS.COMPLETED })
      .eq('id', appointmentId);

    if (error) {
      console.error('Error ending session:', error);
      Alert.alert('Error', 'Failed to end session.');
    } else {
      Alert.alert('Chat session ended.');
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <Text style={styles.title}>Chat with {patientName}</Text>
      {appointmentId && <Text>Appointment ID: {appointmentId}</Text>}

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender_type === 'doctor' ? styles.doctorBubble : styles.patientBubble]}>
            <Text style={styles.messageText}>{item.content}</Text>
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

      <Button title="End Session" onPress={handleEndSession} color="red" />
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
  doctorBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  patientBubble: {
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
});

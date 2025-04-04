import React from 'react';
import { View, Text, Button } from 'react-native';
import { useMQTT } from '../hooks/useMQTT.jsx';

export default function Index() {
  const { sendMessage, message, isConnected } = useMQTT();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Status: {isConnected ? '✅ Connected' : '❌ Disconnected'}</Text>
      <Button title="Send Message" onPress={() => sendMessage('Hello MQTT!')} />
      {message ? (
        <Text>Last Message: {message}</Text>
      ) : (
        <Text>No message received yet</Text>
      )}
    </View>
  );
}

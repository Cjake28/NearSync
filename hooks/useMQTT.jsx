import { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const BROKER_URL = 'ws://192.168.100.134:8083/mqtt';  // Use your machine's local IP
const MQTT_USERNAME = 'mqtt_user5'; 
const MQTT_PASSWORD = 'YOUR_PASSWORD'; 
const MQTT_TOPIC = 'test/topic'; 

export const useMQTT = () => {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const options = {
      username: MQTT_USERNAME,
      password: MQTT_PASSWORD,
      reconnectPeriod: 1000,     // Auto-reconnect every 1 sec
      clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
      protocolId: 'MQTT',
      protocolVersion: 4,         // MQTT 3.1.1
      keepalive: 60,              // Keep connection alive
      clean: true                 // Clean session
    };

    const mqttClient = mqtt.connect(BROKER_URL, options);

    mqttClient.on('connect', () => {
      console.log('✅ Connected to EMQX');
      setIsConnected(true);
      mqttClient.subscribe(MQTT_TOPIC, (err) => {
        if (err) console.error('Subscribe error:', err);
      });
    });

    mqttClient.on('message', (topic, payload) => {
      console.log(`📩 Message from ${topic}:`, payload.toString());
      setMessage(payload.toString());
    });

    mqttClient.on('error', (err) => console.error('MQTT error:', err));

    mqttClient.on('close', () => {
      console.log('❌ Disconnected from EMQX');
      setIsConnected(false);
    });

    setClient(mqttClient);

    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, [BROKER_URL, MQTT_USERNAME, MQTT_PASSWORD]);   // Include dependencies

  const sendMessage = (msg) => {
    if (client && isConnected) {
      client.publish(MQTT_TOPIC, msg);
      console.log('📤 Message sent:', msg);
    }
  };

  return { sendMessage, message, isConnected };
};

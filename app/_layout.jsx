import "../global.css"
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

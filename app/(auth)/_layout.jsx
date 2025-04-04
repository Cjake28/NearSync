import { Slot } from 'expo-router';
import { View, StatusBar } from 'react-native';

export default function Layout() {
  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      <Slot /> {/* <- THIS is required to render child screens like /signin or /verify */}
    </View>
  );
}
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Simulate a loading state or add auth check logic
    const timer = setTimeout(() => {
      const isAuthenticated = false; // Replace with auth logic
      if (isAuthenticated) {
        router.replace('/map');   // Go to map if logged in
      } else {
        router.replace('/auth/signin');  // Go to signin if not logged in
      }
    }, 1000); // 1-second delay for loading effect

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-background">
      <ActivityIndicator size="large" color="#10B981" />
    </View>
  );
}

import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import useAuthStore from '../store/authStore.jsx';

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, isverifying } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
          router.replace('/map'); // Authenticated and verified

      } else {
        if (isverifying) {
          router.replace('/verify'); // If verifying, go to verify

        } else{
        router.replace('/signin'); // Not logged in
        
        }
      }
    }, 100); // Delay a bit for layout to finish loading

    return () => clearTimeout(timer);
  }, [isAuthenticated, isverifying]);

  return (
    <View className="flex-1 justify-center items-center bg-background">
      <ActivityIndicator size="large" color="#10B981" />
    </View>
  );
}

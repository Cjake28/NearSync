import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useAuthStore from '../../store/authStore'; // Adjust path if needed

export default function Verify(){
  const router = useRouter();
  const { verifyCode, isLoading, error } = useAuthStore(); // Make sure verifyCode is implemented

  const [code, setCode] = useState(["", "", "", "", "", ""]); // 6-digit OTP
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) return; // Allow only 1 digit

    let newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus(); // Move to next input
    } else if (!text && index > 0) {
      inputs.current[index - 1]?.focus(); // Move to previous input on delete
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join("");
    if (fullCode.length < 6) {
      Alert.alert("Incomplete Code", "Please enter all six digits.");
      return;
    }

    const success = await verifyCode(fullCode);
    if (success) {
      router.replace("/"); // Navigate after verification
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 justify-center items-center bg-background p-6"
    >
      {/* Back Button */}
      <Pressable onPress={() => router.back()} className="absolute top-12 left-6">
        <Ionicons name="arrow-back" size={24} color="#1E293B" />
      </Pressable>

      {/* Title */}
      <Text className="text-2xl font-bold text-text mb-2">Email Verification</Text>
      <Text className="text-sm text-gray-500 mb-6">We have sent a 6-digit code to your email: dm***nko@gmail.com</Text>

      {/* OTP Input (6 Digits) */}
      <View className="flex-row justify-center mb-6 space-x-3">
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg bg-white"
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace" && !code[index] && index > 0) {
                inputs.current[index - 1]?.focus();
              }
            }}
          />
        ))}
      </View>

      {/* Resend */}
      <Pressable>
        <Text className="text-sm text-primary mb-6">Didn’t receive a code? <Text className="font-bold">Resend</Text></Text>
      </Pressable>

      {/* Verify Button */}
      <Pressable
        className="bg-primary py-4 rounded-full items-center w-4/5 shadow-lg active:opacity-80"
        onPress={handleVerify}
      >
        <Text className="text-lg font-bold text-white">
          {isLoading ? "Verifying..." : "Verify Account"}
        </Text>
      </Pressable>

      {error && <Text className="text-center text-red-500 mt-4">{error}</Text>}
    </KeyboardAvoidingView>
  );
};


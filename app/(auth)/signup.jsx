import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const SignUp = () => {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    return (
        <View className="flex-1 justify-center bg-background p-6">
            <Text className="text-3xl font-extrabold text-center text-text mb-10">
                Create an Account 🚀
            </Text>

            {/* Full Name Input */}
            <View className="mb-6">
                <View className="flex-row items-center border border-gray-300 px-4 py-3 rounded-full bg-white shadow-sm">
                    <MaterialIcons name="person" size={22} color="#555" />
                    <TextInput 
                        className="flex-1 text-text ml-3 text-base"
                        placeholder="First Name"
                        placeholderTextColor="#777" 
                        autoCapitalize="words"
                    />
                </View>
            </View>

            {/* Email Input */}
            <View className="mb-6">
                <View className="flex-row items-center border border-gray-300 px-4 py-3 rounded-full bg-white shadow-sm">
                    <MaterialIcons name="email" size={22} color="#555" />
                    <TextInput 
                        className="flex-1 text-text ml-3 text-base"
                        placeholder="Email Address"
                        placeholderTextColor="#777"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
            </View>

            {/* Password Input */}
            <View className="mb-6">
                <View className="flex-row items-center border border-gray-300 px-4 py-3 rounded-full bg-white shadow-sm">
                    <Ionicons name="lock-closed" size={22} color="#555" />
                    <TextInput 
                        className="flex-1 text-text ml-3 text-base"
                        placeholder="Password"
                        placeholderTextColor="#777"
                        secureTextEntry={!passwordVisible} 
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                        <Ionicons 
                            name={passwordVisible ? "eye" : "eye-off"} 
                            size={22} 
                            color="#555" 
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Confirm Password Input */}
            <View className="mb-6">
                <View className="flex-row items-center border border-gray-300 px-4 py-3 rounded-full bg-white shadow-sm">
                    <Ionicons name="lock-closed" size={22} color="#555" />
                    <TextInput 
                        className="flex-1 text-text ml-3 text-base"
                        placeholder="Confirm Password"
                        placeholderTextColor="#777"
                        secureTextEntry={!confirmPasswordVisible} 
                    />
                    <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                        <Ionicons 
                            name={confirmPasswordVisible ? "eye" : "eye-off"} 
                            size={22} 
                            color="#555" 
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Sign Up Button */}
            <Pressable 
                className="bg-primary py-4 rounded-full items-center w-4/5 self-center mt-6 shadow-lg active:opacity-80"
                onPress={() => router.push("/locationpermissionscreen")}
            >
                <Text className="text-lg font-bold text-white">Sign Up</Text>
            </Pressable>

            {/* Already have an account? */}
            <View className="mt-8 flex-row self-center">
                <Text className="text-gray-500">Already have an account?</Text>
                <Pressable onPress={() => router.push("/signin")}>
                    <Text className="text-secondary font-medium ml-1">Sign In</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default SignUp;

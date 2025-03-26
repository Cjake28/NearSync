import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const SignIn = () => {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <View className="flex-1 justify-center bg-background p-6">
            <Text className="text-3xl font-extrabold text-center text-text mb-10">
                Welcome Back! 👋
            </Text>

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

            {/* <Pressable onPress={() => router.push("/forgotpassword")}>
                <Text className="text-secondary text-sm text-center underline">
                    Forgot Password?
                </Text>
            </Pressable> */}

            <Pressable 
                className="bg-primary py-4  rounded-full 1 items-center w-4/5 self-center mt-6 shadow-lg active:opacity-80"
                onPress={() => router.replace("/homepage")}
            >
                <Text className="text-lg font-bold text-white">Sign In</Text>
            </Pressable>

            
            <View className= 'mt-8 flex-row self-center '>
                <Text className="text-gray-500">Don't have an account?</Text>
                <Pressable
                   onPress={() => router.push("/signup")}
                >
                    <Text className="text-secondary font-medium">Signup</Text>
                </Pressable>
                </View>
           
        </View>
    );
};

export default SignIn;

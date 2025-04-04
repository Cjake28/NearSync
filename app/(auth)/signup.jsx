import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import useAuthStore from '../../store/authStore';

const SignUp = () => {
    const { signup, isLoading, error, isverifying } = useAuthStore();
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const [FirstName, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSignup = async () => {
        console.log('signup')
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }
        console.log('signup(1)')
        setPasswordError(""); // Clear any previous error
        await signup(FirstName, email, password);
        if (isverifying) router.push('/verify');
    };

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
                        value={FirstName}
                        onChangeText={setFirstname}
                        
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
                        value={email}
                        onChangeText={setEmail}
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
                        value={password}
                        onChangeText={setPassword}
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
                        value={confirmPassword}
                        onChangeText={setConfirmPassword} 
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
                onPress={handleSignup}
            >
                <Text className="text-lg font-bold text-white">{isLoading ? 'Loading...' : 'Sign Up'}</Text>
            </Pressable>

            {error && (
                <Text className="text-center text-red-500 mt-4">{error}</Text>
            )}

            {passwordError !== '' && (
                <Text className="text-red-500 text-sm text-center -mt-4 mb-4">
                    {passwordError}
                </Text>
            )}

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

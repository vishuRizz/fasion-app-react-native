import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Pressable, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Animated,
  Dimensions
} from 'react-native';
import { Link, router } from 'expo-router';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Animations
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];
  const slideFormAnim = useState(new Animated.Value(100))[0];
  const logoScaleAnim = useState(new Animated.Value(0.8))[0];
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideFormAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(logoScaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const validateEmail = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(text));
  };

  return (
    <View className="flex-1 bg-[#f4e3b2]">
      <StatusBar style="dark" />
      
      {/* Header with larger app name */}
      <View className="pt-12 pb-3">
        <View className="flex-row items-center justify-between px-5">
          {/* Back button */}
          <Pressable 
            className="w-10 h-10 flex items-center justify-center"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#74070e" />
          </Pressable>
          
          {/* Larger app name */}
          <Text className="text-2xl font-bold text-red-900 tracking-wide">LENT IT</Text>
          
          {/* Empty view for balance */}
          <View className="w-10" />
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Main content - removed the animated logo */}
          <Animated.View 
            className="bg-white rounded-t-3xl px-8 pt-12 flex-1 shadow-2xl mt-16"
            style={{ transform: [{ translateY: slideFormAnim }] }}
          >
            <Text className="text-3xl font-bold text-gray-800 mb-1">Welcome Back</Text>
            <Text className="text-base text-gray-500 mb-10">Sign in to continue your fashion journey</Text>
            
            {/* Email input */}
            <View className="mb-5">
              <Text className="text-sm font-semibold text-gray-700 mb-2">Email</Text>
              <View className={`bg-[#f4e3b2] bg-opacity-30 rounded-xl flex-row items-center px-4 h-14 ${isEmailValid ? 'border-2 border-green-500' : 'border border-red-900 border-opacity-20'}`}>
                <MaterialIcons name="email" size={20} color={isEmailValid ? "#22c55e" : "#74070e"} />
                <TextInput
                  className="flex-1 text-base text-gray-800 ml-2"
                  value={email}
                  onChangeText={validateEmail}
                  placeholder="your@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {isEmailValid && 
                  <View className="bg-green-500 rounded-full w-6 h-6 flex items-center justify-center">
                    <MaterialIcons name="check" size={16} color="#ffffff" />
                  </View>
                }
              </View>
            </View>
            
            {/* Password input */}
            <View className="mb-5">
              <Text className="text-sm font-semibold text-gray-700 mb-2">Password</Text>
              <View className="bg-[#f4e3b2] bg-opacity-30 rounded-xl flex-row items-center px-4 h-14 border border-red-900 border-opacity-20">
                <MaterialIcons name="lock" size={20} color="#74070e" />
                <TextInput
                  className="flex-1 text-base text-gray-800 ml-2"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#74070e" />
                </Pressable>
              </View>
            </View>
            
            {/* Forgot password */}
            <View className="flex-row justify-end mb-6">
              <TouchableOpacity>
                <Text className="text-red-900 text-sm font-semibold">Forgot password?</Text>
              </TouchableOpacity>
            </View>
            
            {/* Login button - enhanced with gradient effect */}
            <TouchableOpacity 
              className="bg-gradient-to-r from-red-800 to-red-900 rounded-xl h-14 flex justify-center items-center shadow-lg mt-2 mb-8"
              onPress={() => router.push('/home')}
              style={{
                shadowColor: "#74070e",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <Text className="text-white text-base font-bold tracking-wide">SIGN IN</Text>
            </TouchableOpacity>
            
            {/* Divider */}
            <View className="flex-row items-center mb-8">
              <View className="flex-1 h-px bg-red-900 opacity-20"></View>
              <Text className="text-gray-500 mx-4 text-sm">OR CONTINUE WITH</Text>
              <View className="flex-1 h-px bg-red-900 opacity-20"></View>
            </View>
            
            {/* Social login - enhanced with subtle animations */}
            <View className="flex-row justify-center mb-8">
              <TouchableOpacity 
                className="w-14 h-14 rounded-full bg-white flex justify-center items-center mx-3 shadow-md border border-gray-100"
                style={{ elevation: 3 }}
              >
                <FontAwesome name="google" size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity 
                className="w-14 h-14 rounded-full bg-white flex justify-center items-center mx-3 shadow-md border border-gray-100"
                style={{ elevation: 3 }}
              >
                <FontAwesome name="facebook" size={24} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity 
                className="w-14 h-14 rounded-full bg-white flex justify-center items-center mx-3 shadow-md border border-gray-100"
                style={{ elevation: 3 }}
              >
                <FontAwesome name="apple" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            
            {/* Sign up link */}
            <View className="flex-row justify-center items-center pb-8">
              <Text className="text-gray-600 mr-1">Don't have an account?</Text>
              <Link href="/sign-up" asChild>
                <TouchableOpacity>
                  <Text className="text-red-900 font-bold">Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
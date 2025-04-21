import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Pressable, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateName = (text: string) => {
    setName(text);
    setIsNameValid(text.length > 2);
  };

  const validateEmail = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(text));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#f4e3b2]"
    >
      <ScrollView className="flex-1">
        {/* Header with back button */}
        <View className="flex-row items-center justify-between p-5 pt-12">
          <Pressable 
            className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full"
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back-ios" size={18} color="#74070e" />
          </Pressable>
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-red-900 rounded-md flex items-center justify-center">
              <Text className="text-white text-xl font-bold">L</Text>
            </View>
            <Text className="text-lg font-bold text-red-900 ml-2">LENT-IT</Text>
          </View>
          <View className="w-10" />
        </View>
        
        {/* Main content */}
        <View className="px-6 pt-6 flex-1">
          <Text className="text-3xl font-bold text-gray-800 mb-1">Create Account</Text>
          <Text className="text-base text-gray-500 mb-8">Join our fashion community</Text>
          
          {/* Name input */}
          <View className="mb-5">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Full Name</Text>
            <View className="bg-gray-50 rounded-xl flex-row items-center px-4 h-14 border border-gray-200">
              <MaterialIcons name="person" size={20} color="#74070e" />
              <TextInput
                className="flex-1 text-base text-gray-800 ml-2"
                value={name}
                onChangeText={validateName}
                placeholder="Enter your name"
              />
              {isNameValid && <MaterialIcons name="check-circle" size={20} color="#22c55e" />}
            </View>
          </View>
          
          {/* Email input */}
          <View className="mb-5">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Email</Text>
            <View className="bg-gray-50 rounded-xl flex-row items-center px-4 h-14 border border-gray-200">
              <MaterialIcons name="email" size={20} color="#74070e" />
              <TextInput
                className="flex-1 text-base text-gray-800 ml-2"
                value={email}
                onChangeText={validateEmail}
                placeholder="your@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {isEmailValid && <MaterialIcons name="check-circle" size={20} color="#22c55e" />}
            </View>
          </View>
          
          {/* Password input */}
          <View className="mb-5">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Password</Text>
            <View className="bg-gray-50 rounded-xl flex-row items-center px-4 h-14 border border-gray-200">
              <MaterialIcons name="lock" size={20} color="#74070e" />
              <TextInput
                className="flex-1 text-base text-gray-800 ml-2"
                value={password}
                onChangeText={setPassword}
                placeholder="Create a secure password"
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={20} color="#74070e" />
              </Pressable>
            </View>
            <Text className="text-xs text-gray-500 mt-1.5">Must be at least 8 characters</Text>
          </View>
          
          {/* Terms & Conditions */}
          <View className="flex-row items-center mb-6">
            <MaterialIcons name="check-box-outline-blank" size={20} color="#74070e" />
            <Text className="text-gray-600 ml-2 text-sm">
              I agree to the <Text className="text-red-900 font-medium">Terms of Service</Text> and <Text className="text-red-900 font-medium">Privacy Policy</Text>
            </Text>
          </View>
          
          {/* Sign up button */}
          <TouchableOpacity 
            className="bg-red-900 rounded-xl h-14 flex justify-center items-center shadow-lg mt-2 mb-8"
            onPress={() => router.push('/home')}
          >
            <Text className="text-white text-base font-bold tracking-wide">CREATE ACCOUNT</Text>
          </TouchableOpacity>
          
          {/* Divider */}
          <View className="flex-row items-center mb-8">
            <View className="flex-1 h-px bg-gray-300"></View>
            <Text className="text-gray-500 mx-4 text-sm">OR SIGN UP WITH</Text>
            <View className="flex-1 h-px bg-gray-300"></View>
          </View>
          
          {/* Social login */}
          <View className="flex-row justify-center mb-8">
            <TouchableOpacity className="w-14 h-14 rounded-full bg-white flex justify-center items-center mx-3 shadow-md border border-gray-100">
              <FontAwesome name="google" size={24} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity className="w-14 h-14 rounded-full bg-white flex justify-center items-center mx-3 shadow-md border border-gray-100">
              <FontAwesome name="facebook" size={24} color="#4267B2" />
            </TouchableOpacity>
            <TouchableOpacity className="w-14 h-14 rounded-full bg-white flex justify-center items-center mx-3 shadow-md border border-gray-100">
              <FontAwesome name="apple" size={24} color="#000000" />
            </TouchableOpacity>
          </View>
          
          {/* Sign in link */}
          <View className="flex-row justify-center items-center mb-8">
            <Text className="text-gray-600 mr-1">Already have an account?</Text>
            <Link href="/sign-in" asChild>
              <TouchableOpacity>
                <Text className="text-red-900 font-bold">Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
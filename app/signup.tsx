import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { useAuth } from '../context/AuthContext'
import { router } from 'expo-router'

export default function SignupScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [signupComplete, setSignupComplete] = useState(false)
  const [verificationEmail, setVerificationEmail] = useState('')
  const { signUp } = useAuth()
  
  const handleSignup = async () => {
    console.log("Sign up button pressed");
    
    if (!email || !password || !confirmPassword) {
      console.log("Validation failed: empty fields");
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      console.log("Validation failed: passwords don't match");
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
  
    console.log("Starting signup process...");
    try {
      setIsLoading(true);
      console.log("Calling Supabase signUp with email:", email);
      
      // Get the data from signup
      const { user, session } = await signUp(email, password);
      console.log("Signup response:", { user, session });
      
      if (user && !session) {
        // Email verification is required - show verification screen
        setVerificationEmail(email);
        setSignupComplete(true);
      } else if (session) {
        // Auto-confirmation is enabled, redirect to home
        Alert.alert(
          'Account Created',
          'Your account has been created successfully!',
          [{ text: 'OK', onPress: () => router.replace('/') }]
        );
      } else {
        // Something unexpected happened
        Alert.alert(
          'Signup Issue',
          'There was an issue with your signup. Please try again.',
          [{ text: 'OK' }]
        );
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      
      // Handle specific error cases
      if (error.message?.includes('already registered')) {
        Alert.alert(
          'Email Already Registered',
          'This email is already registered. Please login or reset your password.',
          [{ text: 'OK', onPress: () => router.replace('/login') }]
        );
      } else {
        Alert.alert('Signup Failed', error.message || 'An error occurred during signup');
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Show verification screen after successful signup
  if (signupComplete) {
    return (
      <View className="justify-center flex-1 p-6 bg-white">
        <Text className="mb-6 text-3xl font-bold text-center">Verify Your Email</Text>
        
        <View className="items-center justify-center p-6 mb-6 rounded-lg bg-blue-50">
          <Text className="mb-4 text-lg text-center text-blue-800">
            We've sent a verification email to:
          </Text>
          <Text className="mb-6 text-xl font-bold text-center text-blue-800">
            {verificationEmail}
          </Text>
          <Text className="text-sm text-center text-gray-700">
            Please check your inbox and click the verification link to complete your registration.
          </Text>
        </View>
        
        <TouchableOpacity 
          className="p-3 mb-4 bg-blue-500 rounded-lg"
          onPress={() => router.replace('/login')}
        >
          <Text className="font-semibold text-center text-white">
            Go to Login
          </Text>
        </TouchableOpacity>
        
        <Text className="mt-6 text-sm text-center text-gray-500">
          Didn't receive the email? Check your spam folder or try again with a different email address.
        </Text>
      </View>
    );
  }

  // Show signup form
  return (
    <View className="justify-center flex-1 p-6 bg-white">
      <Text className="mb-6 text-3xl font-bold text-center">Create Account</Text>
      
      <TextInput
        className="p-3 mb-4 border border-gray-300 rounded-lg"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput
        className="p-3 mb-4 border border-gray-300 rounded-lg"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TextInput
        className="p-3 mb-6 border border-gray-300 rounded-lg"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      <TouchableOpacity 
        className={`p-3 rounded-lg mb-4 ${isLoading ? 'bg-blue-300' : 'bg-blue-500'}`}
        onPress={handleSignup}
        disabled={isLoading}
        activeOpacity={0.7}
      >
        {isLoading ? (
          <View className="flex-row items-center justify-center">
            <ActivityIndicator size="small" color="white" />
            <Text className="ml-2 font-semibold text-center text-white">
              Creating account...
            </Text>
          </View>
        ) : (
          <Text className="font-semibold text-center text-white">
            Sign Up
          </Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text className="mt-6 text-center text-blue-500">
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  )
}
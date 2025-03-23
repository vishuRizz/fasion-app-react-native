// app/login.tsx
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useAuth } from '../context/AuthContext'
import { router } from 'expo-router'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    try {
      setIsLoading(true)
      await signIn(email, password)
      router.replace('/')
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="justify-center flex-1 p-6 bg-white">
      <Text className="mb-6 text-3xl font-bold text-center">Login</Text>
      
      <TextInput
        className="p-3 mb-4 border border-gray-300 rounded-lg"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput
        className="p-3 mb-6 border border-gray-300 rounded-lg"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity 
        className={`p-3 rounded-lg mb-4 ${isLoading ? 'bg-blue-300' : 'bg-blue-500'}`}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text className="font-semibold text-center text-white">
          {isLoading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text className="mt-6 text-center text-blue-500">
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  )
}
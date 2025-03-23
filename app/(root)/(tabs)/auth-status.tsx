// app/index.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useAuth } from '../../../context/AuthContext'
import { Redirect } from 'expo-router'

export default function HomeScreen() {
  const { user, loading, signOut } = useAuth()
  
  // Show loading screen while checking auth
  if (loading) {
    return (
      <View className="items-center justify-center flex-1">
        <Text>Loading...</Text>
      </View>
    )
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Redirect href="/login" />
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }
  
  return (
    <View className="items-center justify-center flex-1 p-6">
      <Text className="mb-4 text-2xl font-bold">Welcome!</Text>
      <Text className="mb-6">You are logged in as: {user?.email}</Text>
      
      <TouchableOpacity
        className="p-3 bg-red-500 rounded-lg"
        onPress={handleSignOut}
      >
        <Text className="font-semibold text-white">Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}
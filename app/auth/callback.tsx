import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log("Auth callback params:", params);
        
        // Let Supabase handle the auth state
        const { data, error } = await supabase.auth.refreshSession();
        
        if (error) {
          console.error("Error in auth callback:", error);
          // Navigate to login after a short delay
          setTimeout(() => router.replace('/login'), 1000);
          return;
        }
        
        if (data.session) {
          console.log("Auth successful, redirecting to home");
          
          // Navigate to home page
          setTimeout(() => router.replace('/'), 500);
        } else {
          console.log("No session found, redirecting to login");
          setTimeout(() => router.replace('/login'), 500);
        }
      } catch (err) {
        console.error("Unexpected error in auth callback:", err);
        setTimeout(() => router.replace('/login'), 1000);
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <View className="items-center justify-center flex-1 p-6 bg-white">
      <ActivityIndicator size="large" color="#4285F4" />
      <Text className="mt-4 text-lg text-center">
        Completing authentication...
      </Text>
    </View>
  );
}
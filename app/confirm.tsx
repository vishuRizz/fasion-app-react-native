import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export default function ConfirmScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useLocalSearchParams();
  const { user, session } = useAuth();
  
  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        console.log("Confirm screen mounted, params:", params);
        setLoading(true);
        
        // If we already have a session, we're good to go
        if (session) {
          console.log("User already has a session, redirecting to home");
          router.replace('/');
          return;
        }
        
        // Try to refresh the session in case the auth state hasn't been updated yet
        const { data, error } = await supabase.auth.refreshSession();
        
        if (error) {
          console.error("Error refreshing session:", error);
          setError("Couldn't verify your account. Please try logging in.");
          setTimeout(() => router.replace('/login'), 3000);
          return;
        }
        
        if (data.session) {
          console.log("Session confirmed successfully:", data.session.user.email);
          // Success! Redirect to home
          setTimeout(() => router.replace('/'), 1000);
        } else {
          console.log("No session after confirmation attempt");
          setError("Verification link may have expired. Please try logging in.");
          setTimeout(() => router.replace('/login'), 3000);
        }
      } catch (error) {
        console.error("Error during confirmation:", error);
        setError("An error occurred. Please try logging in.");
        setTimeout(() => router.replace('/login'), 3000);
      } finally {
        setLoading(false);
      }
    };
    
    handleEmailConfirmation();
  }, [params, session, router]);
  
  if (error) {
    return (
      <View className="items-center justify-center flex-1 p-6">
        <Text className="mb-4 text-xl font-bold text-red-500">Verification Failed</Text>
        <Text className="text-center">{error}</Text>
        <Text className="mt-4 text-center">Redirecting you to login...</Text>
      </View>
    );
  }
  
  return (
    <View className="items-center justify-center flex-1 p-6">
      <ActivityIndicator size="large" color="#0096FF" />
      <Text className="mt-6 text-xl font-bold">Verifying your account</Text>
      <Text className="mt-2 text-center text-gray-600">
        {loading ? "Please wait while we confirm your account..." : "Success! Redirecting you..."}
      </Text>
    </View>
  );
}
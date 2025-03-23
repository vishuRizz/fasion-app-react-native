import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Platform, Linking } from 'react-native';
import Constants from 'expo-constants';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ user: User | null; session: Session | null }>;
  signIn: (email: string, password: string) => Promise<{ user: User | null; session: Session | null }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

// Get your app's deep link URL scheme from app.json
const scheme = Constants.expoConfig?.scheme || 'lent-it-schema';

// Create a function to get redirectUrl that doesn't access window during initial render
const getRedirectUrl = () => {
  if (Platform.OS === 'web') {
    // Only access window in a useEffect or event handler
    return ''; // We'll set this properly in component
  } else {
    return `${scheme}://auth/callback`;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState(getRedirectUrl());

  // Set up the redirect URL properly based on platform
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      setRedirectUrl(window.location.origin);
    }
  }, []);

  // Function to check and update session
  const checkSession = async () => {
    try {
      console.log("Checking session...");
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error);
      } else {
        console.log("Session check result:", data.session ? "Session found" : "No session");
        setSession(data.session);
        setUser(data.session?.user ?? null);
      }
    } catch (err) {
      console.error("Unexpected error getting session:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only run session check in client environments
    if (Platform.OS === 'web' && typeof window === 'undefined') {
      // Skip session check in SSR
      setLoading(false);
      return;
    }

    // Initial session check
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
          console.log("User signed in or token refreshed");
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out");
          setSession(null);
          setUser(null);
        }
      }
    );

    // Set up deep link handling for auth confirmations
    const handleDeepLink = async (url: string) => {
      if (!url) return;
      
      console.log("Detected deep link:", url);
      
      // For Supabase auth links from email
      if (url.includes('#access_token=') || 
          url.includes('type=recovery') || 
          url.includes('type=signup')) {
        console.log("Handling auth deep link");
        
        try {
          // Let Supabase handle the URL with auth params
          const { data, error } = await supabase.auth.refreshSession();
          
          if (error) {
            console.error("Error refreshing session from deep link:", error);
          } else if (data.session) {
            console.log("Successfully set session from deep link");
            setSession(data.session);
            setUser(data.session.user);
          }
        } catch (e) {
          console.error("Error processing auth deep link:", e);
        }
      }
    };

    // Set up linking listener
    const setupLinking = async () => {
      // Handle initial URL (app opened via link)
      try {
        const initialUrl = await Linking.getInitialURL();
        if (initialUrl) {
          console.log("App opened with URL:", initialUrl);
          handleDeepLink(initialUrl);
        }
      } catch (e) {
        console.error("Error getting initial URL:", e);
      }
      
      // Handle incoming links while app is running
      const subscription = Linking.addEventListener('url', (event) => {
        handleDeepLink(event.url);
      });
      
      return () => {
        subscription.remove();
      };
    };
    
    const linkingCleanup = setupLinking();

    return () => {
      // Clean up subscriptions
      subscription.unsubscribe();
      linkingCleanup.then(cleanup => cleanup && cleanup());
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    console.log("AuthContext signUp called with:", email);
    try {
      setLoading(true);
      
      // Make sure we have a valid redirectUrl
      const currentRedirectUrl = redirectUrl || `${scheme}://auth/callback`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${currentRedirectUrl}?type=signup`
        }
      });
      
      if (error) throw error;
      
      console.log("Signup response:", data);
      
      // If we have a session, update our local state
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }
      
      return data;
    } catch (error) {
      console.error("Error in signUp:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      console.log("SignIn successful:", data.session?.user?.email);
      
      // Update our local state with the session
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }
      
      return data;
    } catch (error) {
      console.error("Error in signIn:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      
      // Make sure we have a valid redirectUrl
      const currentRedirectUrl = redirectUrl || `${scheme}://auth/callback`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: currentRedirectUrl
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error in signInWithGoogle:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      console.log("Signing out...");
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear our local state
      setSession(null);
      setUser(null);
      console.log("Sign out successful");
    } catch (error) {
      console.error("Error in signOut:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
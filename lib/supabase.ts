import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://ohwnqxxechrbydpperkj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9od25xeHhlY2hyYnlkcHBlcmtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3Mzc2MDcsImV4cCI6MjA1ODMxMzYwN30.nc5f4Ah6inmfUmg4vb8iClFUGHxK5C5q68PQDH11D2g'


// Better environment detection
const isExpoGo = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
const isClient = typeof window !== 'undefined';

const supabaseClientOptions = {
  auth: {
    storage: isExpoGo || isClient ? AsyncStorage : undefined,
    autoRefreshToken: true,
    persistSession: true, // Only persist in client environments
    detectSessionInUrl: true, 
  }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, supabaseClientOptions);
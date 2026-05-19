import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

const supabaseUrl = "https://ngvwpxqbpiwnnyckelmu.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ndndweHFicGl3bm55Y2tlbG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2Mjg0MTEsImV4cCI6MjA5NDIwNDQxMX0.PUApPeC6E--KD65geC-FC5NOid_Q72kmEKTUhxw1Ivw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: Platform.OS === "web" ? undefined : AsyncStorage,

    autoRefreshToken: true,
    persistSession: true,

    detectSessionInUrl: Platform.OS === "web",
  },
});

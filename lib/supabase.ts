// Import the official Supabase function that creates a browser/client connection.
import { createClient } from "@supabase/supabase-js";

// Read your Supabase project URL from the Next.js environment variables.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Read your Supabase anonymous public key from the Next.js environment variables.
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if the Supabase URL is present and formatted like a real URL.
const hasValidSupabaseUrl = Boolean(
  supabaseUrl &&
    (supabaseUrl.startsWith("https://") || supabaseUrl.startsWith("http://")),
);

// Check if both required Supabase values are available before saving leads.
export const isSupabaseConfigured = Boolean(
  hasValidSupabaseUrl && supabaseAnonKey,
);

// Use the real Supabase URL when it is valid, otherwise use a safe placeholder.
const safeSupabaseUrl: string = hasValidSupabaseUrl && supabaseUrl
  ? supabaseUrl
  : "https://example.supabase.co";

// Create and export one reusable Supabase client for the app to import later.
export const supabase = createClient(
  safeSupabaseUrl,
  supabaseAnonKey ?? "missing-anon-key",
);

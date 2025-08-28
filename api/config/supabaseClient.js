import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";


dotenv.config({ path: "../.env" });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Check env load hua ya nahi
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("❌ Missing Supabase environment variables!");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("✅ Supabase connected successfully!");

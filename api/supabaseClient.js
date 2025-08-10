import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' }); // Adjust path as needed

const SUPABASE_ANON_KEY=process.env.SUPABASE_ANON_KEY;
const SUPABASE_URL=process.env.SUPABASE_URL;


export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

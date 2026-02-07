import { createClient } from '@supabase/supabase-js';

// Replace these with your actual keys from Supabase Settings > API
const supabaseUrl = 'https://povksjbqvxnuflsgncjw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvdmtzamJxdnhudWZsc2duY2p3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDQ2NzY2OSwiZXhwIjoyMDg2MDQzNjY5fQ.7T7C52Jne_BcRNblwFhyr-I7Zctn13HX1m2F4s9yiVg';

export const supabase = createClient(supabaseUrl, supabaseKey);
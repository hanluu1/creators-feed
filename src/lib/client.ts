import { createClient } from '@supabase/supabase-js';
const URL = 'https://zewvexsohcupwqpqgljn.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpld3ZleHNvaGN1cHdxcHFnbGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMzkxMjEsImV4cCI6MjA2ODgxNTEyMX0.SE-842VjoFj2hvTBcXYKjW0vas_kjOCXdHN0MzyHSY8'
export const supabase = createClient(URL, API_KEY);
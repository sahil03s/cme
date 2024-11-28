import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://sqxfxtaztxpbftlpawwa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxeGZ4dGF6dHhwYmZ0bHBhd3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MzgwMTAsImV4cCI6MjA0ODIxNDAxMH0.2_hwUQKfbopUr8lFxTwkmOAys-1ngEvKW8hYFYP9mhA';
export const supabase = createClient(supabaseUrl, supabaseKey);

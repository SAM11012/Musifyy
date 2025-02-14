
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://salshnlwhxffxjcfgxdb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhbHNobmx3aHhmZnhqY2ZneGRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0ODE1NjIsImV4cCI6MjA1NTA1NzU2Mn0.CtvDa30ZzzYiKOX82q7yYinFmMbBPDfdxc8kAke-u4I";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

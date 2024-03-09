// src/config/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://exwebzsgersnzqqufzbv.supabase.co"; // Substitua por sua URL do Supabase
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4d2VienNnZXJzbnpxcXVmemJ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MzU4MDIwNywiZXhwIjoxOTk5MTU2MjA3fQ.rCokkNcj9xilrsVSTIdHadwEY4TdNvX2FThuRwvOq6Q";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

'use client';
import { createBrowserClient } from '@supabase/ssr';
import { configured } from './config';
export function browserSupabase() {
 if (!configured) return null;
 return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}

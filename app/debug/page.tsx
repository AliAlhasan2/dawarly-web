
"use client";

import { configured } from "@/lib/config";

export default function DebugPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <main style={{ padding: 40, direction: "rtl" }}>
      <h1>فحص اتصال دورلي 🏠</h1>

      <p>
        رابط Supabase:
        {url ? " موجود ✅" : " غير موجود ❌"}
      </p>

      <p>
        المفتاح العام:
        {key ? " موجود ✅" : " غير موجود ❌"}
      </p>

      <h2>
        حالة الاتصال:
        {configured ? " TRUE ✅" : " FALSE ❌"}
      </h2>
    </main>
  );
}

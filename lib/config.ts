export const configured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('dawarly-web')
);
export const governorates = ['دمشق','ريف دمشق','حلب','حمص','حماة','اللاذقية','طرطوس','إدلب','درعا','السويداء','دير الزور','الرقة','الحسكة','القنيطرة'];
export const currencies = ['USD', 'SYP'];
export function money(value: number | string, currency='USD') {
  const n = Number(value);
  return `${Number.isFinite(n) ? n.toLocaleString('en-US') : value} ${currency === 'USD' ? '$' : 'ل.س'}`;
}
export function safeWhatsapp(raw: string | null | undefined) {return (raw || '').replace(/\D/g,'').slice(0,16)}

'use client';
import { FormEvent,useEffect,useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LockKeyhole } from 'lucide-react';
import { browserSupabase } from '@/lib/supabase-browser';
export default function PasswordReset(){const router=useRouter();const [password,setPassword]=useState('');const [confirm,setConfirm]=useState('');const [error,setError]=useState('');const [success,setSuccess]=useState('');const [loading,setLoading]=useState(false);
 async function save(e:FormEvent){e.preventDefault();setError('');if(password.length<8){setError('كلمة المرور لازم تكون 8 أحرف على الأقل.');return;}if(password!==confirm){setError('كلمات المرور غير متطابقة.');return;}const db=browserSupabase();if(!db){setError('Supabase غير متصل.');return;}setLoading(true);const {error}=await db.auth.updateUser({password});setLoading(false);if(error)setError('ما قدرنا نغيّر كلمة المرور. تأكد إنك فتحت رابط الاستعادة من بريدك: '+error.message);else setSuccess('تم تحديث كلمة المرور. يمكنك تسجيل الدخول الآن.')}
 return <div className="auth-card"><div className="auth-mark"><LockKeyhole/></div><div className="auth-title"><h1>عيّن كلمة مرور جديدة</h1><p>افتح هذه الصفحة من رابط استعادة كلمة المرور المرسل إلى بريدك.</p></div><form className="auth-form" onSubmit={save}><label>كلمة المرور الجديدة<input type="password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)} autoComplete="new-password"/></label><label>تأكيد كلمة المرور<input type="password" minLength={8} required value={confirm} onChange={e=>setConfirm(e.target.value)} autoComplete="new-password"/></label>{error&&<div className="alert error">{error}</div>}{success&&<div className="alert success">{success}</div>}<button className="btn btn-primary auth-submit" disabled={loading} type="submit">{loading?'جارٍ الحفظ...':'حفظ كلمة المرور'}</button></form><Link className="auth-home" href="/login">العودة إلى تسجيل الدخول</Link></div>
}

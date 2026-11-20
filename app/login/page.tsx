import type { Metadata } from 'next';
import { Suspense } from 'react';
import LoginForm from '@/components/LoginForm';
export const metadata:Metadata={title:'تسجيل الدخول'};
export default function Login(){return <main className="auth-page"><div className="container"><Suspense fallback={<div className="loading-state">جارٍ تحميل صفحة الدخول...</div>}><LoginForm/></Suspense></div></main>}

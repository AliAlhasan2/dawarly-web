'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Plus, UserRound, ArrowUpLeft } from 'lucide-react';
import { browserSupabase } from '@/lib/supabase-browser';
export default function Header(){
 const pathname=usePathname(); const [open,setOpen]=useState(false); const [logged,setLogged]=useState(false);
 useEffect(()=>{const s=browserSupabase(); if(!s)return; s.auth.getUser().then(({data})=>setLogged(!!data.user)); const {data}=s.auth.onAuthStateChange((_event,session)=>setLogged(!!session)); return ()=>data.subscription.unsubscribe();},[]);
 useEffect(()=>setOpen(false),[pathname]);
 return <header className="site-header"><div className="container nav-inner">
  <Link href="/" className="brand" aria-label="دورلي الرئيسية"><span className="brand-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 11.2 12 4l9 7.2V21h-6v-6H9v6H3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/></svg></span><span>دورلي<span className="brand-dot">.</span></span></Link>
  <nav className={'nav-links '+(open?'nav-open':'')} aria-label="التنقل الرئيسي"><Link className={pathname==='/'?'active':''} href="/">الرئيسية</Link><Link className={pathname?.startsWith('/properties')?'active':''} href="/properties">تصفح العقارات</Link><Link href="/about">من نحن</Link><Link className="mobile-nav-link" href={logged?'/dashboard':'/login'}>حسابي</Link></nav>
  <div className="nav-actions"><Link href={logged?'/dashboard':'/login'} className="account-link"><UserRound size={17}/><span>{logged?'لوحة حسابي':'دخول'}</span></Link><Link href={logged?'/dashboard/new':'/login?next=%2Fdashboard%2Fnew'} className="btn btn-dark nav-post"><Plus size={18}/> أضف عقارك</Link><button className="mobile-menu" aria-label={open?'إغلاق القائمة':'فتح القائمة'} onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button></div>
 </div></header>;
}

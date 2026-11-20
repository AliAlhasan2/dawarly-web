import type { Metadata } from 'next';
import SearchForm from '@/components/SearchForm';
import PropertyCard from '@/components/PropertyCard';
import { configured } from '@/lib/config';
import { demoProperties } from '@/lib/demo';
import { serverSupabase } from '@/lib/supabase-server';
import type { Property } from '@/lib/types';
import { SlidersHorizontal, Home } from 'lucide-react';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'تصفح العقارات'};
type Filters={type?:string;governorate?:string;q?:string;max?:string;page?:string};
export default async function Properties({searchParams}:{searchParams:Promise<Filters>}){
 const f=await searchParams;let properties:Property[]=[];let count=0;let error='';const page=Math.max(1,Math.min(100,Number(f.page)||1));const limit=12;
 const max=Number(f.max);const hasMax=f.max&&Number.isFinite(max)&&max>0;
 if(configured){const db=await serverSupabase();if(db){let query=db.from('properties').select('*',{count:'exact'}).eq('status','published');if(['sale','rent'].includes(f.type||''))query=query.eq('listing_type',f.type!);if(f.governorate)query=query.eq('governorate',f.governorate);if(f.q?.trim()){const q=f.q.trim().replace(/[%,().]/g,' ').slice(0,80);if(q)query=query.or(`title.ilike.%${q}%,neighborhood.ilike.%${q}%`);}if(hasMax)query=query.eq('currency','USD').lte('price',max);const result=await query.order('created_at',{ascending:false}).range((page-1)*limit,page*limit-1);properties=(result.data||[]) as Property[];count=result.count||0;if(result.error)error=result.error.message;}}
 else {let data=[...demoProperties];if(['sale','rent'].includes(f.type||''))data=data.filter(p=>p.listing_type===f.type);if(f.governorate)data=data.filter(p=>p.governorate===f.governorate);if(f.q)data=data.filter(p=>(p.title+' '+p.neighborhood).includes(f.q!));if(hasMax)data=data.filter(p=>p.price<=max);count=data.length;properties=data.slice((page-1)*limit,page*limit)}
 const params=new URLSearchParams();Object.entries(f).forEach(([k,v])=>{if(v&&k!=='page')params.set(k,v)});
 return <main className="listing-page"><section className="page-banner"><div className="container"><span className="page-breadcrumb">الرئيسية / العقارات</span><h1>لاقي المكان اللي <em>بشبهك.</em></h1><p>اكتشف خيارات متنوعة من العقارات للبيع والإيجار.</p></div></section><div className="container listing-body"><SearchForm compact initialType={f.type} initialGovernorate={f.governorate} initialQuery={f.q} initialMax={f.max}/><div className="listing-summary"><div><h2>العقارات المتاحة <span>({count})</span></h2><p>النتائج المعروضة حسب خيارات البحث</p></div><div className="results-sort"><SlidersHorizontal size={17}/> الأحدث أولاً</div></div>{!configured&&<div className="demo-notice">هذه بيانات عرض تجريبية وليست عقارات حقيقية.</div>}{error&&<p className="alert error">تعذر جلب العقارات: {error}</p>}{properties.length?<div className="cards-grid">{properties.map(p=><PropertyCard key={p.id} property={p}/>)}</div>:<div className="empty-list"><Home size={37}/><h3>ما لقينا عقارات مطابقة</h3><p>جرب تغيير المنطقة أو ميزانية البحث.</p></div>}{count>limit&&<div className="pagination">{page>1&&<a href={'/properties?'+params.toString()+'&page='+(page-1)}>السابق</a>}<span>صفحة {page} من {Math.ceil(count/limit)}</span>{page*limit<count&&<a href={'/properties?'+params.toString()+'&page='+(page+1)}>التالي</a>}</div>}</div></main>;
}

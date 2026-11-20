'use client';
import Link from 'next/link';
import { BedDouble, Bath, Maximize2, MapPin, Heart, ArrowUpLeft } from 'lucide-react';
import { useEffect,useState } from 'react';
import type { Property } from '@/lib/types';
import { money } from '@/lib/config';
export default function PropertyCard({property:p}:{property:Property}){
 const [favorite,setFavorite]=useState(false);
 useEffect(()=>{try {setFavorite(JSON.parse(localStorage.getItem('dawarly-favorites')||'[]').includes(p.id));}catch{}},[p.id]);
 function toggle(){try{const items:string[]=JSON.parse(localStorage.getItem('dawarly-favorites')||'[]');const newItems=items.includes(p.id)?items.filter(x=>x!==p.id):[...items,p.id];localStorage.setItem('dawarly-favorites',JSON.stringify(newItems));setFavorite(newItems.includes(p.id));}catch{}}
 return <article className="property-card"><div className="property-media"><Link href={`/properties/${p.id}`} aria-label={p.title}>{p.images?.[0]?<img src={p.images[0]} alt={p.title} loading="lazy"/>:<div className="image-placeholder">⌂</div>}</Link><span className="property-label">{p.listing_type==='rent'?'للإيجار':'للبيع'}</span><button onClick={toggle} className={'favorite '+(favorite?'is-favorite':'')} aria-label={favorite?'إزالة من المفضلة':'إضافة للمفضلة'}><Heart size={18} fill={favorite?'currentColor':'none'}/></button></div><div className="property-content"><div className="property-price">{money(p.price,p.currency)} {p.listing_type==='rent'&&<small>/ {p.rental_period==='yearly'?'سنة':'شهر'}</small>}</div><Link href={`/properties/${p.id}`} className="property-title">{p.title}</Link><p className="property-place"><MapPin size={15}/> {p.neighborhood}، {p.governorate}</p><div className="property-specs"><span><BedDouble size={17}/> {p.rooms??'—'} غرف</span><span><Bath size={17}/> {p.bathrooms??'—'} حمام</span><span><Maximize2 size={16}/> {p.area_sqm??'—'} م²</span></div><Link href={`/properties/${p.id}`} className="card-more">عرض التفاصيل <ArrowUpLeft size={17}/></Link></div></article>
}

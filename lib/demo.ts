import type { Property } from './types';
const photos = [
'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1100&q=85',
'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1100&q=85',
'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1100&q=85',
'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1100&q=85',
'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1100&q=85',
'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1100&q=85'
];
const rows = [
['شقة مميزة بتشطيب عصري في المزة','rent','دمشق','المزة',650,145,3,2],
['شقة بإطلالة مفتوحة في مشروع دمر','sale','دمشق','مشروع دمر',148000,180,4,3],
['شقة واسعة في الفرقان','rent','حلب','الفرقان',420,125,3,2],
['منزل عائلي حديث في كفرسوسة','sale','دمشق','كفرسوسة',225000,210,4,3],
['شقة مفروشة في اللاذقية','rent','اللاذقية','الزراعة',350,100,2,1],
['شقة هادئة في الوعر','sale','حمص','الوعر',69000,115,3,2]
] as const;
export const demoProperties: Property[] = rows.map((r,i)=>({
 id:`demo-${i+1}`,owner_id:'demo',title:r[0], description:'إعلان توضيحي لتجربة واجهة دورلي. الصور والأسعار ليست لعقارات معروضة فعلياً. بعد ربط قاعدة البيانات ستظهر إعلاناتك الحقيقية هنا.',listing_type:r[1] as 'rent'|'sale',property_type:'apartment',governorate:r[2],neighborhood:r[3],address_details:null,price:r[4],currency:'USD',rental_period:r[1]==='rent'?'monthly':null,area_sqm:r[5],rooms:r[6],bathrooms:r[7],floor_number:i+1,furnished:i%2===0,has_elevator:true,has_parking:i%2===1,phone:null,whatsapp:null,images:[photos[i]],status:'published',created_at:'2026-01-01T00:00:00Z',updated_at:'2026-01-01T00:00:00Z'
}));

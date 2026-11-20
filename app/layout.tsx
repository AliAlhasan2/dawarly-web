import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export const metadata: Metadata={
 title:{default:'دورلي | بيتك أقرب مما بتتخيل',template:'%s | دورلي'},
 description:'منصة عقارات سورية للبحث عن شقق وبيوت للبيع والإيجار. تصفّح العقارات أو أضف إعلانك بسهولة.',
 applicationName:'دورلي',robots:{index:true,follow:true}
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="ar" dir="rtl"><body><Header/>{children}<Footer/></body></html>;
}

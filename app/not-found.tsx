import Link from 'next/link';
import { Home } from 'lucide-react';
export default function NotFound(){return <main className="simple-page"><div className="container not-found"><span>404</span><h1>ما لقينا هالصفحة</h1><p>يمكن تم حذف الإعلان أو تغيّر الرابط.</p><Link className="btn btn-primary" href="/"><Home size={17}/> العودة للرئيسية</Link></div></main>}

import AdminClient from '@/components/AdminClient';
import type { Metadata } from 'next';
export const metadata:Metadata={title:'الإدارة'};
export default function AdminPage(){return <main className="dashboard-page"><div className="container"><AdminClient/></div></main>}

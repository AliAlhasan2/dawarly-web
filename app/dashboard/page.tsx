import type { Metadata } from 'next';
import DashboardClient from '@/components/DashboardClient';
export const metadata:Metadata={title:'لوحة حسابي'};
export default function Dashboard(){return <main className="dashboard-page"><div className="container"><DashboardClient/></div></main>}

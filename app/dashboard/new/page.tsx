import type { Metadata } from 'next';
import PropertyForm from '@/components/PropertyForm';
export const metadata:Metadata={title:'أضف عقارك'};
export default function AddProperty(){return <main className="form-page"><div className="container"><PropertyForm/></div></main>}

import PropertyForm from '@/components/PropertyForm';
export default async function EditProperty({params}:{params:Promise<{id:string}>}){return <main className="form-page"><div className="container"><PropertyForm propertyId={(await params).id}/></div></main>}

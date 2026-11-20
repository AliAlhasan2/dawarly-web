export type Property = {
  id: string; owner_id: string; title: string; description: string | null;
  listing_type: 'rent'|'sale'; property_type: string; governorate: string;
  neighborhood: string; address_details: string | null;
  price: number; currency: 'USD' | 'SYP'; rental_period: string | null;
  area_sqm: number | null; rooms: number | null; bathrooms: number | null;
  floor_number: number | null; furnished: boolean; has_elevator: boolean;
  has_parking: boolean; phone: string | null; whatsapp: string | null;
  images: string[]; status: 'pending'|'published'|'rejected'|'closed';
  created_at: string; updated_at: string;
};

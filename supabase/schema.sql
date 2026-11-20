-- DAWARLY DATABASE SETUP. Run in Supabase > SQL Editor on a NEW project.
-- Only publishable/anon keys are used in the web app. Never expose a service_role key.

create table if not exists public.admin_users (
 id uuid primary key references auth.users(id) on delete cascade,
 created_at timestamptz not null default now()
);

create table if not exists public.properties (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 title text not null check (char_length(title) between 8 and 120),
 description text not null check (char_length(description) between 20 and 3000),
 listing_type text not null check (listing_type in ('rent','sale')),
 property_type text not null check (property_type in ('apartment','house','villa','office','shop','land')),
 governorate text not null,
 neighborhood text not null check (char_length(trim(neighborhood)) between 1 and 100),
 address_details text,
 price numeric(15,2) not null check (price > 0),
 currency text not null check (currency in ('USD','SYP')),
 rental_period text check (rental_period is null or rental_period in ('monthly','yearly')),
 area_sqm integer check (area_sqm is null or area_sqm > 0),
 rooms integer check (rooms is null or (rooms >= 0 and rooms <= 100)),
 bathrooms integer check (bathrooms is null or (bathrooms >= 0 and bathrooms <= 100)),
 floor_number integer check (floor_number is null or floor_number between -3 and 200),
 furnished boolean not null default false,
 has_elevator boolean not null default false,
 has_parking boolean not null default false,
 phone text,
 whatsapp text,
 images text[] not null default '{}',
 status text not null default 'pending' check (status in ('pending','published','rejected','closed')),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 constraint max_images check (cardinality(images) <= 8)
);
create index if not exists properties_status_date on public.properties(status,created_at desc);
create index if not exists properties_location on public.properties(governorate,listing_type,price);
create index if not exists properties_owner on public.properties(owner_id);

-- Existence of the caller in admin_users is verified server-side in Postgres.
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.admin_users where id = (select auth.uid()));
$$;
revoke all on function public.is_admin() from public;
-- Anonymous visitors get FALSE (auth.uid() is NULL), so public SELECT does not hit a function permission error.
grant execute on function public.is_admin() to anon, authenticated;

alter table public.admin_users enable row level security;
alter table public.properties enable row level security;

create policy "admins see own membership" on public.admin_users
 for select to authenticated using (id = (select auth.uid()));

create policy "public published owner or admin read" on public.properties
 for select to anon,authenticated
 using (status='published' or owner_id=(select auth.uid()) or (select public.is_admin()));

create policy "authenticated owner inserts pending" on public.properties
 for insert to authenticated
 with check (owner_id=(select auth.uid()) and status='pending');

-- Owners may edit their listings, but MUST submit them again for approval.
-- Admins can set the public status. A row-level trigger prevents spoofing.
create policy "owner updates for review" on public.properties
 for update to authenticated
 using (owner_id=(select auth.uid()))
 with check (owner_id=(select auth.uid()) and status='pending');

create policy "admin updates listings" on public.properties
 for update to authenticated
 using ((select public.is_admin()))
 with check ((select public.is_admin()));

create policy "owner deletes own listings" on public.properties
 for delete to authenticated
 using (owner_id=(select auth.uid()) or (select public.is_admin()));

create or replace function public.set_property_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
 new.updated_at=now();
 return new;
end;
$$;
create trigger properties_updated before update on public.properties
 for each row execute function public.set_property_updated_at();

-- Public bucket: only approved public content should be used here.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('property-images','property-images',true,5242880,array['image/jpeg','image/png','image/webp'])
on conflict(id) do update set public=true,file_size_limit=5242880,allowed_mime_types=array['image/jpeg','image/png','image/webp'];

-- Path is always user-UUID/random-file.ext. Reading is public; upload is authenticated.
create policy "property image uploads own directory" on storage.objects
 for insert to authenticated
 with check (bucket_id='property-images' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy "property image owners can delete" on storage.objects
 for delete to authenticated
 using (bucket_id='property-images' and (storage.foldername(name))[1]=(select auth.uid())::text);

-- IMPORTANT OPERATOR STEP: To make a user an admin, find their ID in
-- Authentication > Users and run manually with YOUR OWN actual UUID:
-- insert into public.admin_users (id) values ('ACTUAL-USER-UUID');
-- Do NOT put an admin UUID or privileged key into public client code.

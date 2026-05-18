create type user_role as enum ('admin', 'member', 'student', 'client');
create type product_type as enum ('book', 'bundle', 'digital');
create type order_status as enum ('pending', 'paid', 'failed', 'refunded', 'manual_review');
create type payment_provider as enum ('stripe', 'paystack', 'flutterwave', 'manual');
create type membership_tier as enum ('gold_circle', 'eternal_circle', 'majestic_circle');
create type membership_status as enum ('active', 'expired', 'cancelled', 'manual_review');
create type inquiry_status as enum ('new', 'reviewing', 'responded', 'closed');
create type booking_status as enum ('requested', 'confirmed', 'completed', 'cancelled');

create table users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  phone text,
  role user_role not null default 'member',
  country text,
  created_at timestamptz not null default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  type product_type not null,
  price numeric(12, 2) not null default 0,
  currency text not null default 'NGN',
  description text not null,
  cover_image text,
  file_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  price numeric(12, 2) not null default 0,
  modules jsonb not null default '[]'::jsonb,
  status text not null default 'draft',
  certificate_enabled boolean not null default false,
  created_at timestamptz not null default now()
);

create table lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  title text not null,
  content text,
  video_url text,
  lesson_order int not null default 0,
  is_free_preview boolean not null default false,
  created_at timestamptz not null default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  product_id uuid references products(id) on delete set null,
  amount numeric(12, 2) not null,
  currency text not null default 'NGN',
  status order_status not null default 'pending',
  payment_provider payment_provider not null,
  payment_reference text,
  created_at timestamptz not null default now()
);

create table memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  tier membership_tier not null,
  start_date timestamptz not null default now(),
  end_date timestamptz,
  status membership_status not null default 'active',
  created_at timestamptz not null default now()
);

create table articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  content text not null,
  excerpt text,
  seo_title text,
  meta_description text,
  featured_image text,
  published_at timestamptz
);

create table inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  inquiry_type text not null,
  message text not null,
  status inquiry_status not null default 'new',
  created_at timestamptz not null default now()
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  service_type text not null,
  booking_date timestamptz,
  status booking_status not null default 'requested',
  notes text
);

create table certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  certificate_number text not null unique,
  issued_at timestamptz not null default now(),
  file_url text
);

create table course_enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  progress numeric(5, 2) not null default 0,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create table downloads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  file_url text not null,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null unique,
  interest text,
  lead_magnet text,
  created_at timestamptz not null default now()
);

create table manual_payment_proofs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  product_type text,
  product_slug text,
  transfer_reference text not null,
  proof_url text,
  notes text,
  status inquiry_status not null default 'new',
  created_at timestamptz not null default now()
);

create index products_slug_idx on products(slug);
create index courses_slug_idx on courses(slug);
create index articles_slug_idx on articles(slug);
create index orders_user_id_idx on orders(user_id);
create index inquiries_status_idx on inquiries(status);
create index memberships_user_id_idx on memberships(user_id);

-- Enable RLS before production launch, then add policies for authenticated users, admins, and public read-only content.

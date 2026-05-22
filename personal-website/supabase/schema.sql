create type user_role as enum ('admin', 'member', 'student', 'client');
create type product_type as enum ('book', 'bundle', 'digital');
create type order_status as enum ('pending_payment', 'payment_submitted', 'payment_under_review', 'payment_approved', 'download_sent', 'cancelled');
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
  order_number text not null unique,
  name text not null,
  email text not null,
  phone text,
  product_type text,
  product_slug text,
  product_title text,
  amount_paid text,
  transfer_reference text not null,
  proof_url text,
  receipt_file_name text,
  receipt_file_type text,
  notes text,
  status order_status not null default 'payment_submitted',
  admin_note text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table course_waitlist_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  whatsapp text not null,
  course_interest text not null,
  preferred_format text not null,
  created_at timestamptz not null default now()
);

create table lead_magnet_signups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  whatsapp text,
  interest_category text not null,
  lead_magnet text not null,
  routed_to text,
  created_at timestamptz not null default now()
);

create table conversion_events (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  label text,
  href text,
  path text,
  user_id uuid references users(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index products_slug_idx on products(slug);
create index courses_slug_idx on courses(slug);
create index articles_slug_idx on articles(slug);
create index orders_user_id_idx on orders(user_id);
create index inquiries_status_idx on inquiries(status);
create index memberships_user_id_idx on memberships(user_id);
create index conversion_events_action_idx on conversion_events(action);
create index conversion_events_path_idx on conversion_events(path);
create index manual_payment_order_number_idx on manual_payment_proofs(order_number);
create index manual_payment_status_idx on manual_payment_proofs(status);
create index course_waitlist_interest_idx on course_waitlist_submissions(course_interest);
create index lead_magnet_slug_idx on lead_magnet_signups(lead_magnet);

-- Enable RLS before production launch, then add policies for authenticated users, admins, and public read-only content.

export type NavItem = {
  href: string;
  label: string;
  description?: string;
};

export type ActionLink = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
};

export type SocialLink = {
  label: string;
  href: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type Domain = {
  title: string;
  summary: string;
  bullets: string[];
};

export type TimelineEvent = {
  year: string;
  title: string;
  summary: string;
};

export type ServiceTier = {
  id: string;
  title: string;
  summary: string;
  audience: string;
  cta: string;
  pricing: string;
  delivery: string;
  offers: string[];
};

export type CredibilitySignal = {
  title: string;
  summary: string;
  metric: string;
};

export type Book = {
  title: string;
  subtitle: string;
  slug: string;
  volume: string;
  abstract: string;
  themes: string[];
  audience: string[];
  languages: string[];
  formats: string[];
  status: "Published" | "In development" | "Institutional release";
  commerceMode: "Public info" | "Request manuscript" | "Digital paid PDF" | "Institutional order";
  commercialTier?: string;
  cover: string;
  featured: boolean;
  excerpt: string[];
};

export type Article = {
  title: string;
  slug: string;
  summary: string;
  category: string;
  tags: string[];
  date: string;
  readingTime: string;
  featured: boolean;
  cover: string;
  downloadablePdf: boolean;
  body: string[];
};

export type Poem = {
  title: string;
  slug: string;
  collection: string;
  summary: string;
  commercialTier?: string;
  languages?: string[];
  audioLabel: string;
  arabicText: string[];
  translation: string[];
  notes: string[];
};

export type Course = {
  title: string;
  slug: string;
  format: string;
  summary: string;
  duration: string;
  delivery: string;
  access: string;
  outcomes: string[];
};

export type Product = {
  name: string;
  slug: string;
  type: string;
  description: string;
  price: string;
  accessMethod: string;
  cover: string;
  featured: boolean;
};

export type Initiative = {
  title: string;
  summary: string;
  impactType: string;
  cta: string;
  assets: string[];
};

export type MediaCollection = {
  title: string;
  slug: string;
  type: string;
  date: string;
  description: string;
  cover: string;
  tags: string[];
};

export type SearchRecord = {
  type: "Book" | "Article" | "Poetry" | "Course" | "Service" | "Product" | "Media" | "Initiative";
  title: string;
  href: string;
  summary: string;
  tags: string[];
};

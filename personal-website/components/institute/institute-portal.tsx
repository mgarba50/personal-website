"use client";

import { useState } from "react";
import Link from "next/link";

type View = "landing" | "dashboard";

type Course = {
  pillar: string;
  title: string;
  instructor: string;
  description: string;
  modules: string[];
  image: string;
  progress: number;
  nextLesson: string;
};

const courses: Course[] = [
  {
    pillar: "Pillar 1: Agro-Logistics & Global Trade",
    title: "Agro-Logistics Across the Great Divide (Exec. Certificate)",
    instructor: "Engr Musa Garba",
    description:
      "A definitive field manual detailing the mechanics of importing, exporting, and sustaining trade across the West African corridor.",
    modules: [
      "Border Intelligence & Supply Chain Mechanics.",
      "Sino-African Operational Bridging (Guangzhou/Shanghai to Sahel).",
      "The Hydroponic Mosque: Climate-Resilient Agricultural Frameworks."
    ],
    image: "/assets/fleet-logistics.jpg",
    progress: 62,
    nextLesson: "Border intelligence"
  },
  {
    pillar: "Pillar 2: Systems Architecture & Logical Execution",
    title: "Advanced Systems Logic & Web Architecture",
    instructor: "Engr Musa Garba",
    description:
      "Instruction and capacity building in digital literacy, systems logic, and technological infrastructure.",
    modules: [
      "Structural Thinking for Problem Solving.",
      "Python/PowerShell Automation for Enterprise.",
      "Universal Logic & Error Avoidance in Code."
    ],
    image: "/assets/musa-allama-working-desk.jpg",
    progress: 44,
    nextLesson: "Automation logic"
  },
  {
    pillar: "Pillar 3: Linguistic & Executive Mastery",
    title: "The Five-Language CEO Masterclass",
    instructor: "Musa Allama Ibn Garba",
    description:
      "Dismantling the myth of monolingual dominance. Mastery of English, Hausa, Arabic, Kanuri, and Mandarin for cross-border influence.",
    modules: [
      "The Architecture of Trust: Translating Intent across Civilizations.",
      "High-Stakes Negotiation in the Global Boardroom.",
      "The Meta-Intellectual: Mastering Attention and Vertical Intelligence."
    ],
    image: "/assets/article-geopolitical-logistics.jpg",
    progress: 28,
    nextLesson: "Trust architecture"
  }
];

const instituteLinks = [
  { href: "#programs", label: "Programs" },
  { href: "/canon", label: "The Canon" },
  { href: "/operations", label: "Operations" },
  { href: "/endowments", label: "Endowments" }
];

const badges = ["GALLIFREY INTERNATIONAL", "GEIDAM AGRO ALLIED", "ALLAMA GIRLS INITIATIVE"];

export function InstitutePortal({
  initialView = "dashboard"
}: {
  initialView?: View;
}) {
  const [view, setView] = useState<View>(initialView);

  return (
    <div data-madrasa-portal className="institute-portal min-h-screen bg-[#f4f4f0] text-slate-900">
      <style>{`
        body:has([data-madrasa-portal]) [data-site-chrome] {
          display: none !important;
        }
      `}</style>
      {view === "landing" ? (
        <LandingPage onEnterPortal={() => setView("dashboard")} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

function LandingPage({ onEnterPortal }: { onEnterPortal: () => void }) {
  return (
    <div className="relative overflow-hidden">
      <SubtleGrid />
      <nav className="sticky top-0 z-40 border-b border-[#eaeae2] bg-[#f8f9fa]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4">
          <Link href="/" className="group flex items-center gap-3">
            <Mark />
            <div className="grid">
              <span className="text-xs uppercase tracking-[0.32em] text-slate-500">The Allama Institute</span>
              <span className="font-serif text-xl text-slate-950">Executive Learning Portal</span>
            </div>
          </Link>
          <div className="hidden items-center gap-7 lg:flex">
            {instituteLinks.map((link) => (
              link.href.startsWith("#") ? (
                <a key={link.href} href={link.href} className="text-sm text-slate-600 transition hover:text-slate-950">
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className="text-sm text-slate-600 transition hover:text-slate-950">
                  {link.label}
                </Link>
              )
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={onEnterPortal} className="hidden text-sm text-slate-600 transition hover:text-slate-950 sm:inline-flex">
              Student Portal
            </button>
            <button
              type="button"
              onClick={onEnterPortal}
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-[0_18px_40px_rgba(26,36,51,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Apply Now
            </button>
          </div>
        </div>
      </nav>

      <header className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-28">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#eaeae2] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-700 shadow-card">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
            Executive cohort architecture
          </div>
          <h1 className="mt-8 max-w-4xl font-serif text-5xl font-medium leading-[0.96] tracking-tight text-slate-950 md:text-7xl">
            Algorithmic Execution. Cross-Border Strategy. Sovereign Leadership.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            An exclusive, executive-grade institution bridging advanced systems architecture, global agro-logistics, and multilingual leadership for the next generation of African and international strategists.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onEnterPortal}
              className="rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Enter Student Portal
            </button>
            <a
              href="#programs"
              className="rounded-full border border-[#d8d8cd] bg-white px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.16em] text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-900"
            >
              View Curriculum
            </a>
          </div>
          <div className="mt-12 border-t border-[#eaeae2] pt-8">
            <p className="text-sm font-medium text-slate-500">Trusted by students from:</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {badges.map((badge) => (
                <div key={badge} className="rounded-2xl border border-[#eaeae2] bg-white px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-700 shadow-card">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-10 hidden h-40 w-40 rounded-full border border-slate-900/10 lg:block" />
          <div className="overflow-hidden rounded-t-[180px] border border-[#eaeae2] bg-white shadow-[0_28px_90px_rgba(26,36,51,0.16)]">
            <div className="relative aspect-[4/5]">
              <img src="/assets/hydroponics-system.jpg" alt="High-end agriculture and systems learning visual" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/78 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="text-xs uppercase tracking-[0.28em] text-white/70">Curriculum Highlight</p>
                <h2 className="mt-3 font-serif text-3xl">Agro-logistics, systems, and multilingual command.</h2>
                <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs uppercase tracking-[0.16em] text-white/75">
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-2">Trade</span>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-2">Systems</span>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-2">Language</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="border-y border-[#eaeae2] bg-slate-900 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["3", "Foundational pillars"],
            ["5", "Strategic languages"],
            ["27+", "Countries navigated"],
            ["1", "Executive institute"]
          ].map(([value, label]) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <div className="font-serif text-5xl">{value}</div>
              <div className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-300">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="programs" className="mx-auto max-w-7xl px-5 py-24">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Curriculum Architecture</p>
          <h2 className="mt-4 font-serif text-4xl text-slate-950 md:text-5xl">Three corridors for sovereign execution.</h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            The Institute converts operational field knowledge, systems discipline, and multilingual intellectual authority into structured executive learning.
          </p>
        </div>
        <div className="grid items-stretch gap-7 lg:grid-cols-3">
          {courses.map((course) => (
            <ProgramCard key={course.title} course={course} onEnterPortal={onEnterPortal} />
          ))}
        </div>
      </section>

      <footer className="border-t border-[#eaeae2] bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 The Allama Institute. Executive learning architecture by the Office of Musa Allama Ibn Garba.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/canon" className="hover:text-slate-950">The Canon</Link>
            <Link href="/operations" className="hover:text-slate-950">Operations</Link>
            <Link href="/endowments" className="hover:text-slate-950">Endowments</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-screen bg-[#f4f4f0] text-slate-900">
      <aside className="hidden w-72 shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-slate-300 md:flex">
        <div className="flex items-center gap-3 border-b border-white/10 p-6 text-white">
          <Mark inverted />
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">The Allama</p>
            <p className="font-serif text-xl">Institute</p>
          </div>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {["overview", "courses", "library", "certificates", "settings"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveTab(item)}
              className={`w-full rounded-2xl px-4 py-3 text-left text-sm capitalize transition ${
                activeTab === item ? "bg-white text-slate-950" : "text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item === "courses" ? "My Courses" : item}
            </button>
          ))}
        </nav>
        <div className="p-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Current tier</p>
            <p className="mt-2 font-serif text-xl text-white">Executive Candidate</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/3 rounded-full bg-white" />
            </div>
          </div>
          <Link href="/" className="mt-5 inline-flex text-sm text-slate-400 transition hover:text-white">
            Back to Main Site
          </Link>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 border-b border-[#eaeae2] bg-white/90 px-5 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Student Portal</p>
              <h1 className="font-serif text-2xl text-slate-950">
                {activeTab === "overview" ? "Good Afternoon, Strategic Candidate" : "My Courses"}
              </h1>
            </div>
            <div className="hidden items-center gap-3 lg:flex">
              <input
                type="search"
                placeholder="Search frameworks..."
                className="w-72 rounded-full border border-[#eaeae2] bg-[#f8f9fa] px-5 py-3 text-sm outline-none transition focus:border-slate-900"
              />
              <button type="button" className="rounded-full bg-slate-900 px-5 py-3 text-sm text-white">
                Notifications
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-8">
          {activeTab === "overview" ? (
            <section className="mb-8 overflow-hidden rounded-[32px] border border-[#eaeae2] bg-white shadow-card">
              <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="p-8 lg:p-10">
                  <p className="text-xs font-bold uppercase tracking-[0.26em] text-slate-500">Resume Your Studies</p>
                  <h2 className="mt-4 font-serif text-4xl text-slate-950">Agro-Logistics Across the Great Divide</h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                    Continue the executive certificate pathway on border intelligence, corridor mechanics, and Sino-African operational bridging.
                  </p>
                  <button type="button" className="mt-7 rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-slate-800">
                    Continue module
                  </button>
                </div>
                <div className="relative min-h-72">
                  <img src="/assets/agro-field-operations.jpg" alt="Agro operations module visual" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                </div>
              </div>
            </section>
          ) : null}

          <section>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-slate-500">Curriculum Vault</p>
                <h2 className="mt-2 font-serif text-3xl text-slate-950">In Progress</h2>
              </div>
              <button type="button" className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-700 hover:text-slate-950">
                View all
              </button>
            </div>
            <div className="grid items-stretch gap-7 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.title} course={course} />
              ))}
            </div>
          </section>

          <section className="mt-10 grid gap-7 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-[28px] border border-[#eaeae2] bg-white p-6 shadow-card">
              <h3 className="font-serif text-2xl text-slate-950">Academic Calendar</h3>
              <div className="mt-5 divide-y divide-[#eaeae2]">
                {[
                  ["Corridor map submission", "Agro-Logistics Across the Great Divide", "Friday, 6:00 PM"],
                  ["Automation script review", "Advanced Systems Logic & Web Architecture", "Monday, 10:00 AM"],
                  ["Negotiation brief", "The Five-Language CEO Masterclass", "Wednesday, 4:00 PM"]
                ].map(([title, course, due]) => (
                  <div key={title} className="grid gap-2 py-4 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <p className="font-semibold text-slate-900">{title}</p>
                      <p className="text-sm text-slate-500">{course}</p>
                    </div>
                    <p className="text-sm font-medium text-slate-600">{due}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] bg-slate-900 p-6 text-white shadow-card">
              <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Institute Notice</p>
              <h3 className="mt-3 font-serif text-2xl">Executive office hours</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Private review slots are reserved for candidates preparing field work, institutional proposals, or cross-border operational briefs.
              </p>
              <button type="button" className="mt-6 w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white transition hover:bg-white/20">
                Request a review slot
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function ProgramCard({ course, onEnterPortal }: { course: Course; onEnterPortal: () => void }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[30px] border border-[#eaeae2] bg-white shadow-card transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(26,36,51,0.12)]">
      <div className="relative aspect-video overflow-hidden bg-slate-200">
        <img src={course.image} alt={`${course.title} visual`} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{course.pillar}</p>
        <h3 className="mt-4 font-serif text-2xl leading-tight text-slate-950">{course.title}</h3>
        <p className="mt-2 text-sm font-semibold text-slate-700">{course.instructor}</p>
        <p className="mt-4 text-sm leading-7 text-slate-600">{course.description}</p>
        <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
          {course.modules.map((module) => (
            <li key={module} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
              <span>{module}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto border-t border-[#eaeae2] pt-5">
          <button type="button" onClick={onEnterPortal} className="text-sm font-bold uppercase tracking-[0.16em] text-slate-900 transition hover:text-slate-600">
            Open course corridor
          </button>
        </div>
      </div>
    </article>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[28px] border border-[#eaeae2] bg-white shadow-card">
      <div className="relative aspect-video overflow-hidden bg-slate-200">
        <img src={course.image} alt={`${course.title} classroom visual`} className="h-full w-full object-cover" />
        <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-800">
          Executive
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{course.pillar}</p>
        <h3 className="mt-3 font-serif text-xl leading-tight text-slate-950">{course.title}</h3>
        <p className="mt-2 text-sm text-slate-500">{course.instructor}</p>
        <div className="mt-auto pt-6">
          <div className="mb-2 flex justify-between gap-4 text-xs font-medium text-slate-600">
            <span>{course.progress}% Complete</span>
            <span className="text-slate-900">{course.nextLesson}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-slate-900" style={{ width: `${course.progress}%` }} />
          </div>
        </div>
      </div>
    </article>
  );
}

function Mark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={`grid h-10 w-10 rotate-45 place-items-center rounded-sm border ${inverted ? "border-white/20 bg-white text-slate-950" : "border-slate-900/10 bg-slate-900 text-white"}`}>
      <span className="-rotate-45 font-serif text-lg leading-none">A</span>
    </span>
  );
}

function SubtleGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.32]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(26,36,51,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(26,36,51,0.045) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "linear-gradient(180deg, black, transparent 72%)"
      }}
    />
  );
}

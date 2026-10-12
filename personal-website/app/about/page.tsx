import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Executive Dossier",
  description: "The executive profile of Musa Allama: scholar-practitioner, agro-industrial operator, publisher, educator, technologist, and strategic advisor.",
  alternates: { canonical: "/about" },
};

const journey = [
  "Multilingual study across English, Arabic, Chinese, and regional language contexts.",
  "Field exposure to agriculture, agrochemical trading, farmer education, procurement, and cross-border supplier communication.",
  "Publishing and knowledge-product work across books, manuals, courses, Diwans, and private archives.",
  "Technology and AI workflow development for entrepreneurs, institutions, education, and digital operations.",
  "Continued development of MusaAllama.com as the institutional headquarters joining this work into one operating system.",
];

const expertise = [
  "Agrochemical business and farmer education",
  "Hydroponics and practical agriculture training",
  "Chinese supplier communication and translation advisory",
  "Digital publishing and knowledge products",
  "AI workflows, automation, web systems, and institutional portals",
  "Strategic advisory for education, business, trade, and long-term projects",
];

const values = [
  "Practical scholarship",
  "Commercial discipline",
  "Language precision",
  "Institutional memory",
  "Grounded service",
  "Long-term credibility",
];

export default function AboutPage() {
  return (
    <div className="sa-about-page">
      <section className="sa-simple-hero">
        <div className="sa-container sa-simple-hero__grid">
          <div>
            <p className="sa-kicker">Executive Dossier</p>
            <h1 className="sa-display sa-simple-hero__title">A scholar-practitioner working across knowledge systems and practical markets.</h1>
            <p className="sa-simple-hero__copy">Musa Allama works across agriculture, languages, technology, publishing, education, and strategic advisory, bringing multilingual study together with field-facing execution.</p>
          </div>
          <div className="sa-executive-portrait">
            <img src="/images/musa-portrait.webp" alt="Musa Allama — engineer, scholar, publisher, and strategist" />
            <div><strong>Musa Allama</strong><span>Engineer · Scholar · Publisher · Strategist</span></div>
          </div>
        </div>
      </section>

      <section className="sa-wing-section">
        <div className="sa-container sa-authority__grid">
          <div>
            <p className="sa-kicker sa-kicker--dark">Professional Profile</p>
            <h2 className="sa-display sa-authority__title">Knowledge connected to practical work.</h2>
            <p className="sa-authority__copy">MusaAllama.com brings together publishing, teaching, advisory, agriculture, language work, and digital systems in one institution. The work emphasizes useful knowledge, precise communication, commercial realism, and systems that can outlast a single project.</p>
          </div>
          <div className="sa-authority__signals">
            {["Multilingual communication", "Field-facing agriculture & trade", "Publishing & digital systems"].map((item,index)=>(
              <div className="sa-signal" key={item}><span>0{index+1}</span><div><small>Operating domain</small><p>{item}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-wing-section sa-wing-section--soft">
        <div className="sa-container">
          <div className="sa-wing-section__heading"><p className="sa-kicker sa-kicker--dark">Journey</p><h2 className="sa-display">Languages, agriculture, publishing, and technology.</h2></div>
          <div className="sa-timeline-grid">{journey.map((item,index)=><article key={item}><span>STAGE {index+1}</span><p>{item}</p></article>)}</div>
        </div>
      </section>

      <section className="sa-wing-section">
        <div className="sa-container sa-profile-grid">
          <article><p className="sa-kicker sa-kicker--dark">Areas of Expertise</p><ul>{expertise.map((x)=><li key={x}>{x}</li>)}</ul></article>
          <article><p className="sa-kicker sa-kicker--dark">Professional Values</p><ul>{values.map((x)=><li key={x}>{x}</li>)}</ul></article>
        </div>
      </section>

      <section className="sa-wing-final-cta"><div className="sa-container sa-wing-final-cta__inner"><h2 className="sa-display">For institutional work, enter through the qualified consultation path.</h2><Link href="/consultation" className="sa-button sa-button--gold">Book a Consultation</Link></div></section>
    </div>
  );
}

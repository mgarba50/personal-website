export type DiwanCanonRecord = {
  canonId: string;
  title: string;
  slug: string;
  collection: "Main Canon" | "Extended Canon";
  packageState: string;
  coverState: string;
  publicationState: string;
  alternateTitle?: string;
  previewHref?: string;
};

export type DiwanArchiveRecord = {
  title: string;
  evidenceState: string;
  disposition: string;
};

const mainTitles = [
  ["Diwan Abwab Al-Fath", "diwan-abwab-al-fath"],
  ["Diwan Al-Adl", "diwan-al-adl"],
  ["Diwan Al-I'mar", "diwan-al-imar-003"],
  ["Diwan Al-Ighatha", "diwan-al-ighatha"],
  ["Diwan Al-Imar", "diwan-al-imar-005"],
  ["Diwan Al-Iqtisad", "diwan-al-iqtisad"],
  ["Diwan Al-Istikhbar", "diwan-al-istikhbar"],
  ["Diwan Al-Istishraf", "diwan-al-istishraf"],
  ["Diwan Al-Khazina", "diwan-al-khazina"],
  ["Diwan Al-Mawathiq", "diwan-al-mawathiq"],
  ["Diwan Al-Mu'assasat", "diwan-al-muassasat"],
  ["Diwan Al-Munajat", "diwan-al-munajat"],
  ["Diwan Al-Nisaa", "diwan-al-nisaa"],
  ["Diwan Al-Nufudh", "diwan-al-nufudh"],
  ["Diwan Al-Rada", "diwan-al-rada"],
  ["Diwan Al-Rasad", "diwan-al-rasad"],
  ["Diwan Al-Sifara", "diwan-al-sifara"],
  ["Diwan Al-Taqniya", "diwan-al-taqniya"],
  ["Diwan Al-Tharwa", "diwan-al-tharwa"],
  ["Diwan Al-Umran", "diwan-al-umran"],
  ["Diwan Anfas Al-Khulud", "diwan-anfas-al-khulud"],
  ["Diwan Anwar Al-Habib", "diwan-anwar-al-habib"],
  ["Diwan Asrar Al-Adab", "diwan-asrar-al-adab"],
  ["Diwan Asrar Al-Dhikr", "diwan-asrar-al-dhikr"],
  ["Diwan Asrar Al-Futuwwa", "diwan-asrar-al-futuwwa"],
  ["Diwan Asrar Al-Huru", "diwan-asrar-al-huru"],
  ["Diwan Asrar Al-Ikhlas", "diwan-asrar-al-ikhlas"],
  ["Diwan Asrar Al-Khidmah", "diwan-asrar-al-khidmah"],
  ["Diwan Asrar Al-Khilafa", "diwan-asrar-al-khilafa"],
  ["Diwan Asrar Al-Khulwa", "diwan-asrar-al-khulwa"],
  ["Diwan Asrar Al-Kutman", "diwan-asrar-al-kutman"],
  ["Diwan Asrar Al-Ma'rifah", "diwan-asrar-al-marifah"],
  ["Diwan Asrar Al-Mizan", "diwan-asrar-al-mizan"],
  ["Diwan Asrar Al-Suluk", "diwan-asrar-al-suluk"],
  ["Diwan Asrar Al-Tadbir", "diwan-asrar-al-tadbir"],
  ["Diwan Asrar Al-Yaqeen", "diwan-asrar-al-yaqeen"],
  ["Diwan Bahr Al-Fayda", "diwan-bahr-al-fayda"],
  ["Diwan Jamal Al-Jalal", "diwan-jamal-al-jalal"],
  ["Diwan Lata'if Al-Anwar", "diwan-lataif-al-anwar"],
  ["Diwan Ma'arij Al-Mahabbah", "diwan-maarij-al-mahabbah"],
  ["Diwan Ma'arij Al-Ruh", "diwan-maarij-al-ruh"],
  ["Diwan Mada'in Al-Nur", "diwan-madain-al-nur"],
  ["Diwan Maratib Al-Awliya", "diwan-maratib-al-awliya"],
  ["Diwan Maratib Al-Wujud", "diwan-maratib-al-wujud"],
  ["Diwan Mawaqif Al-Yaqeen", "diwan-mawaqif-al-yaqeen"],
  ["Diwan of the Green Earth", "diwan-of-the-green-earth"],
  ["Diwan Sirr Al-Sara'ir", "diwan-sirr-al-sarair"],
  ["Diwan Tajalliyat Al-Asma", "diwan-tajalliyat-al-asma"],
  ["Diwan Tajalliyat Al-Tawhid", "diwan-tajalliyat-al-tawhid"],
  ["ديوان الظِّلِّ المُؤتَمَن", "diwan-al-zill-al-mutaman"],
] as const;

const releaseReadyNumbers = new Set([13, 15, 17, 18, 20, 47]);
const legacyAuthorityReviewNumbers = new Set([19, 29, 50]);

export const mainDiwanCanon: DiwanCanonRecord[] = mainTitles.map(([title, slug], index) => {
  const number = index + 1;
  const releaseReady = releaseReadyNumbers.has(number);
  const authorityReview = legacyAuthorityReviewNumbers.has(number);
  return {
    canonId: `DIW-CAT-${String(number).padStart(3, "0")}`,
    title,
    slug,
    collection: "Main Canon",
    packageState: "Verified package evidence",
    coverState: releaseReady
      ? "Principal cover locked"
      : authorityReview
        ? "Legacy + Canva authority review"
        : "Principal cover candidate · approval pending",
    publicationState: releaseReady
      ? "Release-ready private master"
      : "Verified publication package · public release pending",
    ...(number === 50
      ? {
          alternateTitle: "Diwan al-Zill al-Mutaman",
          previewHref: "/assets/books/diwan-al-zill-al-mutaman/preview.html",
        }
      : {}),
  };
});

export const extendedDiwanCanon: DiwanCanonRecord[] = [
  {
    canonId: "DIW-EXT-001",
    title: "Diwan Asrar Al-Tadbir — Grand Strategy",
    slug: "diwan-asrar-al-tadbir-grand-strategy",
    collection: "Extended Canon",
    packageState: "Verified distinct publication package",
    coverState: "Principal cover candidate · approval pending",
    publicationState: "Verified independent work · public release pending",
  },
  {
    canonId: "DIW-EXT-002",
    title: "Diwan Al-Thara — The Book of the Soil",
    slug: "diwan-al-thara-book-of-the-soil",
    collection: "Extended Canon",
    packageState: "Verified distinct publication package",
    coverState: "Principal cover candidate · approval pending",
    publicationState: "Verified independent work · public release pending",
  },
];

export const diwanCanon: DiwanCanonRecord[] = [...mainDiwanCanon, ...extendedDiwanCanon];

export const diwanArchive: DiwanArchiveRecord[] = [
  { title: "Diwan Al-Filaha", evidenceState: "Verified expansion-audit package", disposition: "Agricultural Empire retained as an edition/package alias of the same work" },
  { title: "Diwan Al-Ghayb", evidenceState: "Verified expansion-audit package", disposition: "Expansion Canon review" },
  { title: "Diwan Al-Alsun", evidenceState: "Verified expansion-audit package", disposition: "Expansion Canon review; multiple exact cover variants preserved" },
  { title: "Diwan Al-Imdad", evidenceState: "Verified expansion-audit package", disposition: "Expansion Canon review" },
  { title: "Diwan Al-Karamat", evidenceState: "Verified expansion-audit package", disposition: "Expansion Canon review" },
  { title: "Diwan Al-Rumuz", evidenceState: "Verified core work", disposition: "Imperial++ retained as an edition of the same core work" },
  { title: "Diwan Al-Atyaf", evidenceState: "Index and exact-cover evidence", disposition: "Preserve pending standalone package verification" },
  { title: "Diwan Al-Sira", evidenceState: "Index and legacy-cover evidence", disposition: "Preserve pending package reconciliation" },
  { title: "Diwan Al-Mizan", evidenceState: "Separate title-identity evidence", disposition: "Do not bind to Diwan Asrar Al-Mizan; standalone package still requires confirmation" },
  { title: "Diwan Manazil Al-Nur", evidenceState: "Composite-dossier component", disposition: "Preserve as component evidence; do not count independently yet" },
  { title: "Diwan al-Hayat", evidenceState: "Legacy/public-catalogue title", disposition: "Moved out of the general Books shelf into Al-Maqam pending full identity reconciliation" },
  { title: "Diwan Falak", evidenceState: "Legacy cover evidence only", disposition: "Archive intake; manuscript identity not yet confirmed" },
  { title: "Diwan Siraj al-Qurb", evidenceState: "Multiple legacy cover witnesses", disposition: "Archive intake; manuscript identity not yet confirmed" },
  { title: "Diwan Shamil al-Wujud al-Kulli", evidenceState: "Multiple legacy cover witnesses", disposition: "Archive intake; manuscript identity not yet confirmed" },
  { title: "Diwan Asrar al-Takh-theeth", evidenceState: "Legacy cover evidence only", disposition: "Archive intake; manuscript identity not yet confirmed" },
  { title: "Diwan Al-Falah", evidenceState: "Legacy cover evidence only", disposition: "Archive intake; do not confuse with Al-Filaha" },
  { title: "Diwan Al-Gamran", evidenceState: "Legacy cover evidence only", disposition: "Archive intake; identity not inferred from filename similarity" },
  { title: "Diwan Martihi Al-Muhabbah", evidenceState: "Ambiguous legacy cover title", disposition: "Keep unbound; do not attach to Ma'arij Al-Mahabbah without manuscript evidence" },
];

export const diwanBySlug = new Map(diwanCanon.map((record) => [record.slug, record]));
export const releaseReadyDiwans = diwanCanon.filter(
  (record) => record.publicationState === "Release-ready private master",
);

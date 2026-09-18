export type PublicationArchiveRecord = {
  archiveId: string;
  title: string;
  slug: string;
  evidenceState: string;
  disposition: string;
};

export const publicationArchive: PublicationArchiveRecord[] = [
  {
    archiveId: "PUB-ARC-001",
    title: "The Digital Sheikh",
    slug: "the-digital-sheikh",
    evidenceState: "Legacy exact-title cover evidence",
    disposition: "Preserve as a general-publication identity pending authoritative manuscript/package recovery",
  },
  {
    archiveId: "PUB-ARC-002",
    title: "The African Negotiation Code",
    slug: "the-african-negotiation-code",
    evidenceState: "Legacy exact-title cover evidence",
    disposition: "Preserve as a general-publication identity pending authoritative manuscript/package recovery",
  },
  {
    archiveId: "PUB-ARC-003",
    title: "The Meta Intellectual and the Transcendent Society",
    slug: "the-meta-intellectual-and-the-transcendent-society",
    evidenceState: "Legacy exact-title cover evidence",
    disposition: "Preserve as a separate legacy publication identity until manuscript relationship is verified",
  },
  {
    archiveId: "PUB-ARC-004",
    title: "The Meta Intellectual",
    slug: "the-meta-intellectual",
    evidenceState: "Legacy exact-title cover evidence",
    disposition: "Preserve unmerged; compare with the Transcendent Society title only after manuscript evidence is recovered",
  },
];

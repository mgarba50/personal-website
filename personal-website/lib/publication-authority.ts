import { completedManuscriptSlugs } from "./completed-books";

/**
 * Publication authority is deliberately separate from manuscript discovery.
 *
 * A title can exist in the archive without being eligible for the public completed
 * shelf. This gate prevents retired identities, unresolved authorship conflicts,
 * and stale catalogue records from being promoted merely because another source
 * file still mentions them.
 */
export const blockedPublicationSlugs = new Set([
  "prophets-eloquence",
  "kanuri-heart-chinese-tongue",
  "the-illusion-of-control",
]);

/**
 * Recovered works whose complete mother manuscript or publication master has been
 * independently re-grounded against the private Drive archive.
 *
 * Commercial availability is a separate question: these records may still remain
 * unpriced or privately held while editorial/package QA is completed.
 */
export const verifiedRecoveredManuscriptSlugs = new Set([
  "hydroponic-mosque",
  "web-development-for-world-changers",
  "engineering-the-journey",
  "the-global-seeker",
  "nurturing-seekers-of-truth",
  "the-soul-who-will-never-disappoint",
  "bridge-of-meaning",
  "the-book-of-signs",
]);

export const publicCompletedManuscriptSlugs = new Set(
  [...completedManuscriptSlugs, ...verifiedRecoveredManuscriptSlugs].filter(
    (slug) => !blockedPublicationSlugs.has(slug),
  ),
);

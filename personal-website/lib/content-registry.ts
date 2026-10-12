import { academyProducts, academyTopics } from "@/content/academy";
import { corporateCaseStudies, corporateCapabilities, corporateServices } from "@/content/corporate";
import { diwanEntries } from "@/content/diwan";
import { innerCollections, innerEntries } from "@/content/inner-circle";
import type { InnerCollectionSlug } from "@/content/types";

export function getAcademyTopic(slug: string) { return academyTopics.find((topic) => topic.slug === slug); }
export function getAcademyProductsByTopic(topicSlug: string) { return academyProducts.filter((product) => product.topicSlug === topicSlug); }
export function getAcademyProduct(topicSlug: string, productSlug: string) { return academyProducts.find((product) => product.topicSlug === topicSlug && product.slug === productSlug); }
export function getCorporateCapability(slug: string) { return corporateCapabilities.find((capability) => capability.slug === slug); }
export function getCorporateService(slug: string) { return corporateServices.find((service) => service.slug === slug); }
export function getCorporateCaseStudy(slug: string) { return corporateCaseStudies.find((study) => study.slug === slug); }
export function isInnerCollection(value: string): value is InnerCollectionSlug { return innerCollections.some((collection) => collection.slug === value); }
export function getInnerCollection(slug: string) { return innerCollections.find((collection) => collection.slug === slug); }
export function getInnerEntries(collectionSlug: InnerCollectionSlug) { return innerEntries.filter((entry) => entry.collectionSlug === collectionSlug); }
export function getInnerEntry(collectionSlug: InnerCollectionSlug, entrySlug: string) { return innerEntries.find((entry) => entry.collectionSlug === collectionSlug && entry.slug === entrySlug); }
export function getDiwanEntry(slug: string) { return diwanEntries.find((entry) => entry.slug === slug); }

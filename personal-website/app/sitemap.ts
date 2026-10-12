import type { MetadataRoute } from "next";
import { academyProducts, academyTopics } from "@/content/academy";
import { corporateServices } from "@/content/corporate";
import { diwanEntries } from "@/content/diwan";
import { innerEntries } from "@/content/inner-circle";
const baseUrl="https://musaallama.com";
const staticRoutes=["","/corporate","/academy","/inner-circle","/inner-circle/writings","/inner-circle/diwan","/inner-circle/research","/consultation","/about","/legal/privacy","/legal/terms","/legal/refund","/legal/consulting-disclaimer"];
export default function sitemap():MetadataRoute.Sitemap{const now=new Date();return [
 ...staticRoutes.map((route,index)=>({url:`${baseUrl}${route}`,lastModified:now,changeFrequency:(index===0?"weekly":"monthly") as "weekly"|"monthly",priority:index===0?1:route.startsWith("/legal/")?0.2:0.8})),
 ...academyTopics.map((topic)=>({url:`${baseUrl}/academy/${topic.slug}`,lastModified:now,changeFrequency:"monthly" as const,priority:.7})),
 ...academyProducts.map((product)=>({url:`${baseUrl}/academy/${product.topicSlug}/${product.slug}`,lastModified:now,changeFrequency:"monthly" as const,priority:product.purchasable?0.85:0.65})),
 ...corporateServices.map((service)=>({url:`${baseUrl}/corporate/services/${service.slug}`,lastModified:now,changeFrequency:"monthly" as const,priority:.8})),
 ...innerEntries.map((entry)=>({url:`${baseUrl}/inner-circle/${entry.collectionSlug}/${entry.slug}`,lastModified:now,changeFrequency:"monthly" as const,priority:.6})),
 ...diwanEntries.map((entry)=>({url:`${baseUrl}/inner-circle/diwan/${entry.slug}`,lastModified:now,changeFrequency:"yearly" as const,priority:.35})),
];}

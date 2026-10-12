import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
const root=process.cwd(); const problems=[]; const notes=[];
const forbidden=["private","_secure-staging","secure-staging"];
for(const dir of forbidden){if(existsSync(path.join(root,dir))) problems.push(`Forbidden secure-content directory exists in public repo: ${dir}/`);}
const required=["app/page.tsx","app/academy/page.tsx","app/corporate/page.tsx","app/inner-circle/page.tsx","content/academy.ts","content/corporate.ts","content/inner-circle.ts","content/diwan.ts","secure-download-manifest.json"];
for(const file of required){if(!existsSync(path.join(root,file))) problems.push(`Missing required final file: ${file}`);}
const manifest=JSON.parse(readFileSync(path.join(root,"secure-download-manifest.json"),"utf8"));
const productSlugs=Object.keys(manifest.products||{}); if(new Set(productSlugs).size!==productSlugs.length)problems.push("Duplicate secure-download product slug detected.");
for(const bucket of ["SUPABASE_PRODUCT_FILES_BUCKET","SUPABASE_LEAD_MAGNETS_BUCKET","SUPABASE_SOURCE_VAULT_BUCKET","SUPABASE_RECEIPTS_BUCKET"]){if(!process.env[bucket])notes.push(`${bucket} is not set in the current shell; configure .env.local before live testing.`);}
if(problems.length){console.error("FINAL PREFLIGHT FAILED");for(const x of problems)console.error(`- ${x}`);process.exit(1);}console.log("FINAL PREFLIGHT PASS");for(const x of notes)console.log(`NOTE: ${x}`);

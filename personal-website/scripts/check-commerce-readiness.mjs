// Read-only live checks. Run with an untracked environment file; never print values.
import { loadRegistry } from "./load-registry.mjs";
const required=["NEXT_PUBLIC_SUPABASE_URL","SUPABASE_SERVICE_ROLE_KEY"];
const publicKey=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const missing=required.filter(key=>!process.env[key]);
if(!publicKey)missing.push("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY");
if(missing.length){console.error("Missing configuration names: "+missing.join(", "));process.exit(1);}
const base=process.env.NEXT_PUBLIC_SUPABASE_URL.replace(/\/$/,"");
const serviceHeaders={apikey:process.env.SUPABASE_SERVICE_ROLE_KEY,Authorization:`Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`};
const publicHeaders={apikey:publicKey,Authorization:`Bearer ${publicKey}`};
const failures=[];
async function check(label,operation){try{if(!await operation())throw new Error();console.log("PASS: "+label);}catch{failures.push(label);console.error("FAIL: "+label);}}
const get=(path,headers=serviceHeaders,method="GET")=>fetch(base+path,{headers,method,cache:"no-store",signal:AbortSignal.timeout(15000)});
await check("Public Auth key accepted",async()=> (await get("/auth/v1/settings",publicHeaders)).ok);
await Promise.all(["commerce_orders?select=id,bank_reference&limit=0","download_tokens?select=commerce_order_id&limit=0","manual_payment_proofs?select=commerce_order_id&limit=0"].map(path=>check("Migration table: "+path.split("?")[0],async()=> (await get("/rest/v1/"+path)).ok)));
await check("At least one explicitly granted admin role",async()=>{const response=await get("/rest/v1/app_user_roles?select=user_id&role=eq.admin&limit=1");return response.ok&&(await response.json()).length===1;});
const buckets=[process.env.SUPABASE_RECEIPTS_BUCKET||"payment-receipts",process.env.SUPABASE_PRODUCT_FILES_BUCKET||"product-files",process.env.SUPABASE_LEAD_MAGNETS_BUCKET||"lead-magnets",process.env.SUPABASE_SOURCE_VAULT_BUCKET||"source-vault"];
await Promise.all(buckets.map(bucket=>check("Private bucket: "+bucket,async()=>{const response=await get("/storage/v1/bucket/"+encodeURIComponent(bucket));return response.ok&&(await response.json()).public===false;})));
const {academyProducts}=loadRegistry("content/academy.ts");
const {canPurchaseBook,deliveryFile}=loadRegistry("lib/checkout.ts");
for(const product of academyProducts.filter(canPurchaseBook)){
 const path=deliveryFile(product.slug);
 const objectPath=encodeURIComponent(buckets[1])+"/"+path?.split("/").map(encodeURIComponent).join("/");
 await check("Approved PDF exists: "+product.slug,async()=>{if(!path)return false;const response=await get("/storage/v1/object/authenticated/"+objectPath,serviceHeaders,"HEAD");return response.ok&&(response.headers.get("content-type")||"").includes("application/pdf");});
 await check("Anonymous PDF access denied: "+product.slug,async()=>{const responses=await Promise.all([get("/storage/v1/object/authenticated/"+objectPath,publicHeaders,"HEAD"),get("/storage/v1/object/public/"+objectPath,publicHeaders,"HEAD")]);return responses.every(r=>[400,401,403,404].includes(r.status));});
}
await check("Book delivery sender key configured",async()=>process.env.EMAIL_PROVIDER==="postmark"?Boolean(process.env.POSTMARK_SERVER_TOKEN):Boolean(process.env.RESEND_API_KEY));
if(failures.length){console.error(`${failures.length} readiness checks failed. Keep COMMERCE_ENABLED=false.`);process.exit(1);}
console.log("Read-only checks passed. Human checks still required: sender-domain delivery, correct editions, bank settings, another user's storage denial and a controlled live order. No payment or email was sent by this script.");

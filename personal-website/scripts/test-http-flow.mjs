import assert from "node:assert/strict";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { createHmac, randomUUID } from "node:crypto";
import { testDatabase, ADMIN, BUYER, OTHER } from "./test-database.mjs";

const db=await testDatabase(), sessions=new Map(), emails=[];
let confirmationCalls=0,passwordChanges=0;
const consumedConfirmations=new Set();
const people={"admin@example.test":ADMIN,"buyer@example.test":BUYER,"other@example.test":OTHER};
const authUser=id=>({id,aud:"authenticated",role:"authenticated",email:Object.keys(people).find(email=>people[email]===id),email_confirmed_at:new Date().toISOString(),app_metadata:{provider:"email",providers:["email"]},user_metadata:{name:"HTTP Fixture"},created_at:new Date().toISOString(),updated_at:new Date().toISOString()});
function session(id){
  const user=authUser(id), encode=value=>Buffer.from(JSON.stringify(value)).toString("base64url");
  const unsigned=encode({alg:"HS256",typ:"JWT"})+"."+encode({sub:id,aud:"authenticated",role:"authenticated",email:user.email,iat:Math.floor(Date.now()/1000),exp:Math.floor(Date.now()/1000)+3600});
  const token=unsigned+"."+createHmac("sha256","isolated-auth-fixture").update(unsigned).digest("base64url");
  sessions.set(token,user);
  return {access_token:token,token_type:"bearer",expires_in:3600,expires_at:Math.floor(Date.now()/1000)+3600,refresh_token:randomUUID(),user};
}
async function jsonBody(req){const chunks=[];for await(const chunk of req)chunks.push(chunk);return Buffer.concat(chunks).length?JSON.parse(Buffer.concat(chunks).toString()):{};}
const backend=createServer(async(req,res)=>{
  const send=(status,data)=>{res.writeHead(status,{"Content-Type":"application/json"});res.end(JSON.stringify(data));};
  try{
    const url=new URL(req.url,"http://backend.invalid");
    const token=(req.headers.authorization||"").replace(/^Bearer /,"");
    const person=sessions.get(token);
    if(url.pathname==="/auth/v1/token"){
      const body=await jsonBody(req), id=people[body.email];
      return id && body.password==="Fixture-password-123" ? send(200,session(id)):send(400,{error:"invalid_grant",error_description:"Invalid login credentials"});
    }
    if(url.pathname==="/auth/v1/user"){
      if(!person)return send(401,{msg:"Invalid token"});
      if(req.method==="PUT"){await jsonBody(req);passwordChanges++;return send(200,person);}
      return send(200,person);
    }
    if(url.pathname==="/auth/v1/logout")return send(204,{});
    if(url.pathname==="/auth/v1/verify"){
      const body=await jsonBody(req);confirmationCalls++;
      if(body.token_hash!=="f".repeat(64)||consumedConfirmations.has(body.token_hash))return send(400,{msg:"Invalid confirmation"});
      consumedConfirmations.add(body.token_hash);return send(200,session(BUYER));
    }
    if(url.pathname==="/auth/v1/recover" || url.pathname==="/auth/v1/signup"){emails.push(url.pathname);await jsonBody(req);return send(200,{});}
    if(url.pathname.startsWith("/rest/v1/")){
      const privileged=req.headers.apikey==="fixture-service-key";
      if(!privileged&&!person)return send(401,{message:"Unauthorised"});
      const result=await db.transaction(async tx=>{
        await tx.exec(`set local role ${privileged?"service_role":"authenticated"}`);
        if(person)await tx.query("select set_config('request.jwt.claim.sub',$1,true)",[person.id]);
        if(url.pathname.startsWith("/rest/v1/rpc/")){
          const name=url.pathname.split("/").pop();assert.match(name,/^commerce_[a-z_]+$/);
          const values=await jsonBody(req),keys=Object.keys(values);
          const args=keys.map(k=>["p_order","p_receipt","p_links"].includes(k)?JSON.stringify(values[k]):values[k]);
          const placeholders=keys.map((k,i)=>`${k}=>$${i+1}${["p_order","p_receipt","p_links"].includes(k)?"::jsonb":""}`);
          return (await tx.query(`select ${name}(${placeholders.join(",")}) as result`,args)).rows[0].result;
        }
        const table=url.pathname.split("/").pop();assert(["app_user_roles","commerce_orders","manual_payment_proofs","download_tokens"].includes(table));
        const columns=url.searchParams.get("select")||"*";assert(columns==="*"||/^[a-z_,]+$/.test(columns));
        const conditions=[],args=[];
        for(const [key,value]of url.searchParams)if(value.startsWith("eq.")){assert.match(key,/^[a-z_]+$/);args.push(value.slice(3));conditions.push(`${key}::text=$${args.length}`);}
        const rows=(await tx.query(`select ${columns} from ${table}${conditions.length?" where "+conditions.join(" and "):""} limit 100`,args)).rows;
        return (req.headers.accept||"").includes("vnd.pgrst.object") ? rows[0]||null:rows;
      });
      return send(200,result);
    }
    if(url.pathname.startsWith("/storage/v1/object/sign/"))return send(200,{signedURL:url.pathname.replace("/storage/v1","")+"?token=http-fixture"});
    if(url.pathname.startsWith("/storage/v1/object/")) {for await(const chunk of req){assert(Buffer.isBuffer(chunk));}return send(200,{});}
    send(404,{message:"Unexpected fixture route"});
  }catch(error){send(400,{message:error.message});}
});
await new Promise(resolve=>backend.listen(0,"127.0.0.1",resolve));
const backendUrl=`http://127.0.0.1:${backend.address().port}`;
const port=3317,base=`http://127.0.0.1:${port}`;
let output="", app=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--hostname","127.0.0.1","--port",String(port)],{cwd:process.cwd(),env:{...process.env,NODE_ENV:"production",NEXT_PUBLIC_SITE_URL:base,NEXT_PUBLIC_SUPABASE_URL:backendUrl,NEXT_PUBLIC_SUPABASE_ANON_KEY:"fixture-anon-key",SUPABASE_SERVICE_ROLE_KEY:"fixture-service-key",COMMERCE_ENABLED:"true",RESEND_API_KEY:"",POSTMARK_SERVER_TOKEN:"",VERCEL:"",VERCEL_ENV:""},stdio:["ignore","pipe","pipe"]});
app.stdout.on("data",data=>{output=(output+data).slice(-8000);});app.stderr.on("data",data=>{output=(output+data).slice(-8000);});
const jar=()=>new Map();
const cookieHeader=j=>[...j].map(([k,v])=>k+"="+v).join("; ");
async function visit(path,options={},j=jar()){
  const response=await fetch(base+path,{...options,headers:{...options.headers,...(j.size?{Cookie:cookieHeader(j)}:{})},redirect:"manual"});
  for(const cookie of response.headers.getSetCookie()){const [part]=cookie.split(";");const i=part.indexOf("=");j.set(part.slice(0,i),part.slice(i+1));}
  return response;
}
let count=0;const eq=(a,b,message)=>{assert.equal(a,b,message);count++;};
async function login(email){
  const j=jar(),page=await visit("/login",{},j),html=await page.text();
  const action=html.match(/name="(\$ACTION_ID_[^"]+)"/);assert(action,"Login action is rendered");
  const form=new FormData();form.set(action[1],"");form.set("email",email);form.set("password","Fixture-password-123");form.set("next","/dashboard");
  const response=await visit("/login",{method:"POST",headers:{Origin:base},body:form},j);
  eq(response.status,303,"Real sign-in action redirects after authentication");
  assert(response.headers.getSetCookie().some(value=>/HttpOnly/i.test(value)),"Server auth cookies are HttpOnly");count++;
  return j;
}
try{
  let ready=false;
  for(let i=0;i<100;i++){try{if((await fetch(base+"/api/health")).ok){ready=true;break;}}catch{}await new Promise(resolve=>setTimeout(resolve,100));}
  assert(ready,"Compiled server did not start");
  for(const path of ["/login","/signup","/forgot-password","/checkout?type=book&slug=the-modern-farmer","/dashboard"]){const response=await visit(path);eq(response.status,200,path);const html=await response.text();assert(!html.includes("embed.tawk.to"),"Private surfaces must not render public chat");count++;}
  const anonymous=await visit("/admin");eq(anonymous.status,307);assert.match(anonymous.headers.get("location"),/^\/login\?next=/);count++;
  const adminApi=await visit(`/api/admin/orders/${randomUUID()}`,{method:"POST",headers:{Origin:base}});eq(adminApi.status,401);
  const buyer=await login("buyer@example.test");
  const adminPage=await visit("/admin",{},buyer);eq(adminPage.status,307);eq(adminPage.headers.get("location"),"/dashboard?notice=restricted");
  const orderResponse=await visit("/api/orders",{method:"POST",headers:{Origin:base,"Content-Type":"application/json"},body:JSON.stringify({type:"book",slug:"the-modern-farmer",name:"HTTP Buyer",email:"spoof@example.test",phone:"08000000000",requestKey:randomUUID(),amount:1})},buyer);
  eq(orderResponse.status,200);const order=(await orderResponse.json()).order;eq(order.amount,"NGN 3,500");
  const receipt=new FormData();receipt.set("reference","HTTP-RECEIPT");receipt.set("amountPaid","3500");receipt.set("receipt",new File(["%PDF-HTTP-fixture"],"receipt.pdf",{type:"application/pdf"}));
  eq((await visit("/api/manual-payment",{method:"POST",headers:{Origin:base},body:receipt},buyer)).status,200);
  const other=await login("other@example.test");
  eq((await visit(`/api/customer/orders/${order.id}/downloads`,{method:"POST",headers:{Origin:base}},other)).status,403);
  const admin=await login("admin@example.test");
  const adminScreen=await visit(`/admin/orders/${order.id}`,{},admin);eq(adminScreen.status,200);assert((await adminScreen.text()).includes(order.orderNumber));count++;
  const approval=new FormData();for(const [k,v]of Object.entries({action:"approve",note:"Fixture bank check",bankVerified:"yes",bankReference:"HTTP-BANK-1",verifiedAmount:"3500"}))approval.set(k,v);
  eq((await visit(`/api/admin/orders/${order.id}`,{method:"POST",headers:{Origin:base},body:approval},admin)).status,303);
  const downloads=await visit(`/api/customer/orders/${order.id}/downloads`,{method:"POST",headers:{Origin:base}},buyer);eq(downloads.status,200);const link=(await downloads.json()).links[0].href;
  const file=await visit(new URL(link).pathname,{},buyer);eq(file.status,303);assert(file.headers.get("location").startsWith(backendUrl+"/storage/v1/object/sign/"));count++;
  const history=await visit("/dashboard",{},buyer);assert((await history.text()).includes(order.orderNumber));count++;
  const recovery=jar(),confirmPath="/auth/confirm?token_hash="+"f".repeat(64)+"&type=recovery";
  const landing=await visit(confirmPath,{},recovery);eq(landing.status,200);eq(confirmationCalls,0,"Email scanners do not consume confirmation on GET");
  eq(landing.headers.get("referrer-policy"),"no-referrer");
  const confirmAction=(await landing.text()).match(/name="(\$ACTION_ID_[^"]+)"/);assert(confirmAction);count++;
  const confirmForm=new FormData();confirmForm.set(confirmAction[1],"");confirmForm.set("token_hash","f".repeat(64));confirmForm.set("type","recovery");
  const confirmed=await visit(confirmPath,{method:"POST",headers:{Origin:base},body:confirmForm},recovery);eq(confirmed.status,303);eq(confirmationCalls,1);
  const passwordPage=await visit("/account/password",{},recovery);eq(passwordPage.status,200,"Recovery reaches dynamic authenticated password page");
  const passwordAction=(await passwordPage.text()).match(/name="(\$ACTION_ID_[^"]+)"/);assert(passwordAction);count++;
  const passwordForm=new FormData();passwordForm.set(passwordAction[1],"");passwordForm.set("password","Replacement-fixture-password-123");
  eq((await visit("/account/password",{method:"POST",headers:{Origin:base},body:passwordForm},recovery)).status,303);eq(passwordChanges,1);
  console.log(`Compiled HTTP flow passed: ${count} assertions using the real Supabase SDK, sign-in Server Actions, cookies, Next.js routes and PostgreSQL. Auth/storage are isolated fixtures; no real email or payment sent.`);
}catch(error){console.error(output);throw error;}
finally{app.kill("SIGTERM");await new Promise(resolve=>backend.close(resolve));await db.close();}

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet, Routes, RouterLink } from '@angular/router';
import { AfterViewInit, Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { io } from 'socket.io-client';

const api = 'http://localhost:4000/api';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
  <main [class.rtl]="locale()==='ar'" style="max-width:1400px;margin:auto;padding:20px;display:grid;gap:12px;">
    <header class="panel" style="display:flex;justify-content:space-between;align-items:center;">
      <h1 style="margin:0;color:var(--gold);letter-spacing:.08em">YERWA ORACLE // COMMAND GRID</h1>
      <button (click)="toggleLocale()">{{ locale()==='ar' ? 'EN' : 'AR' }}</button>
    </header>
    <nav class="panel" style="display:flex;gap:10px;flex-wrap:wrap;">
      <a routerLink="/dashboard">Dashboard</a><a routerLink="/unlock">Unlock</a><a routerLink="/oracle">Oracle</a><a routerLink="/planner">Planner</a>
      <a routerLink="/feeding-gate">Feeding Gate</a><a routerLink="/knowledge">Knowledge</a><a routerLink="/sessions">Sessions</a><a routerLink="/settings">Settings</a>
    </nav>
    <router-outlet></router-outlet>
  </main>
  `
})
class ShellComponent {
  locale = signal<'en'|'ar'>((localStorage.getItem('locale') as 'en'|'ar') || 'en');
  toggleLocale(){const next=this.locale()==='ar'?'en':'ar';this.locale.set(next);localStorage.setItem('locale',next);document.documentElement.dir=next==='ar'?'rtl':'ltr';}
}

@Component({standalone:true,imports:[CommonModule],template:`
<section class="panel">
  <h2>Command Dashboard</h2>
  <div class="grid">
    <div class="panel"><div>Uptime</div><div class="mono">{{telemetry?.uptimeSeconds || 0}}s</div></div>
    <div class="panel"><div>API Latency</div><div class="mono">{{telemetry?.apiLatencyMs || 0}}ms</div></div>
    <div class="panel"><div>Ingestion Queue</div><div class="mono">{{ingestStatus}}</div></div>
  </div>
  <h3>Global Nodes</h3>
  <div class="grid">
    <div class="panel" *ngFor="let n of telemetry?.nodes || []">
      <div>{{n.label}}</div>
      <div class="mono">{{n.lat}}, {{n.lon}}</div>
      <div class="mono">{{n.timezone}} | {{n.currentLord}}</div>
      <div class="mono">Next {{n.nextHourStart}}</div>
    </div>
  </div>
  <canvas #hud width="920" height="220" style="width:100%;border:1px solid #2f3947"></canvas>
</section>`})
class DashboardPage implements AfterViewInit{
  http=inject(HttpClient);telemetry:any;ingestStatus='idle';@ViewChild('hud') hud?:ElementRef<HTMLCanvasElement>;
  ngAfterViewInit(){
    this.http.get(`${api}/telemetry/nodes`,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).subscribe(t=>this.telemetry=t);
    const socket=io('http://localhost:4000');socket.on('telemetry',(d:any)=>{this.telemetry=d;this.renderHud();});
    this.renderHud();
  }
  renderHud(){const c=this.hud?.nativeElement;if(!c)return;const ctx=c.getContext('2d');if(!ctx)return;ctx.fillStyle='#07090d';ctx.fillRect(0,0,c.width,c.height);ctx.strokeStyle='#d4af37';ctx.lineWidth=1;
    const t=Date.now()/1000;for(let i=0;i<4;i++){ctx.beginPath();for(let x=0;x<c.width;x+=8){const y=50+i*40+Math.sin((x/80)+t+i)*18;ctx.lineTo(x,y);}ctx.stroke();}
    ctx.fillStyle='#8d99a6';ctx.fillText('AZIMUTH/ELEVATION STREAM',12,16);
  }
}

@Component({standalone:true,imports:[FormsModule,CommonModule],template:`<section class="panel"><h2>Unlock / PIN</h2><input [(ngModel)]="pin" placeholder="PIN"><div style="display:flex;gap:8px;margin-top:8px"><button (click)="setPin()">Set PIN</button><button (click)="unlock()">Unlock</button></div><p>{{msg}}</p></section>`})
class UnlockPage{pin='';msg='';http=inject(HttpClient);setPin(){this.http.post(`${api}/auth/set-pin`,{pin:this.pin}).subscribe(()=>this.msg='PIN saved');}unlock(){this.http.post<any>(`${api}/auth/unlock`,{pin:this.pin}).subscribe(r=>{localStorage.setItem('token',r.token);this.msg='Unlocked';},()=>this.msg='Invalid PIN');}}

@Component({standalone:true,imports:[FormsModule,CommonModule],template:`<section class="panel"><h2>Oracle</h2><input [(ngModel)]="name" placeholder="Name"><textarea [(ngModel)]="question" placeholder="Question"></textarea><select [(ngModel)]="gate"><option *ngFor="let g of gates">{{g}}</option></select><button (click)="cast()">Cast + Synthesize</button><pre>{{result|json}}</pre><article class="panel" *ngIf="synth">{{synth}}</article></section>`})
class OraclePage{name='';question='';gate='radiance';gates=['radiance','permanence','royalty','decree'];result:any;synth='';http=inject(HttpClient);
cast(){this.http.post<any>(`${api}/oracle/cast`,{name:this.name,question:this.question,gate:this.gate,language:localStorage.getItem('locale')||'en',location:{lat:11.8466,lon:13.1571}},{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).subscribe(r=>{this.result=r;this.http.post<any>(`${api}/oracle/synthesize`,{gate:this.gate,hourLord:r?.planetaryHour?.lord,language:localStorage.getItem('locale')||'en',resonance:r?.resonance?.band,signals:r?.signals,snippets:(r?.knowledgeHits||[]).map((k:any)=>k.excerpt),question:this.question,name:this.name},{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).subscribe(s=>this.synth=s.tafsir);});}}

@Component({standalone:true,imports:[FormsModule],template:`<section class="panel"><h2>Planner</h2><select [(ngModel)]="goal"><option *ngFor="let g of goals">{{g}}</option></select><button (click)="plan()">Generate</button><pre>{{result|json}}</pre></section>`})
class PlannerPage{goal='contract';goals=['contract','travel','money','health','authority','study','love','protection'];result:any;http=inject(HttpClient);plan(){this.http.post(`${api}/election`,{goal:this.goal,location:{lat:11.8466,lon:13.1571}},{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).subscribe(r=>this.result=r);}}

@Component({standalone:true,imports:[CommonModule],template:`<section class="panel"><h2>Feeding Gate</h2><input type="file" (change)="upload($event)"><p>{{msg}}</p></section>`})
class FeedingGatePage{msg='';http=inject(HttpClient);upload(e:any){const f=e.target.files?.[0];if(!f)return;const fd=new FormData();fd.append('pdf',f);this.msg='uploading';this.http.post(`${api}/ingest/upload`,fd,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).subscribe(()=>this.msg='ingested',()=>this.msg='failed');}}

@Component({standalone:true,imports:[FormsModule,CommonModule],template:`<section class="panel"><h2>Knowledge</h2><input [(ngModel)]="q" placeholder="Search"><div style="display:flex;gap:8px"><button (click)="keyword()">Keyword</button><button (click)="semantic()">Semantic</button></div><pre>{{result|json}}</pre></section>`})
class KnowledgePage{q='';result:any;http=inject(HttpClient);headers(){return {Authorization:`Bearer ${localStorage.getItem('token')}`};}keyword(){this.http.get(`${api}/knowledge/search?q=${encodeURIComponent(this.q)}`,{headers:this.headers()}).subscribe(r=>this.result=r);}semantic(){this.http.get(`${api}/knowledge/semantic?q=${encodeURIComponent(this.q)}`,{headers:this.headers()}).subscribe(r=>this.result=r);}}

@Component({standalone:true,imports:[CommonModule],template:`<section class="panel"><h2>Sessions</h2><button (click)="load()">Refresh</button><pre>{{result|json}}</pre></section>`})
class SessionsPage{result:any;http=inject(HttpClient);load(){this.http.get(`${api}/sessions`,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).subscribe(r=>this.result=r);}}

@Component({standalone:true,imports:[FormsModule,CommonModule],template:`<section class="panel"><h2>Settings</h2><select [(ngModel)]="locale"><option value="en">English</option><option value="ar">العربية</option></select><button (click)="save()">Save</button><pre>{{result|json}}</pre></section>`})
class SettingsPage{locale=localStorage.getItem('locale')||'en';result:any;http=inject(HttpClient);save(){this.http.post(`${api}/settings`,{locale:this.locale,location:{label:'Maiduguri, Nigeria',lat:11.8466,lon:13.1571,source:'manual'}},{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).subscribe(r=>this.result=r);}}

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPage },
  { path: 'unlock', component: UnlockPage },
  { path: 'oracle', component: OraclePage },
  { path: 'planner', component: PlannerPage },
  { path: 'feeding-gate', component: FeedingGatePage },
  { path: 'knowledge', component: KnowledgePage },
  { path: 'sessions', component: SessionsPage },
  { path: 'settings', component: SettingsPage }
];

bootstrapApplication(ShellComponent, { providers: [provideHttpClient(), provideRouter(routes)] });

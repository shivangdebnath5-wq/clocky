const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const pad=n=>String(n).padStart(2,'0');
const store={
  get(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v??d}catch{return d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}
};

/* ---------- THEMES ---------- */
const THEMES=[
  {id:'sakura',name:'Sakura',c:'#ff8fe0'},
  {id:'stellar',name:'Stellar Bloom',c:'#f5c400'},
  {id:'caterpillar',name:'Caterpillar',c:'#00ffcc'},
  {id:'moonlight',name:'Moonlight',c:'#b4d2ff'},
  {id:'blackhole',name:'Black Hole',c:'#ffffff'},
  {id:'blackdragon',name:'Black Dragon',c:'#ff4500'},
  {id:'aurora',name:'Aurora Borealis',c:'#00ffe0'},
  {id:'neonwave',name:'Neon Wave',c:'#ff00ff'},
  {id:'sunlight',name:'Sunlight',c:'#ff8f00'},
  {id:'ocean',name:'Deep Ocean',c:'#38bdf8'},
  {id:'autumn',name:'Autumn',c:'#e8742a'},
  {id:'rain',name:'Midnight Rain',c:'#7aa2ff'},
  {id:'halloween',name:'Halloween',c:'#ff7a00'},
  {id:'snowfall',name:'Snowfall',c:'#9fd8ff'},
  {id:'fireflies',name:'Firefly Forest',c:'#d4ff4a'},
  {id:'galaxy',name:'Galaxy',c:'#c084fc'},
  {id:'diwali',name:'Diwali',c:'#ffb300'}
];

const fx=$('#fx');
const rnd=(a,b)=>a+Math.random()*(b-a);
function el(cls,css={},parent=fx,tag='div'){
  const d=document.createElement(tag);d.className=cls;Object.assign(d.style,css);parent.appendChild(d);return d;
}
/* falling/rising particles; negative delay makes the scene look populated at once */
function swarm(cls,n,dur){
  for(let i=0;i<n;i++)el(cls,{left:rnd(0,100)+'vw',animationDuration:rnd(dur,dur*1.6)+'s',animationDelay:-rnd(0,dur*1.6)+'s'});
}
let stopFx=()=>{};
const FX={
  sakura(){el('sakura-tree');swarm('petal',25,6)},
  stellar(){swarm('star',30,5)},
  caterpillar(){
    const eyes=[{left:'30%'},{right:'30%'}].map(p=>{const e=el('eye',p);return el('pupil',{},e)});
    const h=ev=>{const x=ev.clientX/innerWidth,y=ev.clientY/innerHeight;eyes.forEach(p=>p.style.transform=`translate(${x*20-10}px,${y*20-10}px)`)};
    addEventListener('pointermove',h);stopFx=()=>removeEventListener('pointermove',h);
  },
  moonlight(){
    el('moon');
    for(let i=0;i<80;i++)el('moon-star',{left:rnd(0,100)+'vw',top:rnd(0,100)+'vh',animationDuration:rnd(1,3)+'s'});
    el('mist');
  },
  blackhole(){
    const bh=el('blackhole');
    for(let i=0;i<24;i++)el('',{'--r':rnd(80,150)+'px',animationDuration:rnd(4,8)+'s',animationDelay:-rnd(0,8)+'s'},bh,'i');
  },
  blackdragon(){
    const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');
    svg.setAttribute('viewBox','0 0 200 200');svg.setAttribute('class','blackdragon');
    ['M10,100 Q50,10 100,100 T190,100','M10,120 Q50,40 100,120 T190,120'].forEach((d,i)=>{
      const p=document.createElementNS(ns,'path');
      p.setAttribute('d',d);p.setAttribute('stroke',i?'#ff8c00':'#ff4500');p.setAttribute('fill','none');
      p.setAttribute('stroke-width',i?2:4);p.setAttribute('stroke-linecap','round');svg.appendChild(p);
    });
    fx.appendChild(svg);
  },
  aurora(){el('aurora-bar')},
  neonwave(){el('wave')},
  sunlight(){el('sun');swarm('solar-particle',40,4)},
  ocean(){for(let i=0;i<28;i++)el('bubble',{left:rnd(0,100)+'vw',width:rnd(6,22)+'px',height:'',animationDuration:rnd(7,14)+'s',animationDelay:-rnd(0,14)+'s'})},
  autumn(){swarm('leaf',22,8)},
  rain(){swarm('drop',70,1.1)},
  halloween(){
    el('hmoon');el('mist');
    emoji('fl',['🎃','👻','🎃','🎃','👻','🕸️'],14,16);
    for(let i=0;i<5;i++){
      const b=el('bat',{top:rnd(4,45)+'vh',animationDuration:rnd(8,14)+'s',animationDelay:-rnd(0,12)+'s'});b.textContent='🦇';
    }
    el('witch').textContent='🧙‍♀️🧹';
    el('pumpkin-big',{left:'4%'}).textContent='🎃';
    el('pumpkin-big',{right:'4%',fontSize:'4rem',animationDelay:'-1.2s'}).textContent='🎃';
  },
  snowfall(){
    el('drift');
    for(let i=0;i<70;i++){
      const s=rnd(2,7)+'px';
      el('snow',{left:rnd(0,100)+'vw',width:s,height:s,opacity:rnd(.5,1),animationDuration:rnd(7,14)+'s',animationDelay:-rnd(0,14)+'s'});
    }
  },
  fireflies(){
    const pts=['0 100%'];
    for(let x=0;x<=100;x+=4)pts.push(`${x}% ${rnd(25,70)}%`,`${x+2}% ${rnd(70,95)}%`);
    pts.push('100% 100%');
    el('forest',{clipPath:`polygon(${pts.join(',')})`});
    for(let i=0;i<40;i++)el('firefly',{
      left:rnd(0,100)+'vw',top:rnd(20,95)+'vh','--dx':rnd(-80,80)+'px','--dy':rnd(-60,60)+'px',
      '--d':rnd(6,12)+'s','--b':rnd(2,5)+'s',animationDelay:-rnd(0,8)+'s'
    });
  },
  galaxy(){
    [['#7c3aed','5%','10%'],['#2563eb','55%','40%'],['#db2777','20%','60%']].forEach(([c,l,t],i)=>
      el('nebula',{background:c,left:l,top:t,animationDelay:-i*9+'s'}));
    for(let i=0;i<60;i++)el('moon-star',{left:rnd(0,100)+'vw',top:rnd(0,100)+'vh',animationDuration:rnd(1,3)+'s'});
    for(let i=0;i<5;i++)el('shoot',{left:rnd(0,60)+'vw',top:rnd(0,40)+'vh',animationDuration:rnd(6,12)+'s',animationDelay:-rnd(0,10)+'s'});
  },
  diwali(){
    const cols=['#ffd700','#ff4d6d','#4dd2ff','#ff9f1c','#b388ff','#7dff8a'];
    for(let i=0;i<40;i++)el('moon-star',{left:rnd(0,100)+'vw',top:rnd(0,70)+'vh',animationDuration:rnd(1,3)+'s'});
    for(let i=0;i<6;i++){
      const b=el('burst',{left:rnd(8,92)+'vw',top:rnd(8,45)+'vh'});
      for(let j=0;j<16;j++)el('spark',{'--a':j*22.5+'deg','--d':rnd(55,90)+'px','--c':cols[i],animationDelay:-i+'s'},b);
    }
    swarm('lantern',9,18);
    swarm('marigold',22,7);
    for(let i=0;i<9;i++)el('diya',{left:(5+i*11)+'%'}).style.setProperty('--f',-rnd(0,1)+'s');
  }
};
/* emoji particles (pumpkins, ghosts...) */
function emoji(cls,chars,n,dur){
  for(let i=0;i<n;i++){
    const d=el(cls,{left:rnd(0,100)+'vw',fontSize:rnd(1.6,3.6)+'rem',animationDuration:rnd(dur,dur*1.5)+'s',animationDelay:-rnd(0,dur*1.5)+'s'});
    d.textContent=chars[i%chars.length];
  }
}

function setTheme(id){
  const t=THEMES.find(t=>t.id===id)||THEMES[0];
  stopFx();stopFx=()=>{};fx.innerHTML='';
  document.body.dataset.theme=t.id;
  FX[t.id]?.();
  $('#pickName').textContent=t.name;
  $('#pickDot').style.background=t.c;
  $$('#pickMenu li').forEach(li=>li.setAttribute('aria-selected',li.dataset.id===t.id));
  store.set('theme',t.id);
}

/* picker menu */
const menu=$('#pickMenu'),pickBtn=$('#pickBtn');
THEMES.forEach(t=>{
  const li=document.createElement('li');li.dataset.id=t.id;li.setAttribute('role','option');
  li.innerHTML='<button type="button"><span class="dot"></span><span></span></button>';
  li.querySelector('.dot').style.background=t.c;
  li.querySelectorAll('span')[1].textContent=t.name;
  li.onclick=()=>{setTheme(t.id);toggleMenu(false);pickBtn.focus()};
  menu.appendChild(li);
});
function toggleMenu(open){
  menu.hidden=!open;pickBtn.setAttribute('aria-expanded',open);
  if(open)(menu.querySelector('[aria-selected=true] button')||menu.querySelector('button')).focus();
}
pickBtn.onclick=()=>toggleMenu(menu.hidden);
document.addEventListener('pointerdown',e=>{if(!$('#picker').contains(e.target))toggleMenu(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){toggleMenu(false);pickBtn.focus()}});

/* ---------- TABS ---------- */
$$('.tabs button').forEach(b=>b.onclick=()=>{
  $$('.tabs button').forEach(x=>x.setAttribute('aria-selected',x===b));
  $$('.pane').forEach(p=>p.hidden=p.id!=='tab-'+b.dataset.tab);
});

/* ---------- SOUND + RING ---------- */
let ac,ringTimer,ringCtx=null;
addEventListener('pointerdown',()=>{try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();ac.resume()}catch{}});
function beep(){
  if(!ac)return;
  [0,.18].forEach(d=>{
    const o=ac.createOscillator(),g=ac.createGain(),t=ac.currentTime+d;
    o.frequency.value=880;g.gain.setValueAtTime(.0001,t);
    g.gain.exponentialRampToValueAtTime(.3,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.14);
    o.connect(g).connect(ac.destination);o.start(t);o.stop(t+.16);
  });
  navigator.vibrate?.(200);
}
function ring(title,sub,snoozeLabel){
  if(ringCtx)return;
  ringCtx={title,sub,snoozeLabel};
  $('#ringTitle').textContent=title;$('#ringSub').textContent=sub;
  $('#snooze').hidden=!snoozeLabel;
  $('#ring').hidden=false;$('#dismiss').focus();
  beep();ringTimer=setInterval(beep,1000);
  document.title='⏰ '+title;
}
function stopRing(){
  clearInterval(ringTimer);$('#ring').hidden=true;document.title='Clock';ringCtx=null;
}
$('#dismiss').onclick=stopRing;
$('#snooze').onclick=()=>{
  const c=ringCtx,d=new Date(Date.now()+5*60000);
  alarms.push({id:Date.now(),time:pad(d.getHours())+':'+pad(d.getMinutes()),label:c.snoozeLabel,on:true,daily:false});
  saveAlarms();stopRing();
};

/* ---------- CLOCK ---------- */
let h12=store.get('h12',true);
function fmtTime(hm){
  const[h,m]=hm.split(':').map(Number);
  return h12?`${h%12||12}:${pad(m)} ${h<12?'AM':'PM'}`:`${pad(h)}:${pad(m)}`;
}
function drawClock(now){
  $('#clock').textContent=now.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:h12});
  $('#dateText').textContent=now.toLocaleDateString([],{weekday:'long',day:'numeric',month:'long',year:'numeric'});
}
$('#fmtBtn').onclick=()=>{
  h12=!h12;store.set('h12',h12);
  $('#fmtBtn').textContent=h12?'Switch to 24-hour':'Switch to 12-hour';
  renderAlarms();
};
$('#fmtBtn').textContent=h12?'Switch to 24-hour':'Switch to 12-hour';

/* ---------- ALARMS ---------- */
let alarms=store.get('alarms',[]),lastFired='';
function saveAlarms(){store.set('alarms',alarms);renderAlarms()}
function renderAlarms(){
  const ul=$('#alarmList');ul.innerHTML='';
  if(!alarms.length){ul.innerHTML='<li class="empty">No alarms yet. Pick a time and add one.</li>';return}
  alarms.sort((a,b)=>a.time.localeCompare(b.time)).forEach(a=>{
    const li=document.createElement('li');
    li.innerHTML='<div><b></b><small></small></div><label class="sw"><input type="checkbox" aria-label="Alarm on"><span></span></label><button class="x" aria-label="Delete alarm">✕</button>';
    li.querySelector('b').textContent=fmtTime(a.time);
    li.querySelector('small').textContent=(a.label||'Alarm')+(a.daily?' · every day':'');
    const cb=li.querySelector('input');cb.checked=a.on;
    cb.onchange=()=>{a.on=cb.checked;saveAlarms()};
    li.querySelector('.x').onclick=()=>{alarms=alarms.filter(x=>x!==a);saveAlarms()};
    ul.appendChild(li);
  });
}
$('#aAdd').onclick=()=>{
  const time=$('#aTime').value;if(!time)return;
  alarms.push({id:Date.now(),time,label:$('#aLabel').value.trim(),on:true,daily:$('#aDaily').checked});
  $('#aLabel').value='';saveAlarms();
};
function checkAlarms(now){
  const hm=pad(now.getHours())+':'+pad(now.getMinutes()),key=now.toDateString()+hm;
  if(key===lastFired)return;
  const hit=alarms.find(a=>a.on&&a.time===hm);
  if(!hit)return;
  lastFired=key;
  if(!hit.daily)hit.on=false;
  saveAlarms();
  ring(hit.label||'Alarm',fmtTime(hm),hit.label||'Alarm');
}

/* ---------- TIMER ---------- */
const T={ms:0,end:0,run:false,total:0};
const fmtHMS=ms=>{const s=Math.ceil(ms/1000);return `${pad(Math.floor(s/3600))}:${pad(Math.floor(s%3600/60))}:${pad(s%60)}`};
function timerView(){
  const active=T.total>0;
  $('#timerSet').hidden=active;$('#timerShow').hidden=!active;
  $('#tStart').textContent=T.run?'Pause':(active?'Resume':'Start');
}
$$('[data-p]').forEach(b=>b.onclick=()=>{
  const s=+b.dataset.p;$('#th').value=Math.floor(s/3600);$('#tm').value=Math.floor(s%3600/60);$('#ts').value=s%60;
});
$('#tStart').onclick=()=>{
  if(T.run){T.ms=T.end-Date.now();T.run=false}
  else{
    if(!T.total){
      T.ms=((+$('#th').value||0)*3600+(+$('#tm').value||0)*60+(+$('#ts').value||0))*1000;
      if(T.ms<=0)return;T.total=T.ms;
    }
    T.end=Date.now()+T.ms;T.run=true;
  }
  timerView();
};
$('#tReset').onclick=()=>{Object.assign(T,{ms:0,end:0,run:false,total:0});timerView()};
function tickTimer(){
  if(!T.total)return;
  const left=T.run?Math.max(0,T.end-Date.now()):T.ms;
  $('#tDisp').textContent=fmtHMS(left);
  $('#tBar').style.width=(left/T.total*100)+'%';
  if(T.run&&left<=0){
    const total=T.total;Object.assign(T,{ms:0,end:0,run:false,total:0});timerView();
    ring('Timer finished',fmtHMS(total)+' elapsed',null);
  }
}

/* ---------- STOPWATCH ---------- */
const S={start:0,el:0,run:false,laps:[]};
const swNow=()=>S.run?S.el+Date.now()-S.start:S.el;
function fmtSW(ms){
  const cs=Math.floor(ms/10)%100,s=Math.floor(ms/1000)%60,m=Math.floor(ms/60000)%60,h=Math.floor(ms/3600000);
  return (h?pad(h)+':':'')+`${pad(m)}:${pad(s)}.${pad(cs)}`;
}
$('#swStart').onclick=()=>{
  if(S.run){S.el=swNow();S.run=false}else{S.start=Date.now();S.run=true}
  $('#swStart').textContent=S.run?'Stop':'Start';$('#swLap').disabled=!S.run;
};
$('#swLap').onclick=()=>{
  const t=swNow(),prev=S.laps.length?S.laps[0].total:0;
  S.laps.unshift({total:t,split:t-prev});renderLaps();
};
$('#swReset').onclick=()=>{
  Object.assign(S,{start:0,el:0,run:false,laps:[]});
  $('#swStart').textContent='Start';$('#swLap').disabled=true;$('#swDisp').textContent='00:00.00';renderLaps();
};
function renderLaps(){
  const ol=$('#lapList');ol.innerHTML='';
  S.laps.forEach((l,i)=>{
    const li=document.createElement('li');
    li.innerHTML='<span></span><span></span><span></span>';
    const[a,b,c]=li.children;
    a.textContent='Lap '+(S.laps.length-i);b.textContent='+'+fmtSW(l.split);c.textContent=fmtSW(l.total);
    ol.appendChild(li);
  });
}

/* ---------- MAIN LOOP ---------- */
let lastSec=-1;
function tick(){
  const now=new Date();
  if(now.getSeconds()!==lastSec){lastSec=now.getSeconds();drawClock(now);checkAlarms(now)}
  tickTimer();
  if(S.run)$('#swDisp').textContent=fmtSW(swNow());
}
setInterval(tick,50);

/* ---------- START ---------- */
renderAlarms();timerView();tick();
setTheme(store.get('theme','sakura'));

// Interacciones locales: navegación, esquemas, escenas y luces.
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const lightButton = document.querySelector('#lights');
let lightsPaused = motion.matches;
function syncLights(){document.body.classList.toggle('paused',lightsPaused);lightButton.setAttribute('aria-pressed',String(lightsPaused));lightButton.querySelector('span:last-child').textContent=lightsPaused?'Activar luces':'Pausar luces';}
syncLights();
lightButton.addEventListener('click',()=>{lightsPaused=!lightsPaused;syncLights();});
const menuButton=document.querySelector('.menu-toggle');const nav=document.querySelector('#nav');
function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='Menú +';}
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'Cerrar −':'Menú +';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();}});
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{document.getElementById(button.dataset.target).classList.toggle('mobile',button.dataset.view==='mobile');button.parentElement.querySelectorAll('button').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});}));
const scene=document.querySelector('.scene');const play=document.querySelector('#play');const names=['Interior cálido','Exterior en calma','Luz de acento'];let current=0;let timer=null;
function showScene(n){current=(n+names.length)%names.length;scene.dataset.scene=String(current);scene.setAttribute('aria-label','Ilustración: '+names[current]);document.querySelector('#scene-title').textContent=`0${current+1} / ${names[current]}`;document.querySelector('#scene-count').textContent=`0${current+1} / 03`;}
function stop(){clearInterval(timer);timer=null;play.textContent='Reproducir';play.setAttribute('aria-pressed','false');}
document.querySelector('#prev').addEventListener('click',()=>{stop();showScene(current-1);});document.querySelector('#next').addEventListener('click',()=>{stop();showScene(current+1);});
play.addEventListener('click',()=>{if(timer){stop();return;}timer=setInterval(()=>showScene(current+1),5000);play.textContent='Pausar';play.setAttribute('aria-pressed','true');});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
motion.addEventListener('change',e=>{if(e.matches){lightsPaused=true;syncLights();stop();}});
const links=[...nav.querySelectorAll('a')];const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(a=>{const active=a.hash==='#'+entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -55% 0px'});links.forEach(a=>{const s=document.querySelector(a.hash);if(s)observer.observe(s);});

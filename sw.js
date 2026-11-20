// 워디 주 서비스 워커 (오프라인 지원) v1ff5cc4e
const V='wz-1ff5cc4e';const AUDIO='wz-audio-a9d52d04';
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icons/icon-192.png'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!==AUDIO).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
  if(u.pathname.includes('/audio/')||u.host.includes('fonts.g')){e.respondWith(caches.open(u.host.includes('fonts.g')?V:AUDIO).then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(n.ok||n.type==='opaque')c.put(e.request,n.clone());return n}))));return}
  if(u.origin===location.origin){e.respondWith(fetch(e.request).then(n=>{const cp=n.clone();caches.open(V).then(c=>c.put(e.request,cp));return n}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))))}});

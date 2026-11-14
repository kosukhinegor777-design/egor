const V='egor-v3',SHELL=['./','index.html','logo.png','manifest.json','icon-192.png','icon-512.png','firebase-config.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 if(/\.(mp3|mp4|webm|ogg)(\?|$)/.test(r.url))return;
 e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{if(res.status===200){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp)).catch(()=>{})}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))))});

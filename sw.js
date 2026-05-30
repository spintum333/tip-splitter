// Service Worker — แคชไฟล์ทั้งหมดเพื่อใช้ offline ได้
const CACHE_NAME = 'tip-splitter-v2';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// ติดตั้ง: แคชไฟล์ทั้งหมด
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: ลบ cache เก่าถ้ามี version ใหม่
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: เสิร์ฟจาก cache ก่อน ถ้าไม่มีค่อยไปโหลดจาก network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

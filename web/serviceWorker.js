console.log('[Service Worker] start...');

const cacheName = 'pwa-cache';
const contentToCache = [
	//'img/test1.png',
	'/index.html'
];

// ServiceWorker設置
self.addEventListener('install', function(e) {
	console.log('[Service Worker] Install');
	e.waitUntil(
		// 下記完了まで、install待機
	    caches.open(cacheName).then(function(cache) {
			console.log('[Service Worker] Caching all: app shell and content');
			return cache.addAll(contentToCache);
	  })
	);
});

// いらないファイル削除、cache整理
// self.addEventListener('activate', function(e) {});



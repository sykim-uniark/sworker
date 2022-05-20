console.log('[Service Worker] start.');

const cacheName = 'pwa-cache8';
const contentToCache = [
	'index.html',
	'index.js',
	'img/ic32.png',
	'img/ic512.png',
	'img/test1.png'
];

// ServiceWorker設置
self.addEventListener('install', function (e) {
	console.log('[Service Worker install] ', contentToCache);
	e.waitUntil(
		// 下記完了まで、install待機
		caches.open(cacheName).then(function (cache) {
			console.log('[Service Worker install] Caching all');
			return cache.addAll(contentToCache);
		})
	);
});

// いらないファイル削除、cache整理
self.addEventListener('activate', function (e) {
	console.log('[Service Worker activate] cacheName ', cacheName);
	e.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				console.log('[Service Worker activate] map:key ', key);
				if (cacheName.indexOf(key) === -1) {
					return caches.delete(key);
				}
			}));
		})
	);
});

self.addEventListener('fetch', function (e) {
	e.respondWith(
		caches.match(e.request).then(function (r) {
			console.log('[Service Worker] Fetching resource: ', e.request.url);
			if (r) return r;

			return fetch(e.request).then(function (response) {
				return caches.open(cacheName).then(function (cache) {
					console.log('[Service Worker] Caching new resource: ' + e.request.url);
					cache.put(e.request, response.clone());
					return response;
				});
			});
		})
	);
});





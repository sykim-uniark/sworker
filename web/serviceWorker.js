const cacheName = 'pwa-cache25';
const contentToCache = [
	'index.html',
	'index.js',
	'pwatest.webmanifest',
	'serviceWorker.js',
	'img/ic32.png',
	'img/ic512.png',
	'img/test1.png',
	'lib/jquery/jquery-3.6.0.min.js',
	'lib/jquery/jquery-3.6.0.min.map',
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

self.addEventListener('fetch', (e) => {
  console.log(`[Service Worker] Fetched resource ${e.request.url}`);
});




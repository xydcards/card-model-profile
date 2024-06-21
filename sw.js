var CACHE_NAME = 'dcard-pedro-guimaraes-apresenta-v01-01';
var urlsToCache = [
	'/pedro-guimaraes/',
	'/pedro-guimaraes/index.html',
	'/pedro-guimaraes/offline.html',
	'/pedro-guimaraes/404.html',
	'/pedro-guimaraes/favicon/android-chrome-512x512.png',
	'/pedro-guimaraes/favicon/android-icon-192x192.png',
	'/pedro-guimaraes/favicon-foto/android-chrome-512x512.png',
	'/pedro-guimaraes/favicon-foto/android-icon-192x192.png',
	'/pedro-guimaraes/css/all.css',
	'/pedro-guimaraes/webfonts/fa-brands-400.eot',
	'/pedro-guimaraes/webfonts/fa-brands-400.svg',
	'/pedro-guimaraes/webfonts/fa-brands-400.ttf',
	'/pedro-guimaraes/webfonts/fa-brands-400.woff',
	'/pedro-guimaraes/webfonts/fa-brands-400.woff2',
	'/pedro-guimaraes/webfonts/fa-regular-400.eot',
	'/pedro-guimaraes/webfonts/fa-regular-400.svg',
	'/pedro-guimaraes/webfonts/fa-regular-400.ttf',
	'/pedro-guimaraes/webfonts/fa-regular-400.woff',
	'/pedro-guimaraes/webfonts/fa-regular-400.woff2',
	'/pedro-guimaraes/webfonts/fa-solid-900.eot',
	'/pedro-guimaraes/webfonts/fa-solid-900.svg',
	'/pedro-guimaraes/webfonts/fa-solid-900.ttf',
	'/pedro-guimaraes/webfonts/fa-solid-900.woff',
	'/pedro-guimaraes/webfonts/fa-solid-900.woff2',
	'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
	'https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
	'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
	'/pedro-guimaraes/imgs/pedro-guimaraes-destaque.jpg',
	'/pedro-guimaraes/imgs/pedro-guimaraes-sobre.jpg',
	'/pedro-guimaraes/imgs/pedro-guimaraes-apresenta-rio-cartao-digital-v01-01.png',
	'/pedro-guimaraes/imgs/portfolio-01.jpg',
	'/pedro-guimaraes/imgs/portfolio-02.jpg',
	'/pedro-guimaraes/imgs/portfolio-03.jpg',
	'/pedro-guimaraes/imgs/dcard-bkg-semi-transparente.png',
	'/pedro-guimaraes/imgs/apresenta-rio-logo-horiz-v01-01.png',
	'/pedro-guimaraes/imgs/dcard-molde-cabecalho-v01-01.png',
	'/pedro-guimaraes/imgs/picture-circle-bkg.png',
	'/pedro-guimaraes/imgs/apresenta-rio-dcard-slide-01.jpg',
	'/pedro-guimaraes/imgs/apresenta-rio-dcard-slide-02.jpg',
	'/pedro-guimaraes/imgs/apresenta-rio-dcard-slide-03.jpg'
];
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					// Return true if you want to remove this cache,
					// but remember that caches are shared across
					// the whole origin
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});
/* FETCH */
self.addEventListener('fetch', function(event) {
	event.respondWith(
	// Try the cache
		caches.match(event.request).then(function(response) {
			//console.log('response 01 = ' + response);
			if (response) {
				return response;
			}
			return fetch(event.request).then(function(response) {
				//console.log('response.status = ' + response.status);
				if (response.status === 404) {
					return caches.match('/pedro-guimaraes/404.html');
				}
				//console.log('response 02 = ' + response);
				return response
			});
		}).catch(function() {
			// If both fail, show a generic fallback:
			//console.log('offline event = ' + event);
			return caches.match('/pedro-guimaraes/offline.html');
		})
	);
});
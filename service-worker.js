var APP_PREFIX = 'fantasy-realms-';
var VERSION = '1.0.36';
var CACHE_NAME = APP_PREFIX + VERSION;
var URLS = [
  '/',
  'index.html',
  'manifest.json',
  'favicon.ico',
  'img/fantasy-realms.jpg',
  'img/background.jpg',
  'img/cursed-hoard.png',
  'img/wizkids.png',
  'img/globe.png',
  'css/style.css',
  'css/bootstrap.min.css',
  'service-worker.js',
  'js/app.js',
  'js/deck.js',
  'js/discard.js',
  'js/hand.js',
  'js/bootstrap.bundle.min.js',
  'js/handlebars.min-v4.7.7.js',
  'js/jquery.i18n.properties.min.js',
  'js/jquery-3.6.0.min.js',
  'i18n/Messages.properties',
  'i18n/Messages_en.properties',
  'i18n/Messages_cz.properties',
  'i18n/Messages_de.properties',
  'i18n/Messages_es.properties',
  'i18n/Messages_fr.properties',
  'i18n/Messages_pl.properties',
  'i18n/Messages_pt.properties',
  'i18n/Messages_ua.properties',
  'i18n/Messages_kr.properties',
  'i18n/Messages_ru.properties',
  'i18n/Messages_zh-CN.properties',
  'sound/clear.mp3',
  'sound/click.mp3',
  'sound/magic.mp3',
  'sound/swoosh.mp3',
  'browserconfig.xml',
  'icons/android-icon-144x144.png',
  'icons/android-icon-192x192.png',
  'icons/android-icon-36x36.png',
  'icons/android-icon-48x48.png',
  'icons/android-icon-72x72.png',
  'icons/android-icon-96x96.png',
  'icons/apple-icon-114x114.png',
  'icons/apple-icon-120x120.png',
  'icons/apple-icon-144x144.png',
  'icons/apple-icon-152x152.png',
  'icons/apple-icon-180x180.png',
  'icons/apple-icon-57x57.png',
  'icons/apple-icon-60x60.png',
  'icons/apple-icon-72x72.png',
  'icons/apple-icon-76x76.png',
  'icons/apple-icon-precomposed.png',
  'icons/apple-icon.png',
  'icons/favicon-16x16.png',
  'icons/favicon-32x32.png',
  'icons/favicon-96x96.png',
  'icons/ms-icon-144x144.png',
  'icons/ms-icon-150x150.png',
  'icons/ms-icon-310x310.png',
  'icons/ms-icon-70x70.png'
];

self.addEventListener('fetch', function (e) {
  console.log('fetch request: ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) {
        console.log('responding with cache: ' + e.request.url);
        return request;
      } else {
        console.log('file is not cached, fetching: ' + e.request.url);
        return fetch(e.request);
      }
    })
  );
});

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache: ' + CACHE_NAME)
      return cache.addAll(URLS);
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });
      cacheWhitelist.push(CACHE_NAME);
      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache: ' + keyList[i]);
          return caches.delete(keyList[i]);
        }
      }));
    })
  );
});

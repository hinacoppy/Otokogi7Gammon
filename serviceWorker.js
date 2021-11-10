/* serviceWorker.js */
// (参考) https://qiita.com/kaihar4/items/c09a6d73e190ab0b9b01
'use strict';

const CACHE_NAME = "Otokogi7Gammon-v20211110";
const ORIGIN = (location.hostname == 'localhost') ? '' : location.protocol + '//' + location.hostname;

const STATIC_FILES = [
  ORIGIN + '/Otokogi7Gammon/',
  ORIGIN + '/Otokogi7Gammon/index.html',
  ORIGIN + '/Otokogi7Gammon/manifest.json',
  ORIGIN + '/Otokogi7Gammon/icon/favicon.ico',
  ORIGIN + '/Otokogi7Gammon/icon/apple-touch-icon.png',
  ORIGIN + '/Otokogi7Gammon/icon/android-chrome-96x96.png',
  ORIGIN + '/Otokogi7Gammon/icon/android-chrome-192x192.png',
  ORIGIN + '/Otokogi7Gammon/icon/android-chrome-512x512.png',
  ORIGIN + '/Otokogi7Gammon/css/OtokogiGame.css',
  ORIGIN + '/Otokogi7Gammon/css/OtokogiBoard.css',
  ORIGIN + '/css/font-awesome-animation.min.css',
  ORIGIN + '/js/fontawesome-all.min.js',
  ORIGIN + '/js/jquery-3.6.0.min.js',
  ORIGIN + '/js/inobounce.min.js',
  ORIGIN + '/Otokogi7Gammon/js/Ogid_class.js',
  ORIGIN + '/Otokogi7Gammon/js/OtokogiChequer_class.js',
  ORIGIN + '/Otokogi7Gammon/js/OtokogiBoard_class.js',
  ORIGIN + '/Otokogi7Gammon/js/OtokogiGame_class.js'
];

const CACHE_KEYS = [
  CACHE_NAME
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        STATIC_FILES.map(url => {
          return fetch(new Request(url, { cache: 'no-cache', mode: 'no-cors' })).then(response => {
            return cache.put(url, response);
          });
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => {
          return !CACHE_KEYS.includes(key);
        }).map(key => {
          return caches.delete(key);
        })
      );
    })
  );
});


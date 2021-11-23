/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-2d2e83f';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./resources.html","./tuseni_souvislosti_001.html","./tuseni_souvislosti_002.html","./tuseni_souvislosti_003.html","./tuseni_souvislosti_005.html","./tuseni_souvislosti_006.html","./tuseni_souvislosti_007.html","./tuseni_souvislosti_008.html","./tuseni_souvislosti_009.html","./tuseni_souvislosti_010.html","./tuseni_souvislosti_011.html","./tuseni_souvislosti_012.html","./tuseni_souvislosti_013.html","./tuseni_souvislosti_014.html","./tuseni_souvislosti_015.html","./tuseni_souvislosti_016.html","./tuseni_souvislosti_017.html","./tuseni_souvislosti_018.html","./tuseni_souvislosti_019.html","./tuseni_souvislosti_020.html","./tuseni_souvislosti_021.html","./tuseni_souvislosti_022.html","./tuseni_souvislosti_023.html","./tuseni_souvislosti_024.html","./tuseni_souvislosti_025.html","./tuseni_souvislosti_026.html","./tuseni_souvislosti_027.html","./tuseni_souvislosti_028.html","./tuseni_souvislosti_029.html","./tuseni_souvislosti_030.html","./tuseni_souvislosti_031.html","./tuseni_souvislosti_032.html","./tuseni_souvislosti_033.html","./tuseni_souvislosti_034.html","./tuseni_souvislosti_035.html","./tuseni_souvislosti_036.html","./tuseni_souvislosti_037.html","./tuseni_souvislosti_038.html","./tuseni_souvislosti_039.html","./fonts/LiterataTT_var.woff2","./fonts/LiterataTT_var_OFL.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_OFL.txt","./resources/004_fmt.jpeg","./resources/005_fmt.jpeg","./resources/006_fmt.jpeg","./resources/007_fmt.jpeg","./resources/008_fmt.jpeg","./resources/009_fmt.jpeg","./resources/010_fmt.jpeg","./resources/011_fmt.jpeg","./resources/012_fmt.jpeg","./resources/013_fmt.jpeg","./resources/014_fmt.jpeg","./resources/015_fmt.jpeg","./resources/016_fmt.jpeg","./resources/017_fmt.jpeg","./resources/018_fmt.jpeg","./resources/019_fmt.jpeg","./resources/020_fmt.jpeg","./resources/021_fmt.jpeg","./resources/022_fmt.jpeg","./resources/023_fmt.jpeg","./resources/024_fmt.jpeg","./resources/025_fmt.jpeg","./resources/026_fmt.jpeg","./resources/027_fmt.jpeg","./resources/028_fmt.jpeg","./resources/029_fmt.jpeg","./resources/030_fmt.jpeg","./resources/031_fmt.jpeg","./resources/032_fmt.jpeg","./resources/033_fmt.jpeg","./resources/034_fmt.jpeg","./resources/035_fmt.jpeg","./resources/036_fmt.jpeg","./resources/037_fmt.jpeg","./resources/038_fmt.jpeg","./resources/039_fmt.jpeg","./resources/image001_fmt.jpeg","./resources/image002_fmt.jpeg","./resources/index.xml","./resources/obalka_tuseni_souvislo_fmt.jpeg","./resources/upoutavka_eknihy_fmt.jpeg","./scripts/bundle.js","./style/style.min.css"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});

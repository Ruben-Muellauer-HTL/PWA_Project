import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, NavigationRoute, Route } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// const broadcast = new BroadcastChannel('whisper-channel');

const toursRoute = new Route(
  ({ url }) => url.pathname === '/tours',
  new NetworkFirst({
    cacheName: 'tours-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 1,
      }),
    ],
    cacheableResponse: {
      statuses: [0, 200],
    },
  }),
);

registerRoute(toursRoute);

// const toursDetailRoute = new Route(
//   ({ url }) => url.pathname === '/tours/:id',
//   new NetworkFirst({
//     cacheName: 'toursDetail-cache',
//     plugins: [
//       new ExpirationPlugin({
//         maxAgeSeconds: 60 * 60 * 24 * 1,
//       }),
//     ],
//     cacheableResponse: {
//       statuses: [0, 200],
//     },
//   }),
// );

// registerRoute(toursDetailRoute);

const cardImagesRoute = new Route(
  ({ url }) => /.*images\/.*.jpg/.test(url.pathname),
  new CacheFirst({
    cacheName: 'card-images-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 1,
      }),
    ],
    cacheableResponse: {
      statuses: [0, 200],
    },
  }),
);

registerRoute(cardImagesRoute);

const staticImagesRoute = new Route(
  ({ url }) => /.*staticImages\/.*.jpg/.test(url.pathname),
  new CacheFirst({
    cacheName: 'staticImages-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 1,
      }),
    ],
    cacheableResponse: {
      statuses: [0, 200],
    },
  }),
);

registerRoute(staticImagesRoute);

precacheAndRoute(self.__WB_MANIFEST);
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')));

console.debug('SW loaded');

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  // if (event.data.type === 'private message') {
  //   console.log(event.data.info);
  //   broadcast.postMessage("What's up?");
  // }
});

self.addEventListener('install', () => {
  console.debug('SW install event');
  caches.delete('roberts-employees');
});
self.addEventListener('activate', function () {
  console.debug('SW activate event, claiming control');
  return self.clients.claim();
});

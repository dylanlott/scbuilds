importScripts('/_nuxt/workbox.42554690.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/app.0c71b2f38b629e40dfa5.js",
    "revision": "ed4e7aa7af5b56518d5b489e0d913a16"
  },
  {
    "url": "/_nuxt/app.c65cac958abec7941d065a7305fe8b41.css",
    "revision": "c65cac958abec7941d065a7305fe8b41"
  },
  {
    "url": "/_nuxt/layouts/default.32f6ea85cee8c277d465.js",
    "revision": "08ec7f6f7252e390a8bb4443b6454d1c"
  },
  {
    "url": "/_nuxt/manifest.c466bacf54e97ab89a26.js",
    "revision": "3fc0a0f2e03b0a44a464bb7e36deeb0b"
  },
  {
    "url": "/_nuxt/pages/admin/index.a16d8a79db42221e9ed4.js",
    "revision": "73e603466223b15284543ab857543ac5"
  },
  {
    "url": "/_nuxt/pages/builds/_id/index.c49101c4417f0d39ecbe.js",
    "revision": "56412c261a198c659fb920fc93f8c6c9"
  },
  {
    "url": "/_nuxt/pages/builds/create/index.d865534ace883541ea78.js",
    "revision": "f16257caa44665afca401a19176a83c1"
  },
  {
    "url": "/_nuxt/pages/builds/index.0418e857765527894fa7.js",
    "revision": "538a1fa2c9102e91783ff6d0607d7d42"
  },
  {
    "url": "/_nuxt/pages/index.22c09b83eebf73dff8ca.js",
    "revision": "720e11b3a2554ba8dc75e33efad76d60"
  },
  {
    "url": "/_nuxt/pages/users/_username/index.c36e7f9f39602795ba48.js",
    "revision": "f565124b9152e78dc0b4156c1b646b94"
  },
  {
    "url": "/_nuxt/pages/users/auth/index.410f6eafb8d2935fc1fa.js",
    "revision": "12a9f891c08c72a69f1d192528228c16"
  },
  {
    "url": "/_nuxt/pages/users/auth/sign-in.30be9d638e7ee80b1634.js",
    "revision": "ed3e1392d1e794a90c64379756484fee"
  },
  {
    "url": "/_nuxt/pages/users/auth/sign-out.6fa441bed3ebc37ff37a.js",
    "revision": "d8ec3bf6ff265ce83ab7df7020b5c0ee"
  },
  {
    "url": "/_nuxt/pages/users/auth/sign-up.554cf6e83e66cd2bf400.js",
    "revision": "a828565431c8d30f4e3088810a7ec0d2"
  },
  {
    "url": "/_nuxt/pages/users/index.7ab7d575c6a27f08bc2f.js",
    "revision": "1db6faee1db1feec611e94e12041ee44"
  },
  {
    "url": "/_nuxt/vendor.26085ab706ad616bd65d.js",
    "revision": "bff5f84b3558bbdd3261729d80faf7d7"
  }
], {
  "cacheId": "scbuilds",
  "directoryIndex": "/",
  "cleanUrls": false
})



workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')






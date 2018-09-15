importScripts('/_nuxt/workbox.42554690.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/app.37a667d1ea3ab20426c9.js",
    "revision": "f7f564780c68e74bb3cb334d83d1b2c8"
  },
  {
    "url": "/_nuxt/app.c65cac958abec7941d065a7305fe8b41.css",
    "revision": "c65cac958abec7941d065a7305fe8b41"
  },
  {
    "url": "/_nuxt/layouts/default.d6195526633b528f3c59.js",
    "revision": "daf94d13ff24787973d5117d05fab8a6"
  },
  {
    "url": "/_nuxt/manifest.4d073104136f376119ae.js",
    "revision": "18c915d44df7a5d31203367ec0996fcf"
  },
  {
    "url": "/_nuxt/pages/admin/index.6afc2fe5ba066492370a.js",
    "revision": "aaf90418698f9124dd76cb3cd76406b9"
  },
  {
    "url": "/_nuxt/pages/builds/_id/index.c431b39aa7d756d050b2.js",
    "revision": "205a90922378539fecdb712fe8387f19"
  },
  {
    "url": "/_nuxt/pages/builds/create/index.f693a1ab3786da19bef9.js",
    "revision": "b06cb61bf9aefc0a0d8b8e8d572c79aa"
  },
  {
    "url": "/_nuxt/pages/builds/index.b5d2cda3e9f71e09db73.js",
    "revision": "7ebbbbd709e24eb8974d9ea8dee45ee4"
  },
  {
    "url": "/_nuxt/pages/index.104df604c0db6a47b82a.js",
    "revision": "6ab2dcd223b6f97aa7cfb7d3478fdb86"
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






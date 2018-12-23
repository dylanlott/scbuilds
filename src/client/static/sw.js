importScripts('/_nuxt/workbox.42554690.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/app.932b76aa13d2f3497a3f.js",
    "revision": "704d79240ec79a4d320f28a9c4d5be0b"
  },
  {
    "url": "/_nuxt/app.c65cac958abec7941d065a7305fe8b41.css",
    "revision": "c65cac958abec7941d065a7305fe8b41"
  },
  {
    "url": "/_nuxt/layouts/default.b23e1281d0677a6dad32.js",
    "revision": "d03f9a21cb52b3e462b02e02f33d7b44"
  },
  {
    "url": "/_nuxt/manifest.b2f1740c4ce601e09df4.js",
    "revision": "cf8da9e173b5b8a73a898e4d996c12fd"
  },
  {
    "url": "/_nuxt/pages/admin/index.bf40b738f6048b2cf35d.js",
    "revision": "0016e4e0b1245f98ac6304739459c176"
  },
  {
    "url": "/_nuxt/pages/builds/_id/index.af5dee5e562347de664c.js",
    "revision": "fba31184f198770cdfd5cd95b498b04a"
  },
  {
    "url": "/_nuxt/pages/builds/create/index.db4bafbca9c5f9d7ccb2.js",
    "revision": "d6e5c76e600bd1176e22088a943f351d"
  },
  {
    "url": "/_nuxt/pages/builds/edit/_id/index.a23f631302b5a6500069.js",
    "revision": "5c645625b7fee13722e3730cc1a1db71"
  },
  {
    "url": "/_nuxt/pages/builds/index.c128dbb08c5683520f55.js",
    "revision": "0e580a1486cc01014d8ede5e93cae0a9"
  },
  {
    "url": "/_nuxt/pages/index.f8c18598212d3b523b93.js",
    "revision": "afab3d4a7af85a258aea3df3bb68c54e"
  },
  {
    "url": "/_nuxt/pages/users/_username/index.84ffe4d3cd76744f8788.js",
    "revision": "2e76f070013291a71deb2e884de97485"
  },
  {
    "url": "/_nuxt/pages/users/auth/index.364e109d65068aaa4c92.js",
    "revision": "58d1f41856fc5ddcb7c1667f36cc8a6e"
  },
  {
    "url": "/_nuxt/pages/users/auth/sign-in.52f8c67d68b28f0a2560.js",
    "revision": "af270bbaa95748120a368129b015f4a4"
  },
  {
    "url": "/_nuxt/pages/users/auth/sign-out.0a0b7552396cbf5446b9.js",
    "revision": "5b5d02d9fa11d968e8ae7840aa7d5bca"
  },
  {
    "url": "/_nuxt/pages/users/auth/sign-up.ad2f81bacda7db6f7eb6.js",
    "revision": "89929bfec7c754e93c86db665891ba02"
  },
  {
    "url": "/_nuxt/pages/users/index.5d3bfad65ef5135ef8d6.js",
    "revision": "70bcd057e98644fd82a8617fd686dc25"
  },
  {
    "url": "/_nuxt/vendor.46a2bd722199c3fef1d4.js",
    "revision": "9876ac6bf1b93cd0314a131aead410c6"
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






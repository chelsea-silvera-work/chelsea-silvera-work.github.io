'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "5fc10240b73452c6a64964c44206397c",
"index.html": "fa57f50ff25687e5158b3de143bd7b16",
"/": "fa57f50ff25687e5158b3de143bd7b16",
"main.dart.js": "a33d2e693d748c7d9b37f83cd91a8f6e",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "2e80b11771bfece860bf33f24e3b47ca",
"assets/AssetManifest.json": "b4707d1038798953404d755baeb9b984",
"assets/NOTICES": "0895efc569c098d0e22effcbf710e49f",
"assets/FontManifest.json": "6698b176c121b960c618d7ced9985a4c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/fluttertoast/assets/toastify.js": "e7006a0a033d834ef9414d48db3be6fc",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/images/3.0.png": "499ba92faed81f733559f977d5769087",
"assets/assets/images/hobbies.png": "e8876c70703bf10a4ccd2227a27f0d59",
"assets/assets/images/instagram.png": "3f14e1cd87c2def0bd2dbd41bbe956d5",
"assets/assets/images/languages.png": "bb789200518efd640257df36b17be0a1",
"assets/assets/images/mandai.png": "b507d0f690beafdefa6544ee875b46fb",
"assets/assets/images/4.0.png": "b39e99f5be3c470d7a52d92507257fad",
"assets/assets/images/certificates/cer6.jpg": "46a8edf27420b7fde2c98fc5e34e0499",
"assets/assets/images/certificates/cer7.jpg": "eec8541ead63930ab4ddc34950167458",
"assets/assets/images/certificates/cer5.jpg": "f61e28c0427de11e85a4dd5b80e1db4b",
"assets/assets/images/certificates/cer4.jpg": "6aa95001ec703e19ae16a9aff5f63d6f",
"assets/assets/images/certificates/cer1.jpg": "b0841897e826a7e88a7a67912996d23d",
"assets/assets/images/certificates/cer3.jpg": "819d58efe74bc55359015b2a061fdbee",
"assets/assets/images/certificates/cer2.jpg": "1e88b67159d2092f692147151d37c550",
"assets/assets/images/msbte.png": "3ad0b6c611912a61f3eca4fc91e76eee",
"assets/assets/images/poly.jpg": "3c41b131633df1aa3a11a50eab6707de",
"assets/assets/images/ets.png": "cd9bcae5bb5df864eb235b84967c39e3",
"assets/assets/images/nasa.jpg": "75312914b50546140b039e0d5a6d34a9",
"assets/assets/images/pasadena.png": "2c053e3e3378542bd2c96eaeee9e50ad",
"assets/assets/images/linkedin.png": "30c453b7f5fbdb09ea0cb42a5dc7a6e5",
"assets/assets/images/profile.png": "b3e519cf4b3360cd92f6172c83c610f6",
"assets/assets/images/zomato.jpg": "b5692fdf151cb1065bf82dc213668ae4",
"assets/assets/images/sketch.png": "778a900652f6d3420149319fc3117082",
"assets/assets/images/youtube.png": "ca6d67e60f758d352745329b283e8f32",
"assets/assets/images/khool.png": "166c33dce5052d5079fd494e912230ea",
"assets/assets/images/skills.png": "2e39629bc3f98f5cb5346d9f353d01e2",
"assets/assets/images/baisatara.jpg": "576c8aab128c4572c171b0e4a94a7e6e",
"assets/assets/images/masterch.png": "7aa91eddae9afd766c50b5c657e59803",
"assets/assets/images/bamboo.png": "d1bbb1edf6ae8c9fce52e7eba7d47d51",
"assets/assets/fonts/edwardian.ttf": "ca6f91c0cad2fe33614026d17117601d",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}

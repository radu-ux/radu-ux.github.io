const cacheName = "v1";

// Call Install Event
self.addEventListener("install", e => {
    console.log("Service Worker: Installed");
});

// Call Activate Event
self.addEventListener("activate", e => {
    e.waitUntil(
        caches
            .keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if(cache !== cacheName) {
                            return caches.delete(cache);
                        }
                    })
                );
            })
    );
});

// Call Fetch Event 
self.addEventListener("fetch", e => {
    e.respondWith(
        fetch(e.request)
        .then(res => {
            const resClone = res.clone();
            caches
                .open(cacheName)
                .then(cache => { 
                    cache.put(e.request, resClone);
                });
            return res;
        })
        .catch(() => caches.match(e.request).then(res => res))
    )
});
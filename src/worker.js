const FETCH_HOSTS = ['localhost', 'runetools.app'];
const CACHE_DYNAMIC_REGEX = /^\/images/;
const CACHE_NAME = 'runetools-cache';

self.addEventListener('fetch', event => {
    let url = new URL(event.request.url);
    if (FETCH_HOSTS.indexOf(url.hostname) === -1) {
        return;
    }

    event.respondWith(
        caches.match(url).then(response => {
            return response || fetch(url).then(response => {
                // Test to see if we should dynamically cache this object.
                if (!CACHE_DYNAMIC_REGEX.test(url.pathname)) {
                    return response;
                }

                // Make a copy of the response so both the browser and cache can stream it.
                let responseToCache = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(url, responseToCache));
                return response;
            });
        })
    );
});

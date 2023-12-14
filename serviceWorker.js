// Navn på cache
const staticCacheName = "billedegalleri-v1"
const assets = [
    "/",
    "/index.html",
    "/stylesheet.css",
    "/main.js",
    "./images/flower-sun.jpg",
    "./images/hands-up.jpg",
    "./images/ice-berg.jpg",
    "./images/man-in-sand.jpg",
    "./images/more-sand.jpg",
    "./images/walking-on-rock.jpg",
    "./images/user.jpg",
]

// Installation
self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticCacheName).then(cache => {
            cache.addAll(assets)
        })
    )
});


// fetch data og matcher cache - ikke færdig
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
});
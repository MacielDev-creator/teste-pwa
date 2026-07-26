const CACHE_NAME = "pwa-v3";

const arquivos = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json"
];

// Instalação do Service Worker
self.addEventListener("install", event => {
    self.skipWaiting(); // Força o novo Service Worker a assumir o controle imediatamente
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(arquivos);
        })
    );
});

// Limpeza de caches antigos quando uma versão nova entra no ar
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key); // Deleta caches das versões anteriores
                    }
                })
            );
        }).then(() => self.clients.claim()) // Assume o controle das abas abertas sem precisar reabrir
    );
});

// Estratégia Network First (Rede primeiro, Cache como fallback)
self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request)
            .then(networkResponse => {
                // Se baixou com sucesso da rede, atualiza a cópia do cache
                if (networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                // Se estiver sem internet, pega do cache
                return caches.match(event.request);
            })
    );
});
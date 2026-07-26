const botao = document.getElementById("btn");

botao.addEventListener("click", () => {
    // Abre a janela nativa de impressão
    window.print();
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js")
        .then(() => {
            console.log("Service Worker registrado.");
        });
    });
}

// Mude de "pwa-v1" para "pwa-v2"
const CACHE_NAME = "pwa-v2";

const arquivos = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json"
];

// Adicione este evento para apagar os caches antigos automaticamente ao atualizar
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener("install", event => {
    self.skipWaiting(); // Força o novo Service Worker a ativar imediatamente
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(arquivos))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
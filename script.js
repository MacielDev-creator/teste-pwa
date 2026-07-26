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
const botao = document.getElementById("btn");

botao.addEventListener("click", ()=>{

    alert("PWA funcionando perfeitamente!");

});

if ("serviceWorker" in navigator) {

    window.addEventListener("load", ()=>{

        navigator.serviceWorker.register("service-worker.js")
        .then(()=>{

            console.log("Service Worker registrado.");

        });

    });

}
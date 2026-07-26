const botao = document.getElementById("btn");

// Função que monta a estrutura em texto do cupom de 58mm (32 caracteres de largura)
function gerarTextoCupom() {
    return (
        "      MINHA LOJA PWA      \n" +
        "  Rua Exemplo, 123 - Centro  \n" +
        "    CNPJ: 00.000.000/0001-00 \n" +
        "--------------------------------\n" +
        "PEDIDO: #1042\n" +
        "DATA: 25/07/2026 14:30\n" +
        "--------------------------------\n" +
        "QTD  ITEM            VALOR\n" +
        "1x   Cafe Expresso   R$ 5,00\n" +
        "2x   Pao de Queijo   R$ 8,00\n" +
        "--------------------------------\n" +
        "TOTAL:             R$ 13,00\n" +
        "--------------------------------\n" +
        "   Obrigado pela preferencia!   \n" +
        "      www.meusite.com.br        \n\n\n"
    );
}

botao.addEventListener("click", async () => {
    const textoCupom = gerarTextoCupom();

    // 1. Tenta usar a API de compartilhamento nativa do celular (Android)
    // Isso permite selecionar o OpenLabel diretamente no menu de compartilhamento
    if (navigator.share) {
        try {
            await navigator.share({
                text: textoCupom
            });
            return;
        } catch (err) {
            console.log("Compartilhamento cancelado ou não suportado", err);
        }
    }

    // 2. Fallback: Tenta abrir direto pelo esquema de impressão universal (ou RawBT/OpenLabel)
    // Transforma o texto para o formato de link aceito por print managers
    const base64Texto = btoa(unescape(encodeURIComponent(textoCupom)));
    window.location.href = "rawbt:base64," + base64Texto;
});

// Registro do Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js")
        .then(() => {
            console.log("Service Worker registrado.");
        });
    });
}
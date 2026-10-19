JavaScript
// Base de datos local de ejemplo (puedes vincular códigos QR a textos específicos)
const database = {
    "PROD-001": "Herramienta de diagnóstico: Motor V8 4.7L - Estado: Operativo",
    "DOC-102": "Documento oficial de suministro de inventario - Área logística",
    "https://ejemplo.com": "Enlace externo verificado por el sistema."
};

let html5QrcodeScanner;

function onScanSuccess(decodedText, decodedResult) {
    // Detenemos el escáner momentáneamente al detectar el QR
    html5QrcodeScanner.clear().then(_ => {
        document.getElementById('reader').classList.add('hidden');
        document.getElementById('result-container').classList.remove('hidden');

        const resultDiv = document.getElementById('qr-result');
        
        // Verificamos si el código está en nuestra base de datos interna o mostramos el texto directo
        if (database[decodedText]) {
            resultDiv.innerHTML = `<strong>Código:</strong> ${decodedText}<br><br><strong>Info:</strong> ${database[decodedText]}`;
        } else {
            resultDiv.innerHTML = `<strong>Contenido del QR:</strong> ${decodedText}`;
        }
    }).catch(error => {
        console.error("Fallo al detener el escáner.", error);
    });
}

// Inicializar el escáner de la cámara
document.addEventListener("DOMContentLoaded", (event) => {
    html5QrcodeScanner = new Html5QrcodeScanner(
        "reader", { fps: 10, qrbox: 250 }, false);
    html5QrcodeScanner.render(onScanSuccess);

    // Botón para reiniciar el escaneo
    document.getElementById('scan-again').addEventListener('click', () => {
        window.location.reload();
    });
});
// Base de datos de ejemplo vinculada al código QR (ej: "ROBINSON-001")
const userDatabase = {
    "ROBINSON-001": {
        medical: {
            "NOMBRE": "Robinson José García López",
            "GRUPO SANGUÍNEO": "0 RH + (O Positivo)",
            "ALERGIAS CONOCIDAS": "Ninguna reportada / Sin alergias a medicamentos de uso común.",
            "CONDICIONES MÉDICAS CRÓNICAS": "Ninguna.",
            "MEDICAMENTOS ACTUALES": "Ninguno.",
            "VACUNAS PRINCIPALES": "Tétanos, Fiebre Amarilla, Hepatitis B, COVID-19 (Esquema completo).",
            "OBSERVACIONES MÉDICAS": "Apto para despliegue y actividades tácticas de alta exigencia física.",
            "CONTACTO DE EMERGENCIA": "Nombre: [Persona de contacto] <br> Parentesco: [Relación]"
        },
        professional: {
            "NOMBRE": "Robinson José García López",
            "RANGO / JERARQUÍA": "Teniente de Navío",
            "FUERZA / COMPONENTE": "Armada Bolivariana",
            "NÚMERO DE IDENTIFICACIÓN MILITAR": "VE-6055-AB",
            "ESPECIALIDAD": "Flota / Armamento",
            "UNIDAD DE ADSCRIPCIÓN": "Dirección General del Despacho del MPPD",
            "FECHA DE INGRESO AL SERVICIO": "14 de Julio de 2014",
            "ESTADO DE SERVICIO": "Activo / En servicio",
            "CONDECORACIONES Y MENCIONES DESTACADAS": "Medalla al Mérito Militar <br> Distintivo de Tropa de Operaciones Especiales"
        }
    }
};

let html5QrcodeScanner;

// Función para cambiar de pestañas manualmente con la barra inferior
function switchTab(tabName) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));

    if (tabName === 'scanner') {
        document.getElementById('scanner-section').classList.remove('hidden');
    } else if (tabName === 'medical') {
        document.getElementById('medical-section').classList.remove('hidden');
    } else if (tabName === 'professional') {
        document.getElementById('professional-section').classList.remove('hidden');
    }
}

// Renderizar la información del usuario en las tarjetas correspondientes
function renderUserData(userId) {
    const userData = userDatabase[userId] || userDatabase["ROBINSON-001"]; // Fallback por defecto

    // Cargar datos médicos
    const medContainer = document.getElementById('medical-content');
    medContainer.innerHTML = "";
    for (const [key, val] of Object.entries(userData.medical)) {
        medContainer.innerHTML += `
            <div class="data-field">
                <span class="label">${key}:</span>
                <span class="value">${val}</span>
            </div>`;
    }

    // Cargar datos profesionales
    const profContainer = document.getElementById('professional-content');
    profContainer.innerHTML = "";
    for (const [key, val] of Object.entries(userData.professional)) {
        profContainer.innerHTML += `
            <div class="data-field">
                <span class="label">${key}:</span>
                <span class="value">${val}</span>
            </div>`;
    }

    // Mostrar automáticamente la sección médica tras escanear
    document.getElementById('scanner-section').classList.add('hidden');
    document.getElementById('medical-section').classList.remove('hidden');
}

function onScanSuccess(decodedText, decodedResult) {
    html5QrcodeScanner.clear().then(_ => {
        renderUserData(decodedText.trim());
    }).catch(error => {
        console.error("Error al apagar la cámara", error);
    });
}

document.addEventListener("DOMContentLoaded", (event) => {
    // Inicializar el escáner QR
    html5QrcodeScanner = new Html5QrcodeScanner(
        "reader", { fps: 10, qrbox: 220 }, false);
    html5QrcodeScanner.render(onScanSuccess);

    // Para pruebas inmediatas sin cámara, puedes simular la lectura ejecutando:
    // renderUserData("ROBINSON-001");
});

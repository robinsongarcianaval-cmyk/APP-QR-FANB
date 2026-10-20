// Base de datos vinculada al código QR
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
            "RANGO / JERARQUÍA": "Sargento Primero",
            "FUERZA / COMPONENTE": "Fuerzas Armadas",
            "NÚMERO DE IDENTIFICACIÓN MILITAR": "VE-849201-JM",
            "ESPECIALIDAD": "Operaciones Tácticas / Infantería",
            "UNIDAD DE ADSCRIPCIÓN": "Batallón de Operaciones Especiales",
            "FECHA DE INGRESO AL SERVICIO": "15 de marzo de 2020",
            "ESTADO DE SERVICIO": "Activo / En servicio",
            "CONDECORACIONES Y MENCIONES DESTACADAS": "Medalla al Mérito Militar <br> Distintivo de Tropa de Operaciones Especiales"
        }
    }
};

let html5QrcodeScanner;

// Función para cambiar de pestañas en la barra inferior
function switchTab(tabName) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));

    if (tabName === 'scanner') {
        location.reload(); // Recarga limpia para reiniciar la cámara si se regresa
    } else if (tabName === 'medical') {
        document.getElementById('medical-section').classList.remove('hidden');
    } else if (tabName === 'professional') {
        document.getElementById('professional-section').classList.remove('hidden');
    }
}

// Renderizar la información del usuario en las tarjetas
function renderUserData(userId) {
    const userData = userDatabase[userId] || userDatabase["ROBINSON-001"];

    const medContainer = document.getElementById('medical-content');
    medContainer.innerHTML = "";
    for (const [key, val] of Object.entries(userData.medical)) {
        medContainer.innerHTML += `
            <div class="data-field">
                <span class="label">${key}:</span>
                <span class="value">${val}</span>
            </div>`;
    }

    const profContainer = document.getElementById('professional-content');
    profContainer.innerHTML = "";
    for (const [key, val] of Object.entries(userData.professional)) {
        profContainer.innerHTML += `
            <div class="data-field">
                <span class="label">${key}:</span>
                <span class="value">${val}</span>
            </div>`;
    }

    document.getElementById('scanner-section').classList.add('hidden');
    document.getElementById('medical-section').classList.remove('hidden');
}

// Acción al detectar el código QR con éxito
function onScanSuccess(decodedText, decodedResult) {
    if (html5QrcodeScanner) {
        html5QrcodeScanner.clear().then(() => {
            renderUserData(decodedText.trim());
        }).catch(() => {
            renderUserData(decodedText.trim());
        });
    } else {
        renderUserData(decodedText.trim());
    }
}

document.addEventListener("DOMContentLoaded", () => {
    try {
        html5QrcodeScanner = new Html5QrcodeScanner(
            "reader", { fps: 10, qrbox: 220 }, false);
        html5QrcodeScanner.render(onScanSuccess, (error) => {
            // Ignorar errores de fotogramas sin QR
        });
    } catch (e) {
        console.error("Error al inicializar la cámara:", e);
    }
});

    // Para pruebas inmediatas sin cámara, puedes simular la lectura ejecutando:
    // renderUserData("ROBINSON-001");
});

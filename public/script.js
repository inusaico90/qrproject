const API_URL_VERIFICAR = 'https://script.google.com/macros/s/AKfycbztCYgpqs7ifD0Eie_8y74CpNi7t-MMvm9SaR6SN334DBxFGeDU17Mrs1ohy3krttIH/exec';

function verificarCodigo() {
    const codigo = document.getElementById('codigo').value;
    fetch(API_URL_VERIFICAR, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: codigo, accion: "verificar" })
    })
    .then(response => response.json())
    .then(data => {
        if (data.verificar) {
            document.getElementById('resultado').innerText = "Código válido. Procediendo a actualizar...";
            actualizarCodigo(codigo);
        } else {
            document.getElementById('resultado').innerText = "Código no válido o ya usado.";
        }
    })
    .catch(error => {
        console.error("Error en verificarCodigo:", error);
        document.getElementById('resultado').innerText = "Error al verificar el código.";
    });
}

function actualizarCodigo(codigo) {
    fetch(API_URL_VERIFICAR, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: codigo, accion: "actualizar" })
    })
    .then(response => response.json())
    .then(data => {
        if (data.actualizado) {
            document.getElementById('resultado').innerText = "Código actualizado exitosamente.";
        } else {
            document.getElementById('resultado').innerText = "Error al actualizar el código.";
        }
    })
    .catch(error => {
        console.error("Error en actualizarCodigo:", error);
        document.getElementById('resultado').innerText = "Error al actualizar el código.";
    });
}
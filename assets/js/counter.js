const fs = require('fs');

const contadorPath = './contador.txt';

// Función para leer el contador de visitas desde el archivo
function leerContador() {
    try {
        const contador = fs.readFileSync(contadorPath, 'utf8');
        return parseInt(contador);
    } catch (error) {
        return 0;
    }
}

// Función para guardar el contador de visitas en el archivo
function guardarContador(contador) {
    fs.writeFileSync(contadorPath, contador.toString(), 'utf8');
}

// Obtener el contador actual y mostrarlo en la página
let contador = leerContador();
document.getElementById('contador').innerText = `${contador} visitas`;

// Incrementar el contador cada vez que se carga la página
contador++;
guardarContador(contador);

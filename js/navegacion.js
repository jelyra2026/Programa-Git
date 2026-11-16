/* Navegación entre las pantallas de JELYRA */

// Obtener todas las opciones del menú
const opcionesMenu = document.querySelectorAll(".opcion-menu");

// Obtener todas las secciones de la aplicación
const secciones = document.querySelectorAll(".seccion");

// Función para mostrar una pantalla
function mostrarPantalla(nombrePantalla) {

    // Ocultar todas las secciones
    secciones.forEach(function(seccion) {
        seccion.classList.add("oculto");
    });

    // Quitar la selección de todas las opciones del menú
    opcionesMenu.forEach(function(opcion) {
        opcion.classList.remove("activo");
    });

    // Buscar la pantalla que se quiere mostrar
    const pantalla = document.getElementById(nombrePantalla);

    // Mostrar la pantalla encontrada
    if (pantalla) {
        pantalla.classList.remove("oculto");
    }

    // Marcar como activa la opción seleccionada
    opcionesMenu.forEach(function(opcion) {
        if (opcion.dataset.pantalla === nombrePantalla) {
            opcion.classList.add("activo");
        }
    });
}

// Escuchar los clics en las opciones del menú
opcionesMenu.forEach(function(opcion) {

    opcion.addEventListener("click", function() {

        const nombrePantalla = opcion.dataset.pantalla;

        mostrarPantalla(nombrePantalla);

    });

});

// Escuchar los botones que llevan a otras pantallas
const botonesIr = document.querySelectorAll("[data-ir]");

botonesIr.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const nombrePantalla = boton.dataset.ir;

        mostrarPantalla(nombrePantalla);

    });

});
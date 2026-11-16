
/* JELYRA - FUNCIONES PRINCIPALES */

// ELEMENTOS DEL INICIO DE SESIÓN
const formularioLogin = document.getElementById("formulario-login");
const pantallaLogin = document.getElementById("pantalla-login");
const aplicacion = document.getElementById("aplicacion");
const cerrarSesion = document.getElementById("cerrar-sesion");

// INICIAR SESIÓN
if (formularioLogin) {

    formularioLogin.addEventListener("submit", function(evento) {

        evento.preventDefault();

        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("password").value.trim();
        const mensaje = document.getElementById("mensaje-login");

        if (correo === "" || password === "") {
            mensaje.textContent = "Por favor, completa todos los campos.";
            return;
        }

        mensaje.textContent = "";

        pantallaLogin.classList.add("oculto");
        aplicacion.classList.remove("oculto");

        mostrarPantalla("inicio");

    });

}

// CERRAR SESIÓN
if (cerrarSesion) {

    cerrarSesion.addEventListener("click", function() {

        aplicacion.classList.add("oculto");
        pantallaLogin.classList.remove("oculto");

        formularioLogin.reset();

    });

}

// VALIDACIÓN DEL ARCHIVO JSON
const botonValidar = document.getElementById("btn-validar");

if (botonValidar) {

    botonValidar.addEventListener("click", function() {

        const archivo = document.getElementById("archivo-rips").files[0];
        const resultado = document.getElementById("resultado-validacion");

        if (!archivo) {
            resultado.textContent = "Primero debes seleccionar un archivo JSON.";
            return;
        }

        const lector = new FileReader();

        lector.onload = function(evento) {

            try {

                const contenido = JSON.parse(evento.target.result);

                resultado.innerHTML = `
                    <div class="resultado exito">
                        <strong>Archivo JSON leído correctamente.</strong>
                        <p>La sintaxis JSON es válida.</p>
                        <p>Esto todavía no representa una validación completa
                        de los requisitos oficiales de RIPS.</p>
                    </div>
                `;

                console.log("Contenido del archivo:", contenido);

            } catch (error) {

                resultado.innerHTML = `
                    <div class="resultado error">
                        <strong>El archivo contiene un error de formato JSON.</strong>
                        <p>${error.message}</p>
                    </div>
                `;

            }

        };

        lector.onerror = function() {
            resultado.textContent = "No fue posible leer el archivo.";
        };

        lector.readAsText(archivo);

    });

}

// CONSULTAR DETALLES DE ERRORES
const botonesDetalle = document.querySelectorAll(".btn-detalle");

const detallesErrores = {

    fecha: {
        titulo: "Error en la fecha",
        descripcion: "La fecha registrada no cumple con el formato esperado.",
        recomendacion: "Revisa la fecha y verifica que esté correctamente registrada."
    },

    documento: {
        titulo: "Error en el documento",
        descripcion: "El número o tipo de documento presenta una inconsistencia.",
        recomendacion: "Verifica los datos de identificación del paciente."
    }

};

botonesDetalle.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const tipoError = boton.dataset.error;
        const detalle = detallesErrores[tipoError];

        if (detalle) {

            document.getElementById("detalle-titulo").textContent = detalle.titulo;

            document.getElementById("detalle-descripcion").textContent = detalle.descripcion;

            document.getElementById("detalle-recomendacion").textContent = detalle.recomendacion;

            mostrarPantalla("detalle");

        }

    });

});
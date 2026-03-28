document.getElementById("btnCalcular").addEventListener("click", () => {

    const servicios = document.querySelectorAll(".serv-check");
    let total = 0;
    let seleccionados = 0;
    servicios.forEach(serv => {
        if (serv.checked) {
            total += parseInt(serv.dataset.precio);
            seleccionados++;
        }
    });

    const resultado = document.getElementById("resultadoCosto");
    if (seleccionados === 0) {
        resultado.textContent = "Selecciona al menos un servicio.";
        resultado.style.color = "red";
        return;
    }

    if (total > 300) {
        resultado.textContent = `Total: $${total} — ¡Aplicaste a un DESCUENTO del 10%!`;
        resultado.style.color = "green";
        total = total * 0.90;
    } else {
        resultado.textContent = `Total a pagar: $${total}`;
        resultado.style.color = "#007bff";
    }
});
document.addEventListener("DOMContentLoaded", ()=>{

    const form = document.querySelector(".buzon form");
    const input = document.querySelector(".llenado");
    const lista = document.createElement("div");
    lista.style.margin = "20px";
    form.parentElement.appendChild(lista);

    let reportes = [];

    form.addEventListener("submit", e=>{
        e.preventDefault();
        const texto = input.value.trim();
        if(texto.length < 5) return alert("Escribe una queja válida.");
        const palabras = texto.split(/\s+/).length;
        const prioridad = palabras > 12 ? "Alta" : "Normal";

        reportes.push({texto, palabras, prioridad});
        input.value = "";

        mostrarReportes();
    });

    function mostrarReportes(){
        lista.innerHTML = "<h3>Reportes enviados:</h3>";
        reportes.forEach(r=>{
            const card = document.createElement("div");
            card.style.background = "#fff";
            card.style.padding = "10px";
            card.style.margin = "8px 0";
            card.style.border = "1px solid #ccc";
            card.innerHTML = `
                <strong>Prioridad: ${r.prioridad}</strong><br>
                Palabras: ${r.palabras}<br>
                ${r.texto}
            `;
            lista.appendChild(card);
        });
    }

});
let totalQuejas = 0;

document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    totalQuejas++;

    document.getElementById("contadorQuejas").textContent = totalQuejas;
    let porcentaje = Math.min(totalQuejas * 10, 100);
    document.getElementById("barraProgreso").style.width = porcentaje + "%";
    let mensaje = "";
    if (totalQuejas < 3) mensaje = "El buzón está tranquilo.";
    else if (totalQuejas < 6) mensaje = "Aumentan las quejas, buen trabajo.";
    else mensaje = "¡Alta actividad! Necesitamos actuar ya.";

    document.getElementById("mensajeEstado").textContent = mensaje;

    for (let i = 0; i < 5; i++) {
        console.log("Procesando parte " + (i + 1));
    }

    alert("¡Gracias! Tu queja ha sido registrada.");
});
function procesarEncuesta(){
    const val = Number(document.getElementById("gravedad").value);

    if(!val || val < 1 || val > 5){
        document.getElementById("resultadoGravedad").textContent =
        "Ingresa un valor entre 1 y 5.";
        return;
    }

    const costoEstimado = val * 150;

    document.getElementById("resultadoGravedad").textContent =
        "Nivel registrado. Estimación para atender el problema: $" + costoEstimado + " MXN.";
}
function validarContacto(){
    const nombre = document.getElementById("nombreContacto").value.trim();
    const email = document.getElementById("emailContacto").value.trim();
    const tel = document.getElementById("telContacto").value.trim();
    const detalles = document.getElementById("detalleContacto").value.trim();
    const mensaje = document.getElementById("mensajeContacto");
    if(nombre.length < 3){
        mensaje.textContent = "Nombre inválido (mínimo 3 letras).";
        return;
    }

    if(!email.includes("@") || !email.includes(".")){
        mensaje.textContent = "Correo electrónico inválido.";
        return;
    }

    if(!/^\d{10}$/.test(tel)){
        mensaje.textContent = "El teléfono debe tener exactamente 10 dígitos.";
        return;
    }

    if(detalles.length < 5){
        mensaje.textContent = "Describe más tu mensaje.";
        return;
    }

    mensaje.textContent = "¡Formulario enviado correctamente!";
}
document.getElementById("fotoContacto").addEventListener("change", function(){
    const file = this.files[0];
    const preview = document.getElementById("previewFoto");

    if(file){
        const lector = new FileReader();
        lector.onload = function(e){
            preview.src = e.target.result;
            preview.style.display = "block";
        }
        lector.readAsDataURL(file);
    }
});

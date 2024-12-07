let bdata = window.localStorage;
let tablaPrestamos = document.getElementById('tabla-prestamos');
let formPrestamo = document.getElementById('form-prestamo');
let eliminarTodoBtn = document.getElementById('eliminar-todo');

function guardarPrestamo(){
    let nombreLibro = document.getElementById("nombre-libro").value;
    let fechaPrestamo = document.getElementById("fecha-prestamo").value;
    let autor = document.getElementById("autor").value;
    let editorial = document.getElementById("editorial").value;
    let cantidad = parseInt(document.getElementById("cantidad").value, 10);

    if (!nombreLibro || !fechaPrestamo || !autor || !editorial || isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, completa todos los campos correctamente.");
        
    }
    let prestamo = {
        nombreLibro: nombreLibro,
        fecha: fechaPrestamo,
        autor: autor,
        editorial: editorial,
        cantidad: cantidad,
        total: cantidad * 50 
    };
    let id = obtenerSiguienteID();
    bdata.setItem(id, JSON.stringify(prestamo));
    renderizarTabla();
    formPrestamo.reset();
    
}
function obtenerSiguienteID() {
    let llaves = Object.keys(bdata).map(Number);
    //  decision terciaria
    //sparse arreglos en js  ecma6
    return llaves.length > 0 ? Math.max(...llaves) + 1 : 1;
}
function renderizarTabla() {
    listarPrestamos();
}

function listarPrestamos() {
    let llaves = Object.keys(bdata).map(Number).sort((a, b) => a - b);
    tablaPrestamos.innerHTML = "";

    llaves.forEach(function (llave) {
        let dato = JSON.parse(bdata.getItem(llave));
        let fila = `<tr>
            <td>${llave}</td>
            <td>${dato.fecha}</td>
            <td>${dato.nombreLibro}</td>
            <td>${dato.cantidad}</td>
            <td>$${dato.total}</td>
        </tr>`;
        tablaPrestamos.innerHTML += fila;
    });
}

function cancelarFormulario() {
    formPrestamo.reset();
}

formPrestamo.addEventListener('submit', function (e) {
    e.preventDefault();
    guardarPrestamo();
});

function borrarBD() {
    let respuesta = window.confirm("¿Seguro que desea borrar la base de datos? s/n");

    if (respuesta) {
        bdata.clear();
        renderizarTabla();
        alert("La base de datos ha sido eliminada");
    }
}
eliminarTodoBtn.addEventListener('click', borrarBD);


renderizarTabla();
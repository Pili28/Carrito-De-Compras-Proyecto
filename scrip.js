let productos = [];

function validarDatos(id, nombre, precio){

    if (id == '') {
        alert('debe ingresar un id');
        return false;
    }

    if (nombre == '') {
        alert('debe ingresar un nombre');
        return false;
    }

    if (precio == '') {
        alert('debe ingresar un precio');
        return false;
    }

    return true;
}

function guardarDatos(id, nombre, precio){

    productos.push(
        {
            id: id,
            nombre: nombre,
            precio: precio
        }
    );
    guardarGalletasDeProductos();
}

var arrayDeLosProductos;
function extraerGalletasDeProductos(){
    var galletasExtraidas = localStorage.getItem('galletasDeProductos');
    if(galletasExtraidas!=null){
        arrayDeLosProductos = JSON.parse(galletasExtraidas);
        mostrarDatosDeLasGalletasDeProductos();
    }
}

function guardarGalletasDeProductos(){
    localStorage.setItem('galletasDeProductos', JSON.stringify(productos));
}

function mostrarDatosDeLasGalletasDeProductos(){

    let registros = '';

    for (entidadExtraida of arrayDeLosProductos) {
        registros +=
        `
            <tr>
                <td>${entidadExtraida.id}</td>
                <td>${entidadExtraida.nombre}</td>
                <td>${entidadExtraida.precio}</td>
            </tr>
        `
    }

    let detalle = document.getElementById('detalle');

    detalle.innerHTML = registros;

}

function mostrarDatos(){

    let registros = '';

    for (let i = 0; i < productos.length; i++) {
       
        registros +=
        `
            <tr>
                <td>${productos[i].id}</td>
                <td>${productos[i].nombre}</td>
                <td>${productos[i].precio}</td>
            </tr>
        `
    }

    let detalle = document.getElementById('detalle');

    detalle.innerHTML = registros;

}

function limpiarControles(){
    document.getElementById('id').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
}

function guardarRegistro(){

    let id = document.getElementById('id').value;
    let nombre = document.getElementById('nombre').value;
    let precio = document.getElementById('precio').value;

  
    if (validarDatos(id,nombre,precio) == false) {
        return;
    }

    guardarDatos(id,nombre,precio);

    mostrarDatos();

    limpiarControles();

}

/*Segmento de codigo para el funcionamiento del carrito de compras*/

let arrayDelCarrito = [];
function guardarDatosDelCarrito(codigo, descripcion, precio, cantidad, imagen){
    arrayDelCarrito.push(
        {
            codigo: codigo,
            descripcion: descripcion,
            precio: precio,
            cantidad: cantidad,
            imagen: imagen
        }
    );
    guardarGalletasDelCarrito();
}

function extraerGalletasDelCarrito(){
    var galletasExtraidas = localStorage.getItem('galletasDelCarrito');
    if(galletasExtraidas!=null){
        arrayDelCarrito = JSON.parse(galletasExtraidas);
        mostrarDatosDeLasGalletasDelCarrito();
        console.log(arrayDelCarrito);
    }
}

function guardarGalletasDelCarrito(){
    localStorage.setItem('galletasDelCarrito', JSON.stringify(arrayDelCarrito));
}

var totalDelPedido=0;
function mostrarDatosDeLasGalletasDelCarrito(){
    totalDelPedido=0;
    let registros = '';
    for (entidadExtraida of arrayDelCarrito) {
        registros +=
        `
            <tr>
                <td>${entidadExtraida.codigo}</td>
                <td>${entidadExtraida.descripcion}<img src="${entidadExtraida.imagen}" width="70"></td>
                <td>${entidadExtraida.cantidad} <button onclick="aumentarCantidad('${entidadExtraida.codigo}');">+</button><button onclick="reducirCantidad('${entidadExtraida.codigo}');">-</button><button onclick="eliminarProductoDelCarrito('${entidadExtraida.codigo}');">Eliminar</button></td>
                <td>${entidadExtraida.precio}</td>
                <td>${entidadExtraida.cantidad*entidadExtraida.precio}</td>
            </tr>
        `
        totalDelPedido+=entidadExtraida.cantidad*entidadExtraida.precio;
    }
    let detalle = document.getElementById('detalle');
    let totalDelPedidoFinal = document.getElementById('total');
    totalDelPedidoFinal.innerHTML = totalDelPedido;
    detalle.innerHTML = registros;
}

function guardarRegistroDelCarrito(codigo, descripcion, imagen, precio){
    let cantida = prompt("Ingrese la cantidad que desea agregar.");
    guardarDatosDelCarrito(codigo,descripcion,precio,cantida,imagen);
}
var arrayTemporal=[]
function aumentarCantidad(codigoParaLaOperacion){
    var arrayTemporal=[]
    for (entidadExtraida of arrayDelCarrito) {
        if(entidadExtraida.codigo==codigoParaLaOperacion){
            
            var cantidadActual=parseInt(entidadExtraida.cantidad);
            var nuevaCantidad=cantidadActual+1;
            arrayTemporal.push(
                {
                    codigo: entidadExtraida.codigo,
                    descripcion: entidadExtraida.descripcion,
                    precio: entidadExtraida.precio,
                    cantidad: nuevaCantidad,
                    imagen: entidadExtraida.imagen
                }
            );
        
        }
        if(entidadExtraida.codigo!=codigoParaLaOperacion){
            arrayTemporal.push(
                {
                    codigo: entidadExtraida.codigo,
                    descripcion: entidadExtraida.descripcion,
                    precio: entidadExtraida.precio,
                    cantidad: entidadExtraida.cantidad,
                    imagen: entidadExtraida.imagen
                }
            );
        }
    }
    arrayDelCarrito=[];
    arrayDelCarrito=arrayTemporal;
    guardarGalletasDelCarrito();
    mostrarDatosDeLasGalletasDelCarrito();
}

function reducirCantidad(codigoParaLaOperacion){
    var arrayTemporal=[]
    for (entidadExtraida of arrayDelCarrito) {
        if(entidadExtraida.codigo==codigoParaLaOperacion){
            var cantidadActual=parseInt(entidadExtraida.cantidad);
            var nuevaCantidad=cantidadActual-1;
            if(cantidadActual>1){
                arrayTemporal.push(
                    {
                        codigo: entidadExtraida.codigo,
                        descripcion: entidadExtraida.descripcion,
                        precio: entidadExtraida.precio,
                        cantidad: nuevaCantidad,
                        imagen: entidadExtraida.imagen
                    }
                );
            }
            if(cantidadActual<=1){
                alert("No puedes reducir.");
                arrayTemporal.push(
                    {
                        codigo: entidadExtraida.codigo,
                        descripcion: entidadExtraida.descripcion,
                        precio: entidadExtraida.precio,
                        cantidad: entidadExtraida.cantidad,
                        imagen: entidadExtraida.imagen
                    }
                );
            }
        }
        if(entidadExtraida.codigo!=codigoParaLaOperacion){
            arrayTemporal.push(
                {
                    codigo: entidadExtraida.codigo,
                    descripcion: entidadExtraida.descripcion,
                    precio: entidadExtraida.precio,
                    cantidad: entidadExtraida.cantidad,
                    imagen: entidadExtraida.imagen
                }
            );
        }
    }
    arrayDelCarrito=[];
    arrayDelCarrito=arrayTemporal;
    guardarGalletasDelCarrito();
    mostrarDatosDeLasGalletasDelCarrito();
}

function eliminarProductoDelCarrito(codigoParaLaOperacion){
    var arrayTemporal=[]
    for (entidadExtraida of arrayDelCarrito) {
        if(entidadExtraida.codigo!=codigoParaLaOperacion){
            arrayTemporal.push(
                {
                    codigo: entidadExtraida.codigo,
                    descripcion: entidadExtraida.descripcion,
                    precio: entidadExtraida.precio,
                    cantidad: entidadExtraida.cantidad,
                    imagen: entidadExtraida.imagen
                }
            );
        }
    }
    arrayDelCarrito=[];
    arrayDelCarrito=arrayTemporal;
    guardarGalletasDelCarrito();
    mostrarDatosDeLasGalletasDelCarrito();
}

function realizarPedido(){
    alert("Su pedido se ha realizado exitosamente!.");
    localStorage.clear();
    location.reload();
}

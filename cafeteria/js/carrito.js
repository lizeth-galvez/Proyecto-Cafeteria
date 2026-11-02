let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
function mostrarCarrito(){
    const lista = document.getElementById("lista-carrito");
    const total = document.getElementById("total");
    lista.innerHTML = "";
    let totalCompra = 0;

    if(carrito.length === 0){
        lista.innerHTML = `
            <tr>
                <td colspan="5">
                    El carrito está vacío
                </td>
            </tr>
        `;
        total.textContent = "S/ 0.00";
        actualizarContador();
        return;
    }
    carrito.forEach((producto, index) => {
        let subtotal = producto.precio * producto.cantidad;
        totalCompra += subtotal;
        lista.innerHTML += `
        <tr>
            <td>
                <div class="info-producto">
                    <img src="${producto.imagen}" class="img-producto">
                    <span>${producto.nombre}</span>
                </div>
            </td>
            <td>S/ ${producto.precio.toFixed(2)}</td>
            <td>
                <button onclick="disminuir(${index})">-</button>
                ${producto.cantidad}
                <button onclick="aumentar(${index})">+</button>
            </td>
            <td>S/ ${subtotal.toFixed(2)}</td>
            <td>
                <button onclick="eliminar(${index})">Eliminar</button>
            </td>
        </tr>
        `;
    });
    total.textContent = "S/ " + totalCompra.toFixed(2);
    actualizarContador();
}
function aumentar(index){
    carrito[index].cantidad++;
    guardarCarrito();
}
function disminuir(index){
    if(carrito[index].cantidad > 1){
        carrito[index].cantidad--;
    }
    else{
        carrito.splice(index, 1);
    }
    guardarCarrito();
}
function eliminar(index){
    carrito.splice(index, 1);
    guardarCarrito();
}
function guardarCarrito(){
    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
    mostrarCarrito();
}
function actualizarContador(){
    const contador = document.getElementById("contador");
    if(contador){
        let cantidad = 0;
        carrito.forEach(producto => {
            cantidad += producto.cantidad;
        });
        contador.textContent = cantidad;
    }
}
const botonVaciar = document.getElementById("vaciar");
if(botonVaciar){
    botonVaciar.addEventListener(
        "click",
        () => {
            carrito = [];
            guardarCarrito();
        }
    );
}
const botonComprar = document.getElementById("comprar");
if(botonComprar){
    botonComprar.addEventListener(
        "click",
        (e) => {
            e.preventDefault();

            if(carrito.length === 0){
                alert("Tu carrito está vacío");
                return;
            }
            window.location.href = "contacto.html";
        }
    );
}
mostrarCarrito();
function agregarPromocion(nombre, precio, imagen){
    let carrito = JSON.parse(
        localStorage.getItem("carrito")
    ) || [];
    let productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );
    if(productoExistente){
        productoExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        });
    }
    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
    actualizarContador();
    alert(nombre + " agregado al carrito 🛒");
}
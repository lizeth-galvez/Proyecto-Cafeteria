let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function actualizarContador() {
    const contador = document.getElementById('contador');
    if (contador) {
        const total = carrito.reduce((suma, item) => suma + item.cantidad, 0);
        contador.textContent = total;
    }
}
function mostrarNotificacion(mensaje) {
    let toast = document.getElementById('toast-notificacion');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notificacion';
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #2e7d32;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            font-family: sans-serif;
            font-size: 0.95rem;
            z-index: 1000;
            transition: opacity 0.3s ease, transform 0.3s ease;
            opacity: 0;
            transform: translateY(20px);
        `;
        document.body.appendChild(toast);
    }

    toast.textContent = mensaje;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
    }, 2500);
}

function agregarCarrito(nombre, precio, imagen) {
    const productoExistente = carrito.find(item => item.nombre === nombre);
    
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    mostrarNotificacion(`¡${nombre} agregado al carrito!`);
}
function inicializarFiltrosYBuscador() {
    const inputBuscador = document.getElementById('inputBuscador');
    const botonesCategoria = document.querySelectorAll('.btn-categoria');
    const productos = document.querySelectorAll('.prod');

    if (!inputBuscador && botonesCategoria.length === 0) return;

    let categoriaActual = 'todos';

    function filtrarProductos() {
        const textoBusqueda = inputBuscador ? inputBuscador.value.toLowerCase().trim() : '';

        productos.forEach(producto => {
            const titulo = producto.querySelector('h3') ? producto.querySelector('h3').textContent.toLowerCase() : '';
            const descripcion = producto.querySelector('p') ? producto.querySelector('p').textContent.toLowerCase() : '';
            const coincideCategoria = categoriaActual === 'todos' || producto.classList.contains(categoriaActual);
            const coincideTexto = titulo.includes(textoBusqueda) || descripcion.includes(textoBusqueda);
            if (coincideCategoria && coincideTexto) {
                producto.style.display = 'block';
            } else {
                producto.style.display = 'none';
            }
        });
    }
    if (inputBuscador) {
        inputBuscador.addEventListener('keyup', filtrarProductos);
    }
    botonesCategoria.forEach(boton => {
        boton.addEventListener('click', function () {
            botonesCategoria.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            categoriaActual = this.getAttribute('data-categoria');
            filtrarProductos();
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
    inicializarFiltrosYBuscador();
    const botones = document.querySelectorAll('.prod button');
    botones.forEach((boton) => {
        boton.addEventListener('click', () => {
            const prod = boton.closest('.prod');
            const nombre = prod.querySelector('h3').textContent;
            const precioTexto = prod.querySelector('span').textContent;
            const precio = parseFloat(
                precioTexto.replace('S/', '').replace('S/.', '').trim()
            );
            const imagen = prod.querySelector('img').src;

            agregarCarrito(nombre, precio, imagen);
        });
    });
    const botonCopiar = document.getElementById("copiar");
    if (botonCopiar) {
        botonCopiar.addEventListener("click", function () {
            const codigoElemento = document.querySelector(".codigo");
            if (!codigoElemento) return;

            const codigo = codigoElemento.textContent.trim();
            navigator.clipboard.writeText(codigo)
                .then(() => {
                    botonCopiar.textContent = "¡Cupón Copiado!";
                    setTimeout(() => {
                        botonCopiar.textContent = "Copiar Cupón";
                    }, 2000);
                })
                .catch(() => {
                    mostrarNotificacion("No se pudo copiar el cupón");
                });
        });
    }
});
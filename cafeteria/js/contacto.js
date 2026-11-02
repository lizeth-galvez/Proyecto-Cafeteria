document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorHeader();
    const formContacto = document.getElementById("form-contacto");

    if (formContacto) {
        formContacto.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value;
            alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado con éxito. Nos pondremos en contacto contigo pronto. `);
            localStorage.removeItem("carrito");
            formContacto.reset();
        });
    }
});
function actualizarContadorHeader() {
    const contador = document.getElementById("contador");
    if (contador) {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        let cantidad = 0;
        carrito.forEach(producto => {
            cantidad += producto.cantidad;
        });
        contador.textContent = cantidad;
    }
}
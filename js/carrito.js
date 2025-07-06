document.addEventListener("DOMContentLoaded", () => {
  let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

  const actualizarCantidadCarritoEnHeader = () => {
    const contadorCarritoSpan = document.getElementById("contador-carrito");
    if (contadorCarritoSpan) {
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contadorCarritoSpan.textContent = totalItems;
    }
  };

  const eliminarProducto = (idProducto) => {
    const indice = carrito.findIndex(p => p.id === idProducto);

    if (indice !== -1) {
      if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad--;
      } else {
        carrito.splice(indice, 1);
      }
      sessionStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarCantidadCarritoEnHeader();
      pintarCarrito();
    }
  };

  const pintarCarrito = () => {
    const listadoCompra = document.getElementById("contenedor-carrito");
    const resumen = document.getElementById("resumen-carrito");

    if (!listadoCompra || !resumen) {
        console.error("No se encontró 'contenedor-carrito' o 'resumen-carrito'");
        return;
    }

    listadoCompra.innerHTML = "";
    resumen.innerHTML = "";

    if (carrito.length === 0) {
      listadoCompra.innerHTML = "<p><b>El carrito está vacío.</b></p>";
      return;
    }

    let cantidadTotalProductos = 0;
    let totalImporte = 0;

    carrito.forEach(producto => {
      const tarjetaProducto = document.createElement("article");
      tarjetaProducto.classList.add("tarjeta-producto");

      const imagenProducto = document.createElement("img");
      imagenProducto.src = producto.images[0];
      imagenProducto.alt = producto.title;

      const tituloProducto = document.createElement("h3");
      tituloProducto.classList.add("titulo-producto");
      tituloProducto.textContent = producto.title;

      const precioProducto = document.createElement("p");
      precioProducto.textContent = `Precio: $${(producto.price * producto.cantidad).toFixed(2)} (x${producto.cantidad})`;

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.classList.add("btn-eliminar");

      btnEliminar.addEventListener("click", () => {
        eliminarProducto(producto.id);
      });

      tarjetaProducto.appendChild(imagenProducto);
      tarjetaProducto.appendChild(tituloProducto);
      tarjetaProducto.appendChild(precioProducto);
      tarjetaProducto.appendChild(btnEliminar);

      listadoCompra.appendChild(tarjetaProducto);

      cantidadTotalProductos += producto.cantidad;
      totalImporte += producto.price * producto.cantidad;
    });

    const pCantidad = document.createElement("p");
    pCantidad.textContent = `Cantidad de productos: ${cantidadTotalProductos}`;

    const pTotal = document.createElement("p");
    pTotal.textContent = `Importe total: $${totalImporte.toFixed(2)}`;

    const btnFinalizar = document.createElement("button");
    btnFinalizar.textContent = "Finalizar compra";
    btnFinalizar.classList.add("btn");

    btnFinalizar.addEventListener("click", () => {
      alert("Gracias por tu compra 🎉");
      carrito = [];
      sessionStorage.removeItem("carrito"); 
      actualizarCantidadCarritoEnHeader();
      pintarCarrito();
    });

    resumen.appendChild(pCantidad);
    resumen.appendChild(pTotal);
    resumen.appendChild(btnFinalizar);
  };

  pintarCarrito();
  actualizarCantidadCarritoEnHeader();
});
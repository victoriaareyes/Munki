document.addEventListener("DOMContentLoaded", () => {
  let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

  const actualizarCantidadCarritoEnHeader = () => {
    const contadorCarritoSpan = document.getElementById("contador-carrito");
    if (contadorCarritoSpan) {
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contadorCarritoSpan.textContent = totalItems;
    }
  };

  const agregarProducto = (productoNuevo) => {
    const productoExistente = carrito.find(p => p.id === productoNuevo.id);

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push({ ...productoNuevo, cantidad: 1 });
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    
    actualizarCantidadCarritoEnHeader();
    alert(`${productoNuevo.title} agregado al carrito`);
  };

  const renderizarProductos = () => {
    const url = "https://dummyjson.com/products/category/sports-accessories";

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const contenedor = document.querySelector(".productos-grid");
        if (!contenedor) {
            console.warn("Contenedor .productos-grid no encontrado.");
            return;
        }
        contenedor.innerHTML = "";

        for (const producto of data.products) {
          const tarjeta = document.createElement("article");
          tarjeta.classList.add("product-card");

          const imagen = document.createElement("img");
          imagen.src = producto.images[0]; 
          imagen.alt = producto.title;

          const titulo = document.createElement("h3");
          titulo.textContent = producto.title;

          const precio = document.createElement("p");
          precio.textContent = `$${producto.price}`;

          const btnAgregar = document.createElement("button");
          btnAgregar.textContent = "Agregar";
          btnAgregar.classList.add("btn-agregar");

          btnAgregar.addEventListener("click", () => {
            agregarProducto(producto);
          });

          tarjeta.appendChild(imagen);
          tarjeta.appendChild(titulo);
          tarjeta.appendChild(precio);
          tarjeta.appendChild(btnAgregar);

          contenedor.appendChild(tarjeta);
        }
      })
      .catch(err => console.error("Error al cargar productos: ", err));
  };

  if (document.querySelector(".productos-grid")) {
    renderizarProductos();
  }

  actualizarCantidadCarritoEnHeader();
});



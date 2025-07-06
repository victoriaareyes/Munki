const menuHamburguesa = document.getElementById("menu-hamburguesa");
  const nav = document.querySelector("nav");

  menuHamburguesa.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
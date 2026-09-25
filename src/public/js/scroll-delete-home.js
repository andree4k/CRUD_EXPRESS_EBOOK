//guarda la posicion del scroll vertical en el local storage, lo usare al momento de eliminar un libro
export function saveScrollPosition() {
  //window.scrollY -> Devuelve la cantidad de pixeles q la web se ha desplazado verticalmente, cero si esta al principio de la página
  const scrollPosition = window.scrollY;   
  // ->localStorage: es una web storage API, que permite guardar datos en el navegador web de forma permanente
  localStorage.setItem("scrollPosition", scrollPosition);   
}

//cada que cargue el Home, preguntara si hay un valor en el localStorage y si lo hay el scroll-Y se ubicara en esa posición (esto ocurrirá justamente al eliminar cualquier libro)
const scrollPosition = localStorage.getItem("scrollPosition");
if (scrollPosition !== null) {
  // ->window.scrollTo() sirve para mover el scroll de la página a una posición específica.
  // window.scrollTo(0, parseInt(scrollPosition)); 
  window.scrollTo({
    top: parseInt(scrollPosition), //top = Y | left = X
    behavior: "smooth"
  });

  //-> borra el correspondiente par clave-valor del local storage
  localStorage.removeItem("scrollPosition");
  //importante: debo ejecutar la función saveScrollPosition solo cuando confirme la eliminacion no cuando le de clic al enlace OJAL
}

// opcion2->"exponer" la función en el ámbito global (window)
//window.saveScrollPosition = saveScrollPosition


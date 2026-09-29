// uso cada que creo o actualizo un libro -> me posiciona la ventana sobre el libro
const urlParams = new URLSearchParams(window.location.search);
const queryBookId = urlParams.get("parameter"); // get-> Obtiene el valor del primer parámetro con esa clave.
if (queryBookId) {
  const cardBookElement = document.getElementById(`bookId-${queryBookId}`);
  if (cardBookElement)
    //scrollIntoView -> hace que la página desplace el scroll hasta que el elemento sea visible en la pantalla
    cardBookElement.scrollIntoView({ behavior: "smooth", block: "center" });

    // Elimina la query string de la URL sin recargar la página
    const url = new URL(window.location);
    url.search = ""; // Limpia la query string
    window.history.replaceState({}, document.title, url.pathname);

    //added 29.06.2026 lógica para animar la pluma del libro en cuestion
    // console.log(cardBookElement.children[2].querySelector('.author__feather'));
    //console.log(cardBookElement.children[2].firstElementChild);
    //cardBookElement.children[2].firstElementChild.classList.add('feather--spin')
    const currentFeather = cardBookElement.children[2].firstElementChild
    currentFeather.classList.add('feather--spin')
    //animationend: detecta exactamente el momento en que termina una animación de CSS en un elemento
    currentFeather.addEventListener("animationend", () => {
        currentFeather.classList.remove("feather--spin");
    });

    /* el timing del scroll y la animacion de la pluma se soluciona usando indices para mostrar parte de los items y no todo de golpe */
    
}

 /*<script>
    // lo uso cada que guardo o creo un nuevo libro
    document.addEventListener('DOMContentLoaded', () => {
      //->URLSearchParams: es una web API proporcionada por el entorno que permite leer, modificar y crear la cadena de consulta (query string) de una URL. Permite trabajar con datos en los parámetros de consulta de la URL.
      const urlParams = new URLSearchParams(window.location.search)
      // console.log(urlParams);
      // for (const key of urlParams.keys()) {
      //   console.log(key);
      // }
      if (urlParams.has('flag')){
        window.scroll({
          top: document.body.scrollHeight,
          behavior: "smooth"
        })
      }     
      //-> document.body.scrollHeight: devuelve la altura total del contenido de la etiqueta <body> en píxeles, incluyendo la parte que no es visible debido a que está oculta por desbordamiento o requiere desplazamiento vertical.
    })
  </script>*/
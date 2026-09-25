import { saveScrollPosition } from './scroll-delete-home.js'

const deleteLinks = document.querySelectorAll('.card__links--delete');
const modal = document.querySelector('.modal');
const cancelButton = document.querySelector('.modal__cancel');
const confirmButton = document.querySelector('.modal__confirm');

let deleteUrl = '';

//EL RECORRIDO SE HARA UNA SOLA VEZ, y a cada deleteLink se le asociara su eventListener
deleteLinks.forEach(deleteLink => {
  // console.log(deleteLink);
  deleteLink.addEventListener('click', event => {
    event.preventDefault();
    deleteUrl = deleteLink.href;
    modal.style.display = 'flex';
  });
});

cancelButton.addEventListener('click', () => {
  modal.style.display = 'none';
  deleteUrl = '';
});

confirmButton.addEventListener('click', () => {
  saveScrollPosition() 
  window.location.href = deleteUrl; 
  //redirecciona y recarga la página porque así lo definí en esa ruta por ende deleteUrl nuevamente se inicializa en ''
});

//cierra el modal al dar clic por fuera del modal
modal.addEventListener('click', (event) => {  
  if (event.target === modal) {
    modal.style.display = 'none';
    deleteUrl = '';//puede prescindir
  }
});

/* este funciona bien y no requiere crear un modal desde html (confirm), pero no se ve muy bien no se puede estilizar*/
// const deleteLinks = document.querySelectorAll('.card__links--delete')
// deleteLinks.forEach( deleteLink => {
//   deleteLink.addEventListener('click', (event) => {
//     const confirmation = confirm("¿Estás seguro de que quieres eliminar este elemento?");
//     if(!confirmation){
//       event.preventDefault();
//     }
//   })
// }) 

















/* este funciona bien y no requiere crear un modal desde html, pero no se ve muy bien no se puede estilizar*/

// const deleteLinks = document.querySelectorAll('.card__links--delete')
// deleteLinks.forEach( deleteLink => {
//   deleteLink.addEventListener('click', (event) => {
//     const confirmation = confirm("¿Estás seguro de que quieres eliminar este elemento?");
//     if(!confirmation){
//       event.preventDefault();
//     }
//   })
// })           04.09.2026 a
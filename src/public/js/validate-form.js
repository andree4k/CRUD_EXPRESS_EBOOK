const _form = document.querySelector(".form");
const _title = document.getElementById("title");
const _author = document.getElementById("author");
const _image = document.getElementById("image");

const evaluate = (input, maxNumChar, fieldURL) => {
  if (fieldURL != "url") {
    return validarCampo(input, maxNumChar); //true o false
  } else { //campo image -> url
    return validarCampo(input, maxNumChar)
      ? evaluateRegularExpression(input)
      : false;
  }
};

function validarCampo(input, maxNumChars) {
  let flag = false;
  let numberCharartersInput = input.value.trim().length;
  switch (true) {
    case numberCharartersInput === 0:
      input.classList.add("field-invalid")
      input.nextElementSibling.classList.add("message-error");
      input.nextElementSibling.innerHTML = `<em>${input.name} is required</em>`;
      // input.nextElementSibling.innerHTML = `<em>el campo ${input.name} es requerido</em>`
      break;
    case numberCharartersInput > maxNumChars:
      input.classList.add("field-invalid")
      input.nextElementSibling.classList.add("message-error");
      input.nextElementSibling.innerHTML = `<em>${input.name} cannot exceed ${maxNumChars} characters</em>`;
      // input.nextElementSibling.innerHTML = `<em>el campo ${input.name} no debe exceder los ${maxNumChars} caracteres</em>`
      break;
    default: //numberCharartersInput > 0 && numberCharartersInput <= maxNumChars
      input.classList.remove("field-invalid")
      input.nextElementSibling.innerText = "";
      flag = true;
  }
  return flag;
}

function evaluateRegularExpression(input) {
  let flag = false;
  const elementSpan = input.parentElement.querySelector("span");
  let inputValue = input.value.trim();
  const regExpURL = /^https?:\/\/[a-zA-Z0-9-_.~!*();:@&=+$,/?%#]+$/;
  if (regExpURL.test(inputValue)) { // url válida
    elementSpan.innerText = "";
    input.classList.remove("field-invalid");
    flag = true;
  } else { // url no válida
    input.classList.add("field-invalid");
    elementSpan.classList.add("message-error");
    elementSpan.innerHTML = `<em>${input.name} must be a valid URL</em>`;
    // elementSpan.innerHTML = `<em>el campo image debe contener una URL</em>`;
  }
  return flag;
}

_form.addEventListener("submit", (e) => {
  const flagTitle = evaluate(_title, 51)
  const flagAuthor = evaluate(_author,45)
  const flagImage = evaluate(_image, 180, "url")
  //  console.log(e.target);
  if(!flagTitle || !flagAuthor || !flagImage){
    e.preventDefault();
  } 
  // e.preventDefault();
});
//puta hermosa vida 😉👈

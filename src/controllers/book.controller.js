import fs from "fs/promises";
import { v4 as uuidv4 } from 'uuid';

const BOOKS_PATH = "./src/data/books.json";


async function getData() {
  const dataFromFile = await fs.readFile(BOOKS_PATH, "utf-8");
  return dataFromFile ? JSON.parse(dataFromFile) : []; // dataFromFile !== "" ? JSON.parse(dataFromFile) : []
}
async function saveData(bookList){
  const data = JSON.stringify(bookList)
  await fs.writeFile(BOOKS_PATH, data)
}

// validará los datos de los campos del formulario - (server side)
function validateDataForm(objetoReqBody) {
  let reply = {}
  let {title, author, image} = objetoReqBody
  title = title.trim().toUpperCase()
  author = author.trim()
  image = image.trim()
  if(title.length && title.length <= 51 && author.length && author.length <= 45 && image.length && image.length <= 180){
    const regExpURL = /^https?:\/\/[a-zA-Z0-9-_.~!*();:@&=+$,/?%#]+$/;
     if(regExpURL.test(image)){ //datos correctos
      reply.flag = true 
      author = formatAuthorName(author)
      reply.body = {title, author, image}    
     } else{
      reply.flag = false
      reply.message = "No saltes mi validación. El campo image debe contener una URL."
     }
  } else{
    reply.flag = false
    reply.message = "No saltes mi validación. Todos los campos son requeridos y no deben excederse en caracteres."
  }
  return reply
}

// CAPITALIZAR NOMBRE
function formatAuthorName(name) {
  return name
    //.trim()
    .toLowerCase()
    .split(/\s+/)//espacios vacíos
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export const getBooks = async (req, res, next) => {
  try {
    const bookList = await getData();
    res.render("Home", { bookList });
  } catch (error) {
    next(error)
  }
};

export const showFormNewBook = (req, res) => {
  res.render('NewBook')
}
/*
// sin validacion
export const saveBook = async(req, res, next) => {
  try {
    const bookList = await getData()
    bookList.push({id:uuidv4(),...req.body})
    await saveData(bookList)
    res.redirect('/')
  } catch (error) {
    next(error)
  }
}
*/
//con validacion
export const saveBook = async(req, res, next) => {
  try {  
    const result = validateDataForm(req.body)
    if(result.flag) { //todo válido
      const bookList = await getData()
      const book = {id:uuidv4(), ...result.body}
      bookList.push(book)
      // bookList.push({id:uuidv4(), ...result.body})
      await saveData(bookList)
      res.redirect(`/?parameter=${book.id}`)//flag para posicionar scroll
    } else {
      res.status(400).json({message: result.message}) 
    }        
  } catch (error) {
    next(error)
  }
}

export const deleteBook = async(req, res, next) => {
  try {
    const bookList = await getData()
    const id = req.params.id
    const index = bookList.findIndex( book => book.id === id )
    if(index === -1) return res.status(404).json({ message: "Book not found" });
    
    bookList.splice(index, 1) //si llega aqui, elimina el libro
    await saveData(bookList)
    res.redirect('/')
  } catch (error) {
    next(error)
  }
}

export const showFormEdit = async(req, res, next) => {
  try {
    const bookList = await getData()
    const id = req.params.id
    // busco el libro que se actualizará
    const book = bookList.find( book => book.id === id)
    if(!book) return res.status(404).json({ message: "Book not found" });

    // si llega aqui se renderiza el formulario de edición de libro
    res.render('EditBook', {book})
  } catch (error) {
    next(error)
  }
}

export const updateBook = async(req, res, next) =>{
  try {
    const result = validateDataForm(req.body)
    if(result.flag){ //datos del form correctos 
      const bookList = await getData()
      const id = req.params.id
      //uso el some para verificar si existe el libro con dicho id, ya que puedo modificar manualmente el id desde el HTML del navegador
      const exists = bookList.some( book => book.id === id )
      
      if(!exists) return res.status(404).json({message: 'Book not found'})

      const updatedBookList = bookList.map( book => { //map no modifica el arreglo original, crea un nuevo arreglo
        return book.id !== id ? book: {id, ...result.body} 
        //return book.id !== id ? book: {id, ...req.body} 
      })
      await saveData(updatedBookList)
      res.redirect(`/?parameter=${id}`)
    } else{
      res.status(400).json({message: result.message})
    }
  } catch (error) {
    next(error)
  }
}

/* sin validacion del formulario
export const updateBook = async(req, res, next) =>{
  try {
    const bookList = await getData()
    const id = req.params.id
    //uso el some para verificar si existe el libro con dicho id, ya que puedo modificar manualmente el id desde el HTML del navegador
    const exists = bookList.some( book => book.id === id )
    
    if(!exists) return res.status(404).json({message: 'Book not found'})

    const updatedBookList = bookList.map( book => { //map no modifica el arreglo original, crea un nuevo arreglo
      return book.id !== id ? book: {id, ...req.body} 
    })
    await saveData(updatedBookList)
    res.redirect('/')
  } catch (error) {
    next(error)
  }
}
*/
/*
obs.
Si usas Express 5, Express captura automáticamente las excepciones y las envía al middleware de errores.
Para Express 5, en las rutas no pondría un try/catch si el único objetivo es hacer next(error). Sería código redundante. 
Express 4 no captura automáticamente los errores de funciones async.
Para Express 4 sí es obligatorio el try catch.

Si solo voy a capturar y propagar el error no es recomendable usar try catch,
pero si voy a capturar y manejar el error sí es recomendable usar try catch, notar esa diferencia.

En mi caso aunque use express 5 y solo capture y propague el error usare try catch.
 */
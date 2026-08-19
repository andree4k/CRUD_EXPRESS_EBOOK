import { Router } from 'express'

import {getBooks, showFormNewBook, saveBook, deleteBook, showFormEdit, updateBook} from './../controllers/book.controller.js'

const router = Router()


// MOSTRAR LOS LIBROS
router.get('/', getBooks)

// MOSTRAR EL FORMULARIO PARA AGREGAR OTRO LIBRO
router.get('/newBook', showFormNewBook)

// GUARDA UN LIBRO
router.post('/newBook', saveBook)

// ELIMINA UN LIBRO
router.get('/delete/:id', deleteBook )

// RENDERIZA EL FORMULARIO PARA ACTUALIZAR UN LIBRO
router.get('/update/:id', showFormEdit)

// ACTUALIZA UN LIBRO
router.post('/update/:id', updateBook)

//june 28 bro R

export default router



import asyncHandler from 'express-async-handler'
import Book from '../models/bookModels.js'

// @desc  Get All Books
// METHOD GET /api/books
// @access Public
const GetBooks = asyncHandler(async(req, res) => {
  res.send("Get All Books")
})

// @desc  Create New Books
// METHOD POST /api/books
// @access Public
const CreateNewBook = asyncHandler(async(req, res) => {
  console.log(req.body)

  res.send("sjfos")
  
  // const { title, author, publishYear, category, description, url } = req.body;
  // const newBook = new Book({
  //   title,
  //   author,
  //   publishYear,
  //   description,
  //   category, 
  //   url
  // })
  // const bookJson = await newBook.save();
  // if(bookJson) res.json(newBook);
  // else throw new Error('Server Error');
})

// @desc  Get Book Detail
// METHOD GET /api/books/:id
// @access Public
const GetBookDetail = asyncHandler(async(req, res) => {
  res.send("Get Book Detail")
})

// @desc  Update Book
// METHOD PUT /api/books/:id
// @access Public
const UpdateBook = asyncHandler(async(req, res) => {
  res.send("Update Book")
})

// @desc  Delete Book
// METHOD DELETE /api/books/:id
// @access Public
const DeleteBook = asyncHandler(async(req, res) => {
  res.send("Delete Book")
})

export {
  GetBooks,
  CreateNewBook,
  GetBookDetail,
  UpdateBook,
  DeleteBook
}



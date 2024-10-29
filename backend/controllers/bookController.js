import asyncHandler from 'express-async-handler'

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
  res.send("Create New Books")
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



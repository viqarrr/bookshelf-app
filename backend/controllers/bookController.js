import asyncHandler from 'express-async-handler'
import Book from '../models/bookModels.js'

// @desc  Get All Books
// METHOD GET /api/books
// @access Public
const GetBooks = asyncHandler(async(req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const category = req.query.category;
  const skip = (page-1)*limit;
  
  let books
  category ? books = await Book.find({category}).sort({createdAt: -1}).skip(skip).limit(limit) : books = await Book.find().sort({createdAt: -1}).skip(skip).limit(limit)
  
  let length = await Book.countDocuments()
  if(books){
    res.json({
      totalData: length,
      page,
      limit,
      data: books
    });
  }
  else throw new Error('Server Error');
})

// @desc  Create New Books
// METHOD POST /api/books
// @access Public
const CreateNewBook = asyncHandler(async(req, res) => {
  const { title, author, publishYear, category, description, url } = req.body;
  const newBook = new Book({
    title,
    author,
    publishYear,
    description,
    category, 
    url
  })
  const bookJson = await newBook.save();
  if(bookJson) res.json(newBook);
  else throw new Error('Server Error');
})

// @desc  Get Book Detail
// METHOD GET /api/books/:id
// @access Public
const GetBookDetail = asyncHandler(async(req, res) => {
  const book = await Book.findOne({ _id: req.params.id })
  if(!book) throw new Error('Server Error');
  res.json(book);
})

// @desc  Update Book
// METHOD PUT /api/books/:id
// @access Public
const UpdateBook = asyncHandler(async(req, res) => {
  const book = await Book.findById({ _id: req.params.id })
  if(!book) throw new Error('Book Not Found');
  const { title, author, publishYear, category, description, url } = req.body
  book.title = title
  book.author = author
  book.description = description
  book.publishYear = publishYear
  book.category = category
  book.url = url
  const updatedBook = await book.save()
  if(updatedBook){
    res.json(updatedBook)
  }
  else throw new Error('Server Error');
})

// @desc  Delete Book
// METHOD DELETE /api/books/:id
// @access Public
const DeleteBook = asyncHandler(async(req, res) => {
  const book = await Book.findByIdAndDelete({ _id: req.params.id })
  if(!book) throw new Error('Book Not Found');
  
  res.send("Book Deleted")
})

export {
  GetBooks,
  CreateNewBook,
  GetBookDetail,
  UpdateBook,
  DeleteBook
}



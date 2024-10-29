import express from 'express'
import { GetBooks, CreateNewBook, GetBookDetail, UpdateBook, DeleteBook } from '../controllers/bookController.js'
const router = express()

router.route('/').get(GetBooks).post(CreateNewBook)
router.route('/:id').get(GetBookDetail).put(UpdateBook).delete(DeleteBook)

export default router
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import { NotFound, ErrorHandler } from './middleware/errorMiddleware.js';
import bookRoutes from './routes/bookRoutes.js'
import connectDB from './app/db.js'

dotenv.config();
connectDB()
const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
}));

app.get('/', (req, res) => res.send("Hello World!"));
app.use('/api/books', bookRoutes)

app.use(NotFound);
app.use(ErrorHandler);


app.listen(port, () => console.log(`Server is stared on port ${port}`))

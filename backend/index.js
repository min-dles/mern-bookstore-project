import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookModel.js';

const app = express();

// Middleware for parsing req body:
app.use(express.json());

app.get('/', (req, res) => {
  console.log('Here is a request:', req);
  return res.status(200).send('MERN Stack Tutorial - Server is Connected');
});

// HTTP route to save a new book, with some data validation: 
app.post('/books', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({
        message: 'Please provide all required fields: title, author, and year published',
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// HTTP route to GET all books from db:
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json(books);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to DB');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
    console.log('DB and server are both running!');
  })
  .catch((error) => {
    console.log('error w mongoose', error);
  });
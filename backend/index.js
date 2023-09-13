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
        message: 'Please provide all required fields: title, author, and publishYear',
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
    res.status(500).send({ message: error.message });
  }
});

// HTTP route to GET all books from db:
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// HTTP route to GET one book by id from db:
app.get('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (book === null) {
      return res.status(404).send({ message: 'book not found' });
    }
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// HTTP route to update (PUT) a book by id in db:
app.put('/books/:id', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({
        message: 'Please be sure to send ALL required fields: title, author, publishYear'
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).send({ message: 'Book updated successfully.' });

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// HTTP route to DELETE book by id:
app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Err 404: Book not found' });
    }
    return res.status(200).send({ message: 'Book was deleted from database.' });
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
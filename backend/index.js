import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/books.router.js';

const app = express();

// Middleware for parsing req body:
app.use(express.json());

app.get('/', (req, res) => {
  console.log('Here is a request:', req);
  return res.status(200).send('MERN Stack Tutorial - Server is Connected');
});

app.use('/books', booksRoute);

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
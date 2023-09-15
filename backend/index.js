import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/books.router.js';
import cors from 'cors';

const app = express();

// Middleware for parsing req body:
app.use(express.json());

// Middleware for handling CORS Policy: two methods 
//   Option 1: Allow All Origins with the Default or cors(*)
//   - this method is not very secure and therefore not recommended
//    EXAMPLE: app.use(cors(*));
// Option 2: Define appropriate access lists with server response headers
// that include the following:
//   1. Access-Control-Allow-Methods
//   2. Access-Control-Allow-Headers
//   3. Access-Control-Allow-Origin 
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  })
);

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
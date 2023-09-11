import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get('/', (request, response) => {
  console.log('Here is a request:', request);
  return response.status(200).send('MERN Stack Tutorial - Server is Connected');
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
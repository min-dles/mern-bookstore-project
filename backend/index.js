import express from "express";
import { PORT } from "./config.js";

const app = express();

app.get('/', (request, response) => {
  console.log('Here is a request:', request);
  return response.status(200).send('MERN Stack Tutorial - Server is Connected');
});

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});
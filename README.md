# MERN Bookstore

In this repo, you will see code base for a backend and frontend using MangoDB, ExpressJS, ReactJS, and NodeJS technologies. 

## Starting the Application

To locally host and run this application, follow these steps:

1. Fork and clone this repository to your GitHub account and local files where you'd like this stored.
2. In your terminal, be sure to run `npm install`

## Topics Learned: CORS Policy

In building this application, I learned about CORS policy:

- CORS = Cross-Origin Resource Sharing 

> CORS defines a way for client web applications that are loaded in one domain to interact with resources in a different domain. CORS allows the client browser to check with third-party servers if the API request is authorized before any data transfers. 

More information about CORS can be found at *[AWS](https://aws.amazon.com/what-is/cross-origin-resource-sharing/)*. 

The server can check Origins, Methods, and Headers; then allow or deny the request
NodeJS offers some solutions to this problem.

## React

A few options to use ReactJS:

- CRA `create react app`
- instead, used Vite in this project `npm create vite@latest`
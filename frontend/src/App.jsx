import React from "react";
import { Routes, Route } from 'react-router-dom';

// import all the route details from pages folder:
import BookDetails from "./pages/BookDetails";
import CreateBook from "./pages/CreateBook";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<BookDetails />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    </Routes>
  )
};

export default App;
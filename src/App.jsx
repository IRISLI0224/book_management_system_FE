import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetailPage from "./pages/BookDetailPage";
import UserDetailPage from "./pages/UserDetailPage/UserDetailPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import BooksPage from "./pages/BooksPage";
import NoPage from "./pages/NoPage";

export const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
        <Route path="/user/:id" element={<UserDetailPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </React.Fragment>
  );
};
export default App;

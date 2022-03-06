//All API about user
import backendApi from "./backendApi";

const API_GET_BOOK = "/books";
const API_GET_ALL_BOOKS = "/books";
const API_CREATE_BOOK = "/create/book";
const API_UPDATE_BOOK = "/books";
const API_DELETE_BOOK = "/books";
const API_BORROW_BOOK = "/books/borrow";
const API_RECENT_BOOKS = "/recent/books";

export const getAllBooks = async () => {
  const url = `${API_GET_ALL_BOOKS}`;
  try {
    const response = await backendApi.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getRecentBooks = async () => {
  const url = `${API_RECENT_BOOKS}`;
  try {
    const response = await backendApi.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};


export const getBookById = async (id) => {
  const url = `${API_GET_BOOK}/${id}`;
  try {
    const response = await backendApi.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
    return ('Cannot find the book');
  }
};

export const CreateBook = async (name, author, categories) => {
  const data = {
    name,
    author,
    categories,
  };
  try {
    const res = await backendApi
      .post(API_CREATE_BOOK, data)
      .catch(function (e) {
        if (e.response) {
          return e.response;
        }
      });
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const UpdateBookById = async (id, name, author, categories) => {
  const data = {
    name,
    author,
    categories,
  };
  try {
    const res = await backendApi
      .put(`${API_UPDATE_BOOK}/${id}`, data)
      .catch(function (e) {
        if (e.response) {
          return e.response;
        }
      });
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const BorrowBook = async (bookid, userid) => {
  const url = `${API_BORROW_BOOK}/${bookid}/${userid}`;
  try {
    const response = await backendApi.put(url);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const DeleteBook = async (id) => {
  const url = `${API_DELETE_BOOK}/${id}`;
  try {
    const response = await backendApi.delete(url);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

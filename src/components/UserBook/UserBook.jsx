import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../Button";
import Avatar from "../../assets/img/avatar.png";
import { Link } from "react-router-dom";
import { DeleteUser } from "../../config/user";
import { getAllBooks } from "../../config/book";
import { Modal } from "antd";
import "antd/dist/antd.css";
import BorrowedBookInfo from "../BorrowedBookInfo";
import CustomModal from "../CustomModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {appendData} from '../../redux/action'

const moment = require("moment");

const Container = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 60px 0px;
  background: #f1e6dc;
  justify-content: space-around;
  @media (max-width: 768px) {
    justify-content: space-around;
    flex-direction: column;
  }
`;
const Text = styled.div`
  color: #5c4c4c;
  font-size: 20px;
`;

const BorrowedBooks = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    padding: 20px 0px;
    background: #f1e6dc;
    justify-content: space-around;
    flex-direction: column;
}
`;

const BookInStock = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 20px 0px;
  background: #f1e6dc;
  justify-content: space-around;
  flex-direction: column;
`;

const UserBook = ({ userid, Book }) => {
  const url = "/user/" + userid;
  const [APIMessage, setAPIMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [allBook, setAllBook] = useState();
  let dispatch = useDispatch();
  let state = useSelector((state) => state);

  useEffect(() => {
    initialData()
  }, []);

  useEffect(() => {
    handleDispatch();
  }, [allBook,Book]);

  const getBooks = async () => {
    const books = await getAllBooks();
    if (books) {
      setAllBook(books);    
    }
  };

  const initialData=async()=>{
    await getBooks();
    handleDispatch();
  }

  const handleDispatch = () => {
    dispatch(appendData({
      BorrowedBooks: Book,
      InStockBooks: allBook,
    }));
  };



  const Redirection = () => {
    setModalVisible(false);
    //After delete, back to all user page
    if (
      APIMessage === "Delete user successfully!" ||
      APIMessage === "Cannot find the user, try again later."
    ) {
      window.location.href = "/users";
    }
  };

  return (
    <Container>
      <BorrowedBooks>
        <Text>Borrowed Books</Text>
        {state?.BorrowedBooks?.map((book, key) => {
          return <BorrowedBookInfo Book={book} userId={userid} />;
        })}
      </BorrowedBooks>
      <BookInStock>
        <Text>Available Books</Text>
        {state?.InStockBooks?.map((book, key) => {
          if (!book?.borrowed)
            return (
              <BorrowedBookInfo Book={book} Borrow="true" userId={userid} />
            );
        })}
      </BookInStock>
    </Container>
  );
};

export default UserBook;

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
const moment = require("moment");

const Container = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 60px 0px;
  background: #f1e6dc;
  justify-content: space-around;
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

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const books = await getAllBooks();
    if (books) setAllBook(books);
  };

  const handleDelete = async () => {
    const user = await DeleteUser(userid);
    if (user === "user deleted") {
      setAPIMessage("Delete user successfully!");
      setModalVisible(true);
    } else {
      setAPIMessage("Something Wrong, pleas try later.");
      setModalVisible(true);
    }
  };

  const Redirection = () => {
    setModalVisible(false);
    //After delete, back to all user page
    if (
      APIMessage === "Delete user successfully!" ||
      APIMessage === "Cannot find the user, try again later."
    ) {
      JavaScripts:window.location.href = "/#/users";
    }
  };

  return (
    <Container>
      <BorrowedBooks>
        <Text>Borrowed Books</Text>
        {Book?.map((book, key) => {
          return <BorrowedBookInfo Book={book} userId={userid}/>;
        })}
      </BorrowedBooks>
      <BookInStock>
        <Text>Available Books</Text>
        {allBook?.map((book, key) => {
          if (!book?.borrowed)
            return <BorrowedBookInfo Book={book} Borrow="true" userId={userid}/>;
        })}
      </BookInStock>
    </Container>
  );
};

export default UserBook;

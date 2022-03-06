import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../Button";
import BookCoverImg from "../../assets/img/bookCover1.png";
import { Link } from "react-router-dom";
import { BorrowBook, ReturnBook } from "../../config/book";
import "antd/dist/antd.css";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { appendData } from "../../redux/action";

const Container = styled.div`
  box-shadow: rgb(0 0 0 / 20%) 0px 0.0625rem 0.1875rem 0px;
  border-radius: 0.1875rem;
  width: 80%;
  margin-left: 10%;
  height: 90px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  padding: 15px 0px;
  z-index: 0;
  background: #d6b8b07f;
  margin-top: 15px;
  display: flex;
  @media (max-width: 768px) {
    width: 90%;
    margin-left: 5%;
    height: 150px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
  }
`;
const Text = styled.div`
  color: #5c4c4c;
`;

const BookCover = styled.img`
  height: 70px;
  width: auto;
  margin-left: 10px;
  @media (max-width: 768px) {
    display:none;
  }
`;

const InfoPanel = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ButtonPanel = styled.div`
  width: auto;
  margin-left: 10px;
  display: flex;
  align-items: center;
  margin-right: 20px;
  @media (max-width: 768px) {
    margin:auto;
  }
`;

const BorrowedBookInfo = ({ Book, Borrow, userId }) => {
  const url = "/book/" + Book?._id;
  const [modalVisible, setModalVisible] = useState(false);
  const [APIMessage, setAPIMessage] = useState("");
  let dispatch = useDispatch();
  let state = useSelector((state) => state);

  const handleBorrow = async () => {
    const book = await BorrowBook(Book?._id, userId);
    if (book === "book borrowed") {
      const Borrow = state?.BorrowedBooks.slice();
      const InStock = state?.InStockBooks.slice();
      delete InStock[InStock.indexOf(Book)];
      Borrow.push(Book);
      dispatch(
        appendData({
          BorrowedBooks: Borrow,
          InStockBooks: InStock,
        })
      );
      setAPIMessage("Borrow book successfully!");
      setModalVisible(true);
    } else {
      setAPIMessage("Something Wrong, pleas try later.");
      setModalVisible(true);
    }
  };

  const handleReturn = async () => {
    const book = await ReturnBook(Book?._id, userId);
    if (book === "book returned") {
      const Borrow = state?.BorrowedBooks.slice();
      const InStock = state?.InStockBooks.slice();
      let NewBook =Book;
      NewBook.borrowed=false;
      delete Borrow[Borrow.indexOf(Book)];
      InStock.push(NewBook);
      dispatch(
        appendData({
          BorrowedBooks: Borrow,
          InStockBooks: InStock,
        })
      );
      setAPIMessage("Return book successfully!");
      setModalVisible(true);
    } else {
      setAPIMessage("Something Wrong, pleas try later.");
      setModalVisible(true);
    }
  };

  const Redirection = () => {
    setModalVisible(false);
    //After delete, back to all books page
    if (
      APIMessage === "Borrow book successfully!" ||
      APIMessage === "Return book successfully!"
    ) {
      //window.location.reload();
    }
  };

  return (
    <Container>
      <Modal
        visible={modalVisible}
        footer={[
          <div style={{ marginLeft: "200px" }}>
            <Button key="OK" onClick={Redirection}>
              &nbsp;&nbsp;OK&nbsp;&nbsp;
            </Button>
          </div>,
        ]}
      >
        <p></p>
        <p>{APIMessage}</p>
        <p></p>
      </Modal>
      <BookCover src={BookCoverImg} />
      <InfoPanel>
        <div>
          <Text>{Book?.name}</Text>
          <Text>Author: {Book?.author}</Text>
        </div>
        <div>
          <Text>Categories: {Book?.categories}</Text>
          {Book?.borrowed ? (
            <Text>Status: Borrowed</Text>
          ) : (
            <Text>Status: In stock</Text>
          )}
        </div>
      </InfoPanel>
      <ButtonPanel>
        <ButtonPanel>
          {Borrow ? (
            <Button onClick={handleBorrow}>Borrow</Button>
          ) : (
            <Button onClick={handleReturn}>Return Book</Button>
          )}
        </ButtonPanel>
      </ButtonPanel>
    </Container>
  );
};

export default BorrowedBookInfo;

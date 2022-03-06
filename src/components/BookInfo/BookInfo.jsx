import React,{useState} from "react";
import styled from "styled-components";
import { Button } from "../Button";
import BookCoverImg from "../../assets/img/bookCover1.png";
import { Link } from "react-router-dom";
import {  DeleteBook } from "../../config/book";
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
    flex-wrap: wrap;
    width: 95%;
    margin-left: 2.5%;
    height: 150px;
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
    height: 40px;
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

const BookInfo = ({ recent, Book }) => {
  const url = "/book/" + Book?._id;
  const [modalVisible, setModalVisible] = useState(false);
  const [APIMessage, setAPIMessage] = useState("");
  let dispatch = useDispatch();
  let state = useSelector((state) => state);

  const handleDelete = async () => {
    const book = await DeleteBook(Book?._id);
    if (book === "book deleted") {
      const Books = state?.AllBooks.slice();
      delete Books[Books.indexOf(Book)];
      dispatch(
        appendData({
          AllBooks: Books,
        })
      );
    } 
  };



  const displayModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };


  return (
    <Container>
      <Modal
        visible={modalVisible}
        footer={[
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button key="Cancel" onClick={handleCancel}>
              &nbsp;&nbsp;Cancel&nbsp;&nbsp;
            </Button>
            <Button key="OK" onClick={handleDelete}>
              &nbsp;&nbsp;OK&nbsp;&nbsp;
            </Button>
          </div>,
        ]}
      >
        <br/>
        <p>Do you want to delete the book?</p>
        <br/>
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
        {recent ? (
          <Link to={url} style={{ textDecoration: "none" }}>
            <Button>Details</Button>
          </Link>
        ) : (
          <ButtonPanel>
            <Link to={url} style={{ textDecoration: "none" }}>
              <Button>&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
            </Link>
            <div>&nbsp;&nbsp;&nbsp;</div>
            <Button onClick={displayModal}>Delete</Button>
          </ButtonPanel>
        )}
      </ButtonPanel>
    </Container>
  );
};

export default BookInfo;

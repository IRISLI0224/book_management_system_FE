import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/Button";
import BookCoverImg from "../../assets/img/bookCover1.png";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams, useLocation } from "react-router-dom";
import {
  UpdateBookById,
  getBookById,
  DeleteBook,
  CreateBook,
  ReturnBook,
} from "../../config/book";
import { Modal } from "antd";
import InputErrorMsg from "../../components/InputErrorMsg";
import "antd/dist/antd.css";

const Container = styled.div`
  height: auto;
  margin: auto;
  text-align: center;
  width: 100%;
  background-color: #ffffff;
`;

const MainPanel = styled.div`
  padding: 5px;
  height: auto;
  margin: auto;
  text-align: center;
  width: 95%;
  border-radius: 10px;
`;

const Form = styled.div`
  padding: 5px;
  height: 400px;
  margin: auto;
  text-align: center;
  border-radius: 10px;
  background: #f0edeb;
`;

const Text = styled.div`
  color: #5c4c4c;
  font-size: 20px;
`;

const BookCover = styled.img`
  height: 200px;
  width: auto;
  margin-top: 50px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Input = styled.input`
  margin-left: 20px;
  opacity: 0.7;
  @media (max-width: 768px) {
    width: 50%;
    margin-left: 10px;
  }
`;

const InputPanel = styled.div`
  margin: auto;
  justify-content: center;
  padding-top: 20px;
  display: flex;
  margin-bottom: 5px;
`;

const Fields = styled.div`
  margin: auto;
  justify-content: center;
  padding: 20px;
  display: flex;
  margin-bottom: 10px;
  width: 60%;
`;

const InputFields = styled.div`
  margin: auto;
  padding: 10px;
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
`;

const ButtonPanel = styled.div`
  margin: auto;
  padding: 20px;
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
`;

const TopButtonPanel = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 60px 0px;
  background: #f1e6dc;
  justify-content: space-around;
`;

const AddButtonPanel = styled.div`
    display: flex;
    width: 100%;
    height: 20px;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
}
`;

const BookDetailPage = () => {
  const [borrowed, setBorrowed] = useState(false);
  const [name, setName] = useState();
  const [author, setAuthor] = useState();
  const [categories, setCategories] = useState("Horror");
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState();
  const [userID, setUserID] = useState();
  const [nameError, setNameError] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  const [APIMessage, setAPIMessage] = useState("");
  const [Id, setId] = useState(useParams().id);
  const path = useLocation().pathname;
  const [add, setAdd] = useState(false);

  useEffect(() => {
    if (path.indexOf("new") > 0) {
      //Add new
      setAdd(true);
    }
    //Edit
    else getBookInfo();
  }, []);

  const getBookInfo = async () => {
    const book = await getBookById(Id);
    if (typeof book !== "string") {
      const Data = book;
      setAuthor(Data?.author);
      setName(Data?.name);
      setCategories(Data?.categories);
      setBorrowed(Data?.borrowed);
      if (Data?.borrowed) {
        const user = Data?.user;
        setUser(user?.name);
        setUserID(user?._id);
      }
    } else {
      setAPIMessage("Cannot find the book, try again later.");
      setModalVisible(true);
    }
  };

  const handleOnBlur = (event) => {
    const { value, name } = event.target;
  };

  const handleDataChange = (event) => {
    const { value, name } = event.target;
    switch (name) {
      case "name": {
        setName(value);
        return "name";
      }
      case "author": {
        setAuthor(value);
        return "author";
      }
      case "categories": {
        setCategories(value);
        return "categories";
      }
      default:
        return "";
    }
  };

  const checkValues = () => {
    if (!name || name === "") {
      setNameError(true);
      return;
    } else {
      setNameError(false);
    }
    if (!author || author === "") {
      setAuthorError(true);
      return;
    } else {
      setAuthorError(false);
    }
    if (!nameError && !authorError)
      if (add) {
        AddNewBook();
      } else EditBook();
  };

  const handleSubmit = () => {
    checkValues();
  };

  const handleReturn = async () => {
    const book = await ReturnBook(Id, userID);
    if (book === "book returned") {
      setAPIMessage("Return book successfully!");
      setModalVisible(true);
    } else {
      setAPIMessage("Something Wrong, pleas try later.");
      setModalVisible(true);
    }
  };

  const handleDelete = async () => {
    const book = await DeleteBook(Id);
    if (book === "book deleted") {
      setAPIMessage("Delete book successfully!");
      setModalVisible(true);
    } else {
      setAPIMessage("Something Wrong, pleas try later.");
      setModalVisible(true);
    }
  };

  const EditBook = async () => {
    const book = await UpdateBookById(Id, name, author, categories);
    if (book.status == "200") {
      setAPIMessage("Edit book successfully");
      setModalVisible(true);
    } else if (book.status == "403") {
      setAPIMessage("Book already exists!");
      setModalVisible(true);
    } else {
      setAPIMessage("Something Wrong, pleas try later.");
      setModalVisible(true);
    }
  };

  const AddNewBook = async () => {
    const book = await CreateBook(name, author, categories);
    if (book.status == "201") {
      setId(book?.data?._id);
      setAPIMessage("Add book successfully!");
      setModalVisible(true);
    } else if (book.status == "403") {
      setAPIMessage("Book already exists!");
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
      APIMessage === "Delete book successfully!" ||
      APIMessage === "Cannot find the book, try again later."
    ) {
      JavaScripts: window.location.href = "/#/books";
    } else if (
      APIMessage === "Add book successfully!" ||
      APIMessage === "Return book successfully!"
    ) {
      JavaScripts: window.location.href = "/#/book/" + Id;
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
      <MainPanel>
        <Header />
        <TopButtonPanel>
          <Link to="/books" style={{ textDecoration: "none" }}>
            <Button>Back to all Books Page</Button>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button>Back to Homepage</Button>
          </Link>
        </TopButtonPanel>
        <Form>
          <br />
          <br />
          {add ? (
            <AddButtonPanel>
              <Text>Add new book</Text>
              <br />
              <Button onClick={handleSubmit}>
                &nbsp;&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;&nbsp;
              </Button>
            </AddButtonPanel>
          ) : (
            <Text>Book detail information</Text>
          )}

          <Fields>
            <BookCover src={BookCoverImg} />
            <InputFields>
              <br />
              <InputPanel>
                <div>Name:</div>
                <Input
                  name="name"
                  onChange={handleDataChange}
                  onBlur={handleOnBlur}
                  value={name}
                />
              </InputPanel>
              {nameError ? (
                <InputErrorMsg>Name can't be empty!</InputErrorMsg>
              ) : (
                <br />
              )}
              <br />
              <InputPanel>
                <div>Author:</div>
                <Input
                  name="author"
                  onChange={handleDataChange}
                  onBlur={handleOnBlur}
                  value={author}
                />
              </InputPanel>
              {authorError ? (
                <InputErrorMsg>Author can't be empty!</InputErrorMsg>
              ) : (
                <br />
              )}
              <InputPanel>
                <div>Categories:&nbsp;&nbsp;</div>
                <select
                  name="categories"
                  onChange={handleDataChange}
                  onBlur={handleOnBlur}
                  value={categories}
                >
                  <option value="Horror">Horror</option>
                  <option value="Drama">Drama</option>
                  <option value="Fiction">Fiction</option>
                </select>
              </InputPanel>
            </InputFields>
            {!add ? (
              <ButtonPanel>
                <InputPanel>
                  {borrowed ? (
                    <div>Status:&nbsp;&nbsp;Borrowed by {user} </div>
                  ) : (
                    <div>Status:&nbsp;&nbsp;In stock&nbsp;&nbsp;</div>
                  )}
                </InputPanel>

                {borrowed ? (
                  <Button onClick={handleReturn}>Return the book</Button>
                ) : (
                  <br />
                )}
                <br />
                <Button onClick={handleSubmit}>Submit</Button>
                <br />
                {!add ? <Button onClick={handleDelete}>Delete</Button> : null}
              </ButtonPanel>
            ) : null}
          </Fields>
        </Form>
        <Footer />
      </MainPanel>
    </Container>
  );
};
export default BookDetailPage;

import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/Button";
import BookCoverImg from "../../assets/img/bookCover1.png";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
  height: 350px;
  margin: auto;
  text-align: center;
  width: 100%;
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
  padding: 20px;
  display: flex;
  margin-bottom: 10px;
`;

const InputInnerPanel = styled.div`
  margin: auto;
  justify-content: center;
  padding: 20px;
  display: flex;
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

const BookDetailPage = () => {
  const [borrowed, setBorrowed] = useState(false);
  const [name, setName] = useState();
  const [author, setAuthor] = useState();
  const [categories, setCategories] = useState();

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

  const handleSubmit = () => {
    //test console
    console.log(name);
    console.log(author);
    console.log(categories);

  };

  return (
    <Container>
      <MainPanel>
        <Header />
        <Form>
          <Text>Book detail information</Text>
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
                />
              </InputPanel>
              <InputPanel>
                <div>Author:</div>
                <Input
                  name="author"
                  onChange={handleDataChange}
                  onBlur={handleOnBlur}
                />
              </InputPanel>
              <InputPanel>
                <div>Categories:&nbsp;&nbsp;</div>
                <select
                  name="categories"
                  onChange={handleDataChange}
                  onBlur={handleOnBlur}
                >
                  <option value="Horror">Horror</option>
                  <option value="Drama">Drama</option>
                  <option value="Fiction">Fiction</option>
                </select>
              </InputPanel>
            </InputFields>
            <ButtonPanel>
              <InputPanel>
                {borrowed ? (
                  <div>Status:&nbsp;&nbsp;Borrowed by User A </div>
                ) : (
                  <div>Status:&nbsp;&nbsp;In stock&nbsp;&nbsp;</div>
                )}
              </InputPanel>
              {borrowed ? <Button>Return the book</Button> : <br />}
              <br />
              <Button onClick={handleSubmit}>Submit</Button>
              <br />
              <Button>Delete</Button>
            </ButtonPanel>
          </Fields>
        </Form>
        <Footer />
      </MainPanel>
    </Container>
  );
};
export default BookDetailPage;

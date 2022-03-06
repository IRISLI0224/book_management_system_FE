import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/Button";
import BookInfo from "../../components/BookInfo";
import { Link } from "react-router-dom";
import { getAllBooks } from "../../config/book";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {appendData} from '../../redux/action'

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

const ButtonPanel = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 60px 0px;
  background: #f0edeb;
  justify-content: space-around;
  @media (max-width: 768px) {
    align-content: space-between;
    display:flex;
    flex-wrap: wrap;
  }
`;

const RecentBooks = styled.div`
  height: auto;
  margin: auto;
  margin-bottom: 50px;
  padding: 20px;
  text-align: center;
  width: 80%;
  height: auto;
  background-color: #f0edebae;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const RecentPanel = styled.div`
  margin-top: 10px;
  display: flex;
`;

const TitlePanel = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Text = styled.div`
  color: #8b6c64;
  font-size: 20px;
`;

const BooksPage = () => {
  const [allBook, setAllBook] = useState();
  let dispatch = useDispatch();
  let state = useSelector((state) => state);

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    handleDispatch();
  }, [allBook]);

  
  const handleDispatch = () => {
    dispatch(appendData({
      AllBooks: allBook
    }));
  };

  const getBooks = async () => {
    const books = await getAllBooks();
    if (books) setAllBook(books);
  };
  return (
    <Container>
      <MainPanel>
        <Header />
        <ButtonPanel>
          <Link to="/book/new" style={{ textDecoration: "none" }}>
            <Button>Add New Book</Button>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <Button>View All Users</Button>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button>Back to Homepage</Button>
          </Link>
        </ButtonPanel>
        <RecentPanel>
          <RecentBooks>
            <br />
            <TitlePanel>
              <Text>All Books</Text>
              <br/>
              <Link to="/book/new" style={{ textDecoration: "none" }}>
                <Button>Add New Book</Button>
              </Link>
              <br/>
            </TitlePanel>
            {state?.AllBooks?.map((book, key) => {
              return <BookInfo Book={book} />;
            })}
          </RecentBooks>
        </RecentPanel>
        <Footer />
      </MainPanel>
    </Container>
  );
};
export default BooksPage;

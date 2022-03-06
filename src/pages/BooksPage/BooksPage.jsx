import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/Button";
import BookInfo from "../../components/BookInfo";
import { Link } from "react-router-dom";
import { getAllBooks } from "../../config/book";

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
`;

const RecentUsers = styled.div`
  height: auto;
  margin: auto;
  margin-bottom: 50px;
  text-align: center;
  width: 48%;
  padding: 20px;
  height: auto;
  background-color: #f0edebae;
  border-radius: 10px;
  margin-right: 4%;
  @media (max-width: 768px) {
    width: 90%;
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

const Text = styled.div`
  color: #8b6c64;
  font-size: 20px;
`;

const BooksPage = () => {
  const [allBook, setAllBook] = useState();

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const books = await getAllBooks();
    if (books) setAllBook(books);
  };
  return (
    <Container>
      <MainPanel>
        <Header />
        <ButtonPanel>
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
            <Text>All Books</Text>
            {allBook?.map((book, key) => {
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

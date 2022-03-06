import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/Button";
import BookInfo from "../../components/BookInfo";
import UserInfo from "../../components/UserInfo";
import { Link } from "react-router-dom";
import { getRecentBooks } from "../../config/book";
import { getAllUsers, getRecentUsers } from "../../config/user";

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
  width: 48%;
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

const Home = () => {
  const [Books, setBooks] = useState();
  const [Users, setUsers] = useState();

  useEffect(() => {
    getBooks();
    getUsers();
  }, []);

  const getBooks = async () => {
    const books = await getRecentBooks();
    if (books) setBooks(books);
  };
  const getUsers = async () => {
    const users = await getRecentUsers();
    //test console
    console.log(users);
    if (users) setUsers(users);
  };
  return (
    <Container>
      <MainPanel>
        <Header />
        <ButtonPanel>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <Button>View All Users</Button>
          </Link>
          <Link to="/books" style={{ textDecoration: "none" }}>
            <Button>View All Books</Button>
          </Link>
        </ButtonPanel>
        <RecentPanel>
          <RecentUsers>
            <br />
            <Text>Recent Users</Text>

            {Users ? (
              Users?.map((user, key) => {
                return <UserInfo User={user} recent="true" />;
              })
            ) : (
              <div>No user in the database</div>
            )}
          </RecentUsers>
          <RecentBooks>
            <br />
            <Text>Recent Books</Text>
            {Books?Books?.map((book, key) => {
              return <BookInfo Book={book} recent="true" />;
            }):<div>No Book in the database</div>}
          </RecentBooks>
        </RecentPanel>
        <Footer />
      </MainPanel>
    </Container>
  );
};

export default Home;

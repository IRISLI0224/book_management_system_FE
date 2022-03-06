import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/Button";
import BookInfo from "../../components/BookInfo";
import UserInfo from "../../components/UserInfo";
import { Link } from "react-router-dom";

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
  width: 80%;
  padding: 20px;
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

const UsersPage = () => {
  return (
    <Container>
      <MainPanel>
        <Header />
        <ButtonPanel>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button>Back to Homepage</Button>
          </Link>
          <Link to="/books" style={{ textDecoration: "none" }}>
            <Button>View All Books</Button>
          </Link>
        </ButtonPanel>
        <RecentPanel>
          <RecentUsers>
            <br />
            <Text>Recent Users</Text>
            <UserInfo />
            <UserInfo />
            <UserInfo />
            <UserInfo />
            <UserInfo />
          </RecentUsers>
        </RecentPanel>
        <Footer />
      </MainPanel>
    </Container>
  );
};

export default UsersPage;

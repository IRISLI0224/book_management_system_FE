import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/Button";
import BookInfo from "../../components/BookInfo";
import UserInfo from "../../components/UserInfo";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../config/user";
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

const TitlePanel = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const UsersPage = () => {
  const [allUser, setAllUser] = useState();
  let dispatch = useDispatch();
  let state = useSelector((state) => state);

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    handleDispatch();
  }, [allUser]);

  const handleDispatch = () => {
    dispatch(appendData({
      AllUsers: allUser
    }));
  };

  const getBooks = async () => {
    const users = await getAllUsers();
    if (users) setAllUser(users);
  };
  return (
    <Container>
      <MainPanel>
        <Header />
        <ButtonPanel>
          <Link to="/user/new" style={{ textDecoration: "none" }}>
            <Button>Add New User</Button>
          </Link>
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
            <TitlePanel>
            <Text>All Users</Text>
            <Link to="/user/new" style={{ textDecoration: "none" }}>
              <Button>Add New User</Button>
            </Link>
            </TitlePanel>
            {state.AllUsers?.map((user, key) => {
              return <UserInfo User={user} />;
            })}
          </RecentUsers>
        </RecentPanel>
        <Footer />
      </MainPanel>
    </Container>
  );
};

export default UsersPage;

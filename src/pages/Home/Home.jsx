import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/Button";

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
  height: 300px;
  background-color: #f0edebae;
  border-radius: 10px;
  margin-right:4%;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const RecentBooks = styled.div`
  height: auto;
  margin: auto;
  margin-bottom: 50px;
  text-align: center;
  width: 48%;
  height: 300px;
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
  color: #d6b8b0;
`;

const Home = () => {
  return (
    <Container>
      <MainPanel>
        <Header />
        <ButtonPanel>
          <Button>View All Users</Button>
          <Button>View All Books</Button>
        </ButtonPanel>
        <RecentPanel>
          <RecentUsers>
            <br />
            <Text>Recent Users</Text>
          </RecentUsers>
          <RecentBooks>
            <br />
            <Text>Recent Books</Text>
          </RecentBooks>
        </RecentPanel>
        <Footer />
      </MainPanel>
    </Container>
  );
};

export default Home;

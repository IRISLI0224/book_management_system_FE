import React from "react";
import styled from "styled-components";
import One from "../../components/Header";
import Two from "../../components/Two";

const Container = styled.div`
  height: auto;
  margin: auto;
  text-align: center;
  width: 100%;
  background-color: #edf6ff;
`;

const MainPanel = styled.div`
  padding: 5px;
  height: auto;
  margin: auto;
  text-align: center;
  width: 80%;
  background-image: -webkit-linear-gradient(-90deg, #5e85fc 0%, #c46dfd 100%);
  border-radius: 10px;
`;

const Title = styled.h1`
  margin-top: 100px;
  color: #e9e9e9;
`;

const SubTitle = styled.h2`
  color: #e9e9e9;
`;

const BooksPage = () => {
  return (
    <Container>
      <MainPanel>
        <Title>Books Page</Title>
        <One />
        <Two />
      </MainPanel>
    </Container>
  );
};

export default BooksPage;

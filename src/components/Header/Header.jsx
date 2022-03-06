import React from "react";
import styled from "styled-components";
import backgroundImg from "../../assets/img/background.jpg";

const Container = styled.div`
  box-shadow: rgb(0 0 0 / 20%) 0px 0.0625rem 0.1875rem 0px;
  border-radius: 0.1875rem;
  background-color: var(--ck-backgroundPrimaryLow);
  background: url(${backgroundImg}) no-repeat;
  width: 100%;
  height: auto;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  padding: 15px 0px;
  z-index: 0;
`;
const Title = styled.h1`
  margin-top: 100px;
  color: #ffffff;
`;

const SubTitle = styled.h2`
  color: #ffffff;
`;

const Header = () => {
  return (
    <Container>
      <Title>Book Management System</Title>
      <SubTitle>By Iris Liang</SubTitle>
    </Container>
  );
};


export default Header;

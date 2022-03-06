import React from "react";
import styled from "styled-components";

const Container = styled.div`
  box-shadow: rgb(0 0 0 / 20%) 0px 0.0625rem 0.1875rem 0px;
  border-radius: 0.1875rem;
  width: 100%;
  height: 100px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  padding: 15px 0px;
  z-index: 0;
  background: #d6b8b0;
`;
const SubTitle = styled.div`
  color: #ffffff;
`;

const Footer = () => {
  return (
    <Container>
      <br />
      <br />
      <SubTitle>© 2022 All rights reserved. Designed by Iris Liang</SubTitle>
    </Container>
  );
};

export default Footer;

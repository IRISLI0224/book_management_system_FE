import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  height: 100vh;
  max-height: 900px;
  background-position: center;
  background-size: 65%;
  padding-top: 20vh;
  padding-bottom: 0;

  h1 {
    color: #434343;
    margin: 0px;
    padding: 0px 0px 25px 0px;
    font-size: 50px;
    font-weight: 600;
    line-height: 1.2;
  }
  p {
    color: #434343;
    font-weight: 400;
    text-shadow: none;
    font-size: 28px;
  }
`;

const NoPage = () => (
  <Container>
    <h1>Oops..! 404 Page Not Found</h1>
    <p>Looks like you came to wrong page on our server</p>
  </Container>
);

export default NoPage;

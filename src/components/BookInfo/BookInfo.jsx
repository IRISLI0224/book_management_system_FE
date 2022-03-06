import React from "react";
import styled from "styled-components";
import { Button } from "../Button";
import BookCoverImg from "../../assets/img/bookCover1.png";
import { Link } from "react-router-dom";

const Container = styled.div`
  box-shadow: rgb(0 0 0 / 20%) 0px 0.0625rem 0.1875rem 0px;
  border-radius: 0.1875rem;
  width: 80%;
  margin-left: 10%;
  height: 90px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  padding: 15px 0px;
  z-index: 0;
  background: #d6b8b07f;
  margin-top: 15px;
  display: flex;
`;
const Text = styled.div`
  color: #5c4c4c;
`;

const BookCover = styled.img`
  height: 90px;
  width: auto;
  margin-left: 10px;
`;

const InfoPanel = styled.div`
  width: 80%;
`;

const ButtonPanel = styled.div`
  height: 90px;
  width: auto;
  margin-left: 10px;
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const BookInfo = ({ recent }) => {
  return (
    <Container>
      <BookCover src={BookCoverImg} />
      <InfoPanel>
        <Text>Book A</Text>
        <Text>Author: A</Text>
        <Text>Status: In stock</Text>
      </InfoPanel>
      <ButtonPanel>
        {recent ? (
          <Link to="/book/:id" style={{ textDecoration: "none" }}>
            <Button>Details</Button>
          </Link>
        ) : (
          <ButtonPanel>
            <Link to="/book/:id" style={{ textDecoration: "none" }}>
              <Button>&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
            </Link>
            <div>&nbsp;&nbsp;&nbsp;</div>
              <Button>Delete</Button>
          </ButtonPanel>
        )}
      </ButtonPanel>
    </Container>
  );
};

export default BookInfo;

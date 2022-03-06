import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../Button";
import Avatar from "../../assets/img/avatar.png";
import { Link } from "react-router-dom";
import { DeleteUser } from "../../config/user";
import { Modal } from "antd";
import "antd/dist/antd.css";

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
  height: 70px;
  width: auto;
  margin-left: 10px;
`;

const InfoPanel = styled.div`
  width: 80%;
`;

const ButtonPanel = styled.div`
  width: auto;
  margin-left: 10px;
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const UserInfo = ({ recent, User }) => {
  const url = "/user/" + User?._id;
  const [APIMessage, setAPIMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = async () => {
    const user = await DeleteUser(User?._id);
    if (user === "user deleted") {
      setAPIMessage("Delete user successfully!");
      setModalVisible(true);
    } else {
      setAPIMessage("Something Wrong, pleas try later.");
      setModalVisible(true);
    }
  };

  const Redirection = () => {
    setModalVisible(false);
    //After delete, back to all user page
    if (
      APIMessage === "Delete user successfully!" ||
      APIMessage === "Cannot find the user, try again later."
    ) {
      window.location.href = "/users";
    }
  };

  return (
    <Container>
      <Modal
        visible={modalVisible}
        footer={[
          <div style={{ marginLeft: "200px" }}>
            <Button key="OK" onClick={Redirection}>
              &nbsp;&nbsp;OK&nbsp;&nbsp;
            </Button>
          </div>,
        ]}
      >
        <p></p>
        <p>{APIMessage}</p>
        <p></p>
      </Modal>
      <BookCover src={Avatar} />
      <InfoPanel>
        <Text>{User?.name}</Text>
        <Text>Phone: {User?.phone}</Text>
        <Text>Date of Birth: {User?.date_of_birthdate_of_birth}</Text>
      </InfoPanel>
      <ButtonPanel>
        {recent ? (
          <Link to={url} style={{ textDecoration: "none" }}>
            <Button>Details</Button>
          </Link>
        ) : (
          <ButtonPanel>
            <Link to={url} style={{ textDecoration: "none" }}>
              <Button>&nbsp;&nbsp;Edit&nbsp;&nbsp;</Button>
            </Link>
            <div>&nbsp;&nbsp;&nbsp;</div>
            <Button onClick={handleDelete}>Delete</Button>
          </ButtonPanel>
        )}
      </ButtonPanel>
    </Container>
  );
};

export default UserInfo;

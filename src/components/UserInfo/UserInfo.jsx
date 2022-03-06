import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../Button";
import Avatar from "../../assets/img/avatar.png";
import { Link } from "react-router-dom";
import { DeleteUser } from "../../config/user";
import { Modal } from "antd";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { appendData } from "../../redux/action";
const moment = require("moment");

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
  @media (max-width: 768px) {
    width: 95%;
    margin-left: 2.5%;
    height: 160px;
    flex-wrap: wrap;
  }
`;
const Text = styled.div`
  color: #5c4c4c;
`;

const BookCover = styled.img`
  height: 70px;
  width: auto;
  margin-left: 10px;
  @media (max-width: 768px) {
    height: 30px;
  }
`;

const InfoPanel = styled.div`
  width: 80%;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ButtonPanel = styled.div`
  width: auto;
  margin-left: 10px;
  display: flex;
  align-items: center;
  margin-right: 20px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    margin:auto;
  }
`;

const UserInfo = ({ recent, User }) => {
  const url = "/user/" + User?._id;
  const [APIMessage, setAPIMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  let dispatch = useDispatch();
  let state = useSelector((state) => state);

  const handleDelete = async () => {
    const user = await DeleteUser(User?._id);
    if (user === "user deleted") {
      const Users = state?.AllUsers.slice();
      delete Users[Users.indexOf(User)];
      dispatch(
        appendData({
          AllUsers: Users,
        })
      );
    }
  };

  const displayModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };



  return (
    <Container>
      <Modal
        visible={modalVisible}
        footer={[
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button key="Cancel" onClick={handleCancel}>
              &nbsp;&nbsp;Cancel&nbsp;&nbsp;
            </Button>
            <Button key="OK" onClick={handleDelete}>
              &nbsp;&nbsp;OK&nbsp;&nbsp;
            </Button>
          </div>,
        ]}
      >
        <br/>
        <p>Do you want to delete the user?</p>
        <br/>
      </Modal>
      <BookCover src={Avatar} />
      <InfoPanel>
        <Text>{User?.name}</Text>
        {User?.phone ? <Text>Phone: {User?.phone}</Text> : null}
        {User?.date_of_birth ? (
          <Text>
            Date of Birth: {moment(User?.date_of_birth).format("yyyy-MM-DD")}
          </Text>
        ) : null}
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
            <Button onClick={displayModal}>Delete</Button>
          </ButtonPanel>
        )}
      </ButtonPanel>
    </Container>
  );
};

export default UserInfo;

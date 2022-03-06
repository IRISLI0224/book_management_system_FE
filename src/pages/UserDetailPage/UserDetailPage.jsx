import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/Button";
import BookCoverImg from "../../assets/img/avatar.png";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useParams, useLocation } from "react-router-dom";
import validate from "../../components/UserInfo/validate";

import {
  UpdateUserById,
  getUserById,
  DeleteUser,
  CreateUser,
} from "../../config/user";
import { Modal } from "antd";
import InputErrorMsg from "../../components/InputErrorMsg";
import "antd/dist/antd.css";
const moment = require('moment');

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

const Form = styled.div`
  padding: 5px;
  height: 600px;
  margin: auto;
  text-align: center;
  border-radius: 10px;
  background: #f0edeb;
`;

const Text = styled.div`
  color: #5c4c4c;
  font-size: 20px;
`;

const BookCover = styled.img`
  height: 200px;
  width: auto;
  margin-top: 50px;
`;

const Input = styled.input`
  margin-left: 20px;
  opacity: 0.7;
  @media (max-width: 768px) {
    width: 50%;
    margin-left: 10px;
  }
`;

const InputPanel = styled.div`
  margin: auto;
  justify-content: center;
  padding-top: 15px;
  display: flex;
  margin-bottom: 5px;
`;

const Fields = styled.div`
  margin: auto;
  justify-content: center;
  padding: 20px;
  display: flex;
  margin-bottom: 10px;
  width: 60%;
`;

const InputFields = styled.div`
  margin: auto;
  padding: 10px;
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
`;

const ButtonPanel = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin:auto;
}
`;

const TopButtonPanel = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 60px 0px;
  background: #f1e6dc;
  justify-content: space-around;
`;

const AddButtonPanel = styled.div`
    display: flex;
    width: 100%;
    height: 20px;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
}
`;

const MainContent = styled.div`
  display:flex;
  flex-direction: column;
}
`;


const UserDetailPage = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [date_of_birth, setDate_of_birth] = useState();
  const [phone, setPhone] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [APIMessage, setAPIMessage] = useState("");
  const [Id, setId] = useState(useParams().id);
  const path = useLocation().pathname;
  const [add, setAdd] = useState(false);

  useEffect(() => {
    if (path.indexOf("new") > 0) {
      //Add new
      setAdd(true);
    }
    //Edit
    else getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const user = await getUserById(Id);
    if (typeof user !== "string") {
      const Data = user;
      setPhone(Data?.phone);
      setName(Data?.name);
      const Moment =moment(Data?.date_of_birth);
      setDate_of_birth(Moment.format('yyyy-MM-DD'));
      setEmail(Data?.email);
    } else {
      setAPIMessage("Cannot find the user, try again later.");
      setModalVisible(true);
    }
  };

  const handleOnBlur = (event) => {
    const { value, name } = event.target;
  };

  const handleDataChange = (event) => {
    const { value, name } = event.target;
    switch (name) {
      case "name": {
        setName(value);
        return "name";
      }
      case "email": {
        setEmail(value);
        return "email";
      }
      case "date_of_birth": {
        setDate_of_birth(value);
        return "date_of_birth";
      }
      case "phone": {
        setPhone(value);
        return "phone";
      }
      default:
        return "";
    }
  };

  const checkValues = () => {
    if (!name || name === "") {
      setNameError(true);
      return;
    } else {
      setNameError(false);
    }
    const checkEmail=validate('email',email);
    //test console
    console.log(checkEmail)
    if (checkEmail !== "") {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }
    if (!nameError && !emailError)
      if (add) {
        AddNewUser();
      } else EditUser();
  };

  const handleSubmit = () => {
    //test console
    console.log(name)
    console.log(email)
    console.log(phone)
    console.log(date_of_birth)
    checkValues();
  };

  const handleDelete = async () => {
    const user = await DeleteUser(Id);
    if (user === "user deleted") {
      setAPIMessage("Delete user successfully!");
      setModalVisible(true);
    } else {
      setAPIMessage("Something Wrong, pleas try later.");
      setModalVisible(true);
    }
  };

  const EditUser = async () => {
    const user = await UpdateUserById(Id,phone, name, date_of_birth);
    if (user.status == "200") {
      setAPIMessage("Edit user successfully");
      setModalVisible(true);
    } else if (user.status == "403") {
      setAPIMessage("User already exists!");
      setModalVisible(true);
    } else {
      setAPIMessage("Something Wrong, pleas try later.");
      setModalVisible(true);
    }
  };

  const AddNewUser = async () => {
    const user = await CreateUser(name, date_of_birth, phone,email);
    if (user.status == "201") {
      setId(user?.data?._id);
      setAPIMessage("Add User successfully!");
      setModalVisible(true);
    } else if (user.status == "403") {
      setAPIMessage("User already exists!");
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
    } else if (APIMessage === "Add user successfully!") {
      window.location.href = "/user/" + Id;
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
      <MainPanel>
        <Header />
        <TopButtonPanel>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <Button>Back to all Users Page</Button>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button>Back to Homepage</Button>
          </Link>
        </TopButtonPanel>
        <Form>
          <br />
          <br />
          {add ? (
            <AddButtonPanel>
              <Text>Add new user</Text>
              <br />
              <Button onClick={handleSubmit}>
                &nbsp;&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;&nbsp;
              </Button>
            </AddButtonPanel>
          ) : (
            <Text>User detail information</Text>
          )}
          <MainContent>
            <Fields>
              <BookCover src={BookCoverImg} />
              <InputFields>
                <br />
                <InputPanel>
                  <div>Name:</div>
                  <Input
                    name="name"
                    onChange={handleDataChange}
                    onBlur={handleOnBlur}
                    value={name}
                  />
                </InputPanel>
                {nameError ? (
                  <InputErrorMsg>Name can't be empty!</InputErrorMsg>
                ) : (
                  null
                )}
                <br />
                <InputPanel>
                  <div>Email:</div>
                  <Input
                    name="email"
                    onChange={handleDataChange}
                    onBlur={handleOnBlur}
                    value={email}
                  />
                </InputPanel>
                {emailError ? (
                  <InputErrorMsg>Please input a valid email!</InputErrorMsg>
                ) : (
                  <br />
                )}
                <InputPanel>
                  <div>Phone:</div>
                  <Input
                    type="number"
                    name="phone"
                    onChange={handleDataChange}
                    onBlur={handleOnBlur}
                    value={phone}
                  />
                </InputPanel>
                <InputPanel>
                  <div>Date of Birth:</div>
                  <Input
                    type="date"
                    name="date_of_birth"
                    onChange={handleDataChange}
                    onBlur={handleOnBlur}
                    value={date_of_birth}
                  />
                </InputPanel>
              </InputFields>
            </Fields>
            {!add ? (
              <ButtonPanel>
                <Button onClick={handleSubmit}>Submit</Button>

                {!add ? <Button onClick={handleDelete}>Delete</Button> : null}
              </ButtonPanel>
            ) : null}
          </MainContent>
        </Form>
        <Footer />
      </MainPanel>
    </Container>
  );
};

export default UserDetailPage;

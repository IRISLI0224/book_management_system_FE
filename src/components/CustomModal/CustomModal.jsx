import React from "react";
import styled from "styled-components";
import { Button } from "../Button";
import "antd/dist/antd.css";
import { Modal } from "antd";

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

const CustomModal = ({modalVisible,Redirection,APIMessage}) => {
  return (
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
  );
};

export default CustomModal;

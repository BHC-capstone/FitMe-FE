import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Avatar, Descriptions } from 'antd';
import '../myPage/RequestDetail.css';
import styled from 'styled-components';

function ButtonDisplay({ requestId, handleAccept, handleReject }) {
  return (
    <>
      <StyledButton1
        variant="primary"
        type="button"
        onClick={() => handleAccept({ requestId })}
      >
        수락
      </StyledButton1>
      <StyledButton2
        variant="danger"
        type="button"
        onClick={() => handleReject({ requestId })}
      >
        거절
      </StyledButton2>
    </>
  );
}

function RequestDetailTrainer({ request, fetch }) {
  const navigate = useNavigate();
  const handleAccept = async ({ requestId }) => {
    axios({
      method: 'post',
      url: `https://localhost:4000/administrator/trainerauth/${requestId}`,
    })
      .then(response => {
        fetch();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleReject = async ({ requestId }) => {
    axios({
      method: 'post',
      url: `https://localhost:4000/administrator/trainerreject/${requestId}`,
    })
      .then(response => {
        fetch();
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <Container>
      <div>
        <div className="request-detail-container">
          <Descriptions title=" " bordered column={1}>
            <Descriptions.Item label=" 이름">
              <span className="item-value">{request.name}</span>
            </Descriptions.Item>
            <Descriptions.Item label=" 전화번호">
              {request && request.phonenumber}
            </Descriptions.Item>
            <Descriptions.Item label=" 성별">
              {request.gender}
            </Descriptions.Item>
            <Descriptions.Item label=" 나이">{request.age}</Descriptions.Item>
            <Descriptions.Item label=" 자기소개">
              {request.introduction}
            </Descriptions.Item>
            <Descriptions.Item label=" 트레이너 자격증">
              <img
                style={{ width: '200px', height: '300px' }}
                src={request.trainer_image_url}
                alt="자격증"
              />
            </Descriptions.Item>
          </Descriptions>
          <ButtonDisplay
            handleAccept={handleAccept}
            handleReject={handleReject}
            requestId={request.id}
          />
          <div />
        </div>
      </div>
    </Container>
  );
}
const StyledButton1 = styled(Button)`
  // width: 20%;
  margin: auto;
  margin-top: 20px;
`;

const StyledButton2 = styled(Button)`
  // width: 20%;
  margin-left: 10px;
  margin-top: 20px;
`;

export default RequestDetailTrainer;

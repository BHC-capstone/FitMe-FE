import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Form, Upload, Button } from 'antd';
import styled from 'styled-components';
import { UploadOutlined, CloseOutlined } from '@ant-design/icons';
import '../../scss/myPage/trainerProfile.scss';

function TrainerProfile() {
  const loginedUser = useSelector(state => state.user);
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await axios.get(
        `https://localhost:4000/trainers/getListOfCertification/${loginedUser.id}`,
        { withCredentials: true },
      );
      const { data } = response.data;
      setCertifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="trainer-profile">
      {loginedUser.isTrainer ? (
        <Form>
          <Form.Item label="트레이너 프로필 사진">
            <Upload.Dragger name="files" />
          </Form.Item>
        </Form>
      ) : null}

      <Container1 fluid>
        <div className="certification-list">
          <Head1>보유 자격증</Head1>
          <br />
          {certifications.map(certification => (
            <div key={certification.id} className="certification-item">
              <h3 className="certification-name">{certification.name}</h3>
              <img
                style={{ width: '200px', height: '300px' }}
                src={certification.image_url}
                alt="자격증"
              />
            </div>
          ))}
        </div>
      </Container1>
    </div>
  );
}

const Container1 = styled(Container)`
  margin-top: 10%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //border: 2px solid black;
`;
const Head1 = styled.div`
  color: rgb(21, 20, 20);
  font-family: 'Black Han Sans', sans-serif;
  font-size: 30px;
  display: flex;
  text-align: center;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
  // padding: 10px;
`;

export default TrainerProfile;

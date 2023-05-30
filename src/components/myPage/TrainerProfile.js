import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Form, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function TrainerProfile() {
  const loginedUser = useSelector(state => state.user);
  const [certifications, setCertifications] = useState([]);
  const fileList = [];
  const handleFileUpload = event => {
    event.preventDefault();
    const formData = new FormData();
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await axios.get(
        `/trainers/getListOfCertification/${loginedUser.id}`,
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
      <Container fluid className="content">
        <div className="certification-list">
          <div className="head">보유 자격증</div>
          <br />
          {certifications.map(certification => (
            <div key={certification.id} className="certification-item">
              <h3 className="certification-name">{certification.name}</h3>
            </div>
          ))}
        </div>
        {loginedUser.isTrainer ? (
          <Form>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
              defaultFileList={[...fileList]}
              className="upload-list-inline"
            >
              <Button icon={<UploadOutlined />}>자격증 파일 업로드</Button>
            </Upload>
          </Form>
        ) : null}
      </Container>
    </div>
  );
}

export default TrainerProfile;

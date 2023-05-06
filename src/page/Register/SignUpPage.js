import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

function SignUpPage() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [phonenumber, setPhonenumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordCheck, setPasswordCheck] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [age, setAge] = React.useState('');

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };
  const onChangeName = e => {
    setName(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };
  const onChangePasswordCheck = e => {
    setPasswordCheck(e.target.value);
  };
  const onChangeGender = e => {
    setGender(e.target.value);
  };
  const onChangeAge = e => {
    setAge(e.target.value);
  };
  const onChangePhonenumber = e => {
    setPhonenumber(e.target.value);
  };

  // eslint-disable-next-line consistent-return
  const onSubmit = e => {
    e.preventDefault();
    if (password !== passwordCheck) {
      return setPasswordCheck('');
    }

    const body = {
      email,
      name,
      phonenumber,
      password,
      age,
      gender,
    };
    axios
      .post('http://localhost:4000/users/signup', body)
      .then(res => {
        navigate('/login');
        alert(res.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const goTrainerSignUp = () => {
    navigate('/trainer-signup');
  };

  return (
    <div className="signup">
      <Container className="panel">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={onChangeEmail}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>패스워드</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPasswordCheck">
            <Form.Label>패스워드 재입력</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password Check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>이름</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={onChangeName}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhonenumber">
            <Form.Label>전화번호</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phonenumber"
              value={phonenumber}
              onChange={onChangePhonenumber}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicGender">
            <Form.Label>성별</Form.Label>
            <Form.Control as="select" onChange={onChangeGender}>
              <option value="">선택하세요</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
              <option value="others">기타</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicAge">
            <Form.Label>나이</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={onChangeAge}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={onSubmit}>
            Submit
          </Button>
          <Button variant="secondary" type="submit" onClick={goTrainerSignUp}>
            트레이너로 회원가입
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default SignUpPage;
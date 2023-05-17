import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import '../../scss/userInfoTab.scss';
import LogoutButton from './LogoutButton';

function UserInfoTab({ loginedUser }) {
  const [user, setUser] = React.useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      if (!loginedUser.id) {
        return;
      }
      let response = null;
      {
        loginedUser.isTrainer === false
          ? (response = await axios.get(
              `https://localhost:4000/users/profile/${loginedUser.id}`,
              {
                withCredentials: true,
              },
            ))
          : (response = await axios.get(
              `https://localhost:4000/trainers/profile/${loginedUser.id}`,
              {
                withCredentials: true,
              },
            ));
      }
      if (response.data !== null) {
        setUser(response.data);
      }
    };
    fetchUser();
  }, []);
  if (!loginedUser.id) {
    return <div>로그인 후 이용해주세요.</div>;
  }
  if (!user) {
    return <div>회원정보 Loading...</div>;
  }

  return (
    <Container>
      <div className="user-info-tab">
        {/* <h2 className="user-info-tab-title">회원정보</h2> */}
        <ul className="user-info-list">
          <li className="user-info-item">
            <span className="user-info-label">이메일:</span> {user.data.email}
          </li>
          <li className="user-info-item">
            <span className="user-info-label">유저이름:</span> {user.data.name}
          </li>
          <li className="user-info-item">
            <span className="user-info-label">유저나이:</span> {user.data.age}
          </li>
          <li className="user-info-item">
            <span className="user-info-label">성별:</span>{' '}
            {user.data.gender === 'female' ? '여성' : '남성'}
          </li>
          <li className="user-info-item">
            <span className="user-info-label">전화번호:</span>
            {user.data.phonenumber}
          </li>
        </ul>
        <div className="user-info-actions">
          <Link to="/mypage/edit">
            <button type="button" className="btn btn-primary">
              회원정보 수정
            </button>
          </Link>
          <Link to="/mypage/withdraw">
            <button type="button" className="btn btn-danger">
              회원 탈퇴
            </button>
          </Link>
          <LogoutButton />
        </div>
      </div>
    </Container>
  );
}

export default UserInfoTab;

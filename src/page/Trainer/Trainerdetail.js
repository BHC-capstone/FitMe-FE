/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import styled from 'styled-components';
import Starpoint from '../../components/Starpoint';

function Trainerdetail() {
  const { id } = useParams();
  const [trainer, setTrainer] = useState({});
  const [currentTab, clickTab] = useState(0);
  const [star, setStar] = useState(1);
  const menuArr = [
    { name: '자기 소개', content: `${trainer.introduction}` },
    { name: '프로필', content: 'Tab menu TWO' },
    { name: '리뷰', content: 'Tab menu THREE' },
  ];

  useEffect(() => {
    axios.get(`http://localhost:4000/trainers/profile/${id}`).then(res => {
      console.log(res.data.data);
      setTrainer(res.data.data);
    });
  }, []);

  const selectMenuHandler = index => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    clickTab(index);
  };
  return (
    <>
      <Upbox>
        <Box1>
          <Imageposition>image</Imageposition>
          <Nameblock className="a">{trainer.name}</Nameblock>
          <Nameblock>별점 </Nameblock>
          <Starpoint init={star} />
          <Nameblock className="b">
            {trainer.gender} {trainer.age}세
          </Nameblock>
        </Box1>
        <Box2>
          <Emailblock>E-mail : {trainer.email}</Emailblock>
          <Emailblock>PhoneNumber : {trainer.phonenumber}</Emailblock>
        </Box2>
      </Upbox>
      <TabMenu>
        {menuArr.map((el, index) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            className={index === currentTab ? 'submenu focused' : 'submenu'}
            onClick={() => selectMenuHandler(index)}
            onKeyDown={() => selectMenuHandler(index)}
          >
            {el.name}
          </li>
        ))}
      </TabMenu>
      <Desc>
        <p>{menuArr[currentTab].content}</p>
      </Desc>
      <div />
    </>
  );
}
const Upbox = styled.ul`
  background-color: #111654;
  color: rgb(255, 255, 255);
  height: 500px;
`;
const Box1 = styled.div`
  background-color: #111654;
  height: 400px;
`;
const Box2 = styled.div`
  background-color: #111654;
  height: 100px;
`;
const Imageposition = styled.div`
  width: 280px;
  height: 360px;

  padding-top: calc(100% / 20);
  padding-bottom: calc(100% / 20);
  margin-left: calc(100% / 10);
  background-color: #ffffff;
  display: flex;
  float: left;
`;
const Nameblock = styled.text`
  letter-spacing: 5px;
  word-spacing: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-left: 50px;
  padding-top: calc(100% / 20);

  &.a {
    letter-spacing: 20px;
    font-size: 50px;
    font-weight: bold;
  }
  &.b {
    padding-top: calc(100% / 40);
    font-size: 15px;
    font-weight: normal;
    float: left;
  }
`;
const Emailblock = styled.text`
  letter-spacing: 5px;
  font-weight: lighter;
  color: white;
  margin-left: calc(100% / 10);
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 140px;
`;
const TabMenu = styled.ul`
  background-color: #ffffff;
  color: rgb(21, 20, 20);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-bottom: 7rem;
  margin-top: 10px;
  border-bottom: solid 1px;
  border-bottom-color: #d1d1d1;

  .submenu {
    display: flex;
    /* justify-content: space-between;
    width: 380px;
    heigth: 30px; */
    width: calc(100% / 3);
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
  }

  .focused {
    border-bottom: solid 3px;
  }

  & div.desc {
    text-align: center;
  }
`;

const Desc = styled.div`
  text-align: center;
`;
export default Trainerdetail;
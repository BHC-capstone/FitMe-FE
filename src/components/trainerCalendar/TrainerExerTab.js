import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import TrainerRoutine from './TrainerRoutine';

// eslint-disable-next-line react/prop-types
function TrainerExerciseTab({ userid, date }) {
  const [exerdate, setExerdate] = useState([]);
  const loginedUser = useSelector(state => state.user);
  const trainerid = loginedUser.id;

  useEffect(() => {
    setExerdate([]);
    axios
      .get(
        `https://localhost:4000/calender/exerciseroutine/${userid}/${date}`,
        {
          withCredentials: true,
        },
      )
      .then(res => {
        setExerdate(res.data.data);
      });
  }, [userid, date]);

  const onAddDetailDiv = () => {
    const countArr = [...exerdate];
    const counter = countArr.slice(-1);
    countArr.push(counter); // index 사용 X
    // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
    setExerdate(countArr);
    axios({
      url: `https://localhost:4000/trainer_calender/createExercise/${date}/${trainerid}/${userid}`,
      method: 'POST',
      withCredentials: true,
    });
  };
  function onRemove(routineid) {
    axios({
      url: `https://localhost:4000/trainer_calender/deleteExercise/${routineid}`,
      method: 'POST',
      withCredentials: true,
    })
      .then(res => {
        const updatedExerdate = exerdate.filter(
          item => item.routineid !== routineid,
        );
        setExerdate(updatedExerdate);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // 운동 루틴이 배열로 제공 된다고 가정하면 map 함수를 상위에 추가하여 밑의 컴포넌트들을 본문으로 사용할 예정
  return (
    <div>
      <Flexcontainers>
        {exerdate.map((el, index) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <TrainerRoutine
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            num={index}
            exercisename={el.name}
            time={el.exercise_count}
            set={el.set_count}
            exerciseURL={el.user_video_url}
            guideURL={el.guide_video_url}
            userId={userid}
            date={date}
            content={el.content}
            routineid={el.id}
            onRemove={onRemove}
          />
        ))}
      </Flexcontainers>
      <Button variant="primary" type="button" onClick={onAddDetailDiv}>
        운동 추가
      </Button>
    </div>
  );
}
const Flexcontainers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const StyledButton = styled(Button)`
  padding-left: 5%;
  text-align: left;
  border-radius: 30px;
  border: 1px solid
    ${props => ((props.num + props.count) % 2 === 1 ? '#2ba5f7' : 'white')};
  width: 90%;
  background-color: ${props =>
    (props.num + props.count) % 2 === 1 ? 'white' : '#2ba5f7'};
  margin: auto;
  line-height: 60px;
  height: 60px;
  color: ${props => ((props.num + props.count) % 2 === 1 ? 'gray' : 'white')};
`;
export default TrainerExerciseTab;

import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import TrainerNoFeedBack from './TrainerNoFeedBack';
import TrainerFeedBack from './TrainerFeedBack';
import Comments from './Comments';
// eslint-disable-next-line react/prop-types
function TrainerFeedBackTab({ userid, date }) {
  const [Feedbackdate, setFeedBackdate] = useState([]);
  const [Commentdate, setCommentdate] = useState([]);
  const [FeedbackExist, setFeedbackExist] = useState(false);
  const [textData, setTextData] = useState([]);
  const loginedUser = useSelector(state => state.user);
  useEffect(() => {
    setFeedBackdate(null);
    axios({
      url: `https://localhost:4000/feedback/checkFeedback/${userid}/${date}`,
      method: 'GET',
      withCredentials: true,
    })
      .then(res => {
        setFeedBackdate(res.data.data.feedback);
        setCommentdate(res.data.data.feedbackComment);
        console.log(res.data.data);
        // console.log('1');
      })
      .catch(err => {
        console.log(err);
      });
    setFeedbackExist(!!Feedbackdate);
  }, [userid, date]);
  useEffect(() => {
    setFeedBackdate(Feedbackdate);
    setCommentdate(Commentdate);
    setFeedbackExist(!!Feedbackdate);
  }, [Feedbackdate, Commentdate]);
  const onAddDetailDiv = () => {
    // '/comment/:userId/:trainerId'
    axios({
      url: `https://localhost:4000/feedback/comment/${userid}/${loginedUser.id}/${Feedbackdate.id}`,
      data: { message: textData },
      method: 'POST',
      withCredentials: true,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('fail');
      });
  };
  const onChangeText = e => {
    setTextData(e.target.value);
  };
  // 운동 루틴이 배열로 제공 된다고 가정하면 map 함수를 상위에 추가하여 밑의 컴포넌트들을 본문으로 사용할 예정
  return (
    <div>
      <Flexcontainers>
        {!FeedbackExist ? (
          <TrainerNoFeedBack
            userid={userid}
            date={date}
            getdata={setFeedbackExist}
          />
        ) : (
          <TrainerFeedBack
            feedbackvideo={
              Feedbackdate == null
                ? '../../images/sample_certificate.png'
                : Feedbackdate.feedback_video_url
            }
            feedbacktext={
              Feedbackdate == null ? '' : Feedbackdate.feedback_message
            }
            feedbackid={Feedbackdate == null ? 'x' : Feedbackdate.id}
          />
        )}
        {Commentdate.map((el, index) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <Comments
            // eslint-disable-next-line react/no-array-index-key
            text1={el.message}
            check={el.user != null}
          />
        ))}
      </Flexcontainers>
      <Flexcontainerg>
        <input
          type="text"
          // value={textData}
          onChange={onChangeText}
          onBlur={onChangeText}
          style={{
            textAlign: 'left',
            width: '80%',
            border: '2px solid black',
            background: 'transparent',
          }}
        />
        <Button variant="primary" type="button" onClick={onAddDetailDiv}>
          추가 버튼
        </Button>
      </Flexcontainerg>
    </div>
  );
}
const Flexcontainers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Flexcontainerg = styled.div`
  display: flex;
  flex-direction: row;
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
export default TrainerFeedBackTab;
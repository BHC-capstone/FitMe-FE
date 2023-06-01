import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Comments from '../trainerCalendar/Comments';
import NoFeedBack from './NoFeedBack';
import ExistFeedBack from './ExistFeedBack';
// eslint-disable-next-line react/prop-types
function FeedBackTab({ userid, date }) {
  const [Feedbackdate, setFeedBackdate] = useState([]);
  const [Commentdate, setCommentdate] = useState([]);
  const [FeedbackExist, setFeedbackExist] = useState(false);
  const [textData, setTextData] = useState([]);
  const [repage, setRePage] = useState(0);
  const loginedUser = useSelector(state => state.user);

  useEffect(() => {
    // console.log('새로고침 실행');
    setFeedBackdate([]);
    setCommentdate([]);
    axios({
      url: `https://fitme.p-e.kr:4000/feedback/checkFeedback/${userid}/${date}`,
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
  }, [userid, date, repage]);

  useEffect(() => {
    setFeedBackdate(Feedbackdate);
    setCommentdate(Commentdate);
    setFeedbackExist(!!Feedbackdate);
  }, [Feedbackdate, Commentdate, repage]);

  const onAddDetailDiv = () => {
    // '/comment/:userId/:trainerId'
    axios({
      // /comment/:trainerId/:id
      url: `https://fitme.p-e.kr:4000/feedback/comment/${userid}/${Feedbackdate.id}`,
      data: { message: textData },
      method: 'POST',
      withCredentials: true,
    })
      .then(res => {
        console.log(res);
        setRePage(repage + 1);
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
    <Flexcontainers>
      {!FeedbackExist ? (
        <NoFeedBack userid={userid} date={date} getdata={setFeedbackExist} />
      ) : (
        <div>
          <ExistFeedBack
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
          <details className="mgtp">
            <summary className="mgbt">요청사항 추가</summary>
            <Container fluid className="content">
              {Commentdate.map((el, index) => (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <Comments
                  // eslint-disable-next-line react/no-array-index-key
                  text1={el.message}
                  check={el.user_id}
                />
              ))}
              <Flexcontainerg>
                <input
                  className="mgtp"
                  type="text"
                  // value={textData}
                  onChange={onChangeText}
                  onBlur={onChangeText}
                  style={{
                    textAlign: 'left',
                    width: '80%',
                    borderRadius: '5px',
                    border: '1px solid gray',
                    background: 'transparent',
                  }}
                />
                <Button
                  variant="primary"
                  type="button"
                  className="mgtp"
                  onClick={onAddDetailDiv}
                >
                  추가 버튼
                </Button>
              </Flexcontainerg>
            </Container>
          </details>
        </div>
      )}
    </Flexcontainers>
  );
}

const Flexcontainers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Flexcontainerg = styled.div`
  flex-direction: row;
  justify-content: space-between;
`;
export default FeedBackTab;
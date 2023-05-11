import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function RequestManage(isTrainer) {
  const [requests, setRequests] = useState(null);
  const loginedUser = useSelector(state => state.user);

  const fetchRequests = async () => {
    const response = await axios.get(
      `http://localhost:4000/request/checklists/${loginedUser.id}`,
    );
    setRequests(response.data.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return <div>PT 요청 정보가 없습니다.</div>;
  }

  const handleAccept = async (trainerId, requestId) => {
    try {
      await axios.post(
        `http://localhost:4000/request/accept/${trainerId}/${requestId}`,
        {
          response: '수락',
        },
      );
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (trainerId, requestId) => {
    try {
      await axios.post(
        `http://localhost:4000/request/reject/${trainerId}/${requestId}`,
        {
          response: '거절',
        },
      );
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>PT 요청 확인</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>회원 ID</th>
            <th>횟수</th>
            <th>요청 내용</th>
            <th>응답</th>
            <th>상태</th>
            <th>수락/거절</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.user_id}</td>
              <td>{request.count}</td>
              <td>{request.request}</td>
              <td>{request.response}</td>
              <td>{request.accept ? '수락됨' : '미응답'}</td>
              <td>
                {!request.accept && (
                  <>
                    <button
                      type="button"
                      //   onClick={() =>
                      //     handleAccept(request.trainer_id, request.id)
                      //   }
                    >
                      수락
                    </button>
                    <button
                      type="button"
                      //   onClick={() =>
                      //     handleReject(request.trainer_id, request.id)
                      //   }
                    >
                      거절
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestManage;

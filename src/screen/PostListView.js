import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ListItem from "../component/ListItem";

const PostListView = ({ users, filterId }) => {
  let navigate = useNavigate();

  let [tabState, setTabState] = useState(0);

  let { id } = useParams();
  const userIdName = filterId[id - 1].userId;
  const postList = users.filter((users) => users.userId === userIdName);

  const completedTure = postList.filter((users) => users.completed !== false);
  const completedFalse = postList.filter((users) => users.completed !== true);

  return (
    <div className="detail-box">
      <div>유저 : {userIdName}</div>
      <button
        onClick={() => {
          setTabState(0);
        }}
      >
        전체
      </button>
      <button
        onClick={() => {
          setTabState(1);
        }}
      >
        작성중
      </button>
      <button
        onClick={() => {
          setTabState(2);
        }}
      >
        완료
      </button>
      {tabState === 0 ? (
        <>
          {postList.map((user) => {
            return (
              <div
                key={user.id}
                onClick={() => {
                  navigate(`/${userIdName}/detail/${user.id}`);
                }}
              >
                <ListItem userId={user.userId} title={user.title} />
              </div>
            );
          })}
        </>
      ) : tabState === 1 ? (
        <>
          {completedFalse.map((user) => {
            return (
              <div
                key={user.id}
                onClick={() => {
                  navigate(`/${userIdName}/detail/${user.id}`);
                }}
              >
                <ListItem userId={user.userId} title={user.title} />
              </div>
            );
          })}
        </>
      ) : (
        <>
          {completedTure.map((user) => {
            return (
              <div
                key={user.id}
                onClick={() => {
                  navigate(`/${userIdName}/detail/${user.id}`);
                }}
              >
                <ListItem userId={user.userId} title={user.title} />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default PostListView;

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../main.css";
import ListItem from "../component/ListItem";

const DetailView = ({ users, filterId }) => {
  let { id, postid } = useParams();
  let navigate = useNavigate();
  const IdName = users[postid - 1].id;
  const postDetail = users.filter((users) => users.id === IdName);
  const userIdName = filterId[id - 1].userId;
  const postList = users.filter((users) => users.userId === userIdName);
  const min = postList[0].id;
  const max = postList[postList.length - 1].id;

  const nowDetail = postDetail[0].id;
  const pre = postList.filter((postList) => postList.id + 1 === nowDetail);
  const next = postList.filter((postList) => postList.id - 1 === nowDetail);

  const buttonClick = () => {
    if (min < postDetail[0].id && max >= postDetail[0].id) {
      navigate(`/${id}/detail/${postDetail[0].id - 1}`);
    }
  };

  const buttonClick1 = () => {
    if (min <= postDetail[0].id && max > postDetail[0].id) {
      navigate(`/${id}/detail/${postDetail[0].id + 1}`);
    }
  };

  return (
    <>
      <div className="detail-box">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
        <p></p>
        <div>현재글: {postDetail[0].title}</div>
        {postDetail[0].id === postList[0].id ? (
          <>
            <div
              onClick={() => {
                buttonClick();
              }}
            >
              <ListItem pn={"이전글이 없습니다"} />
            </div>
            <div
              onClick={() => {
                buttonClick1();
              }}
            >
              <ListItem title={next[0].title} pn="다음글" />
            </div>
          </>
        ) : postDetail[0].id === postList[postList.length - 1].id ? (
          <>
            <div
              onClick={() => {
                buttonClick();
              }}
            >
              <ListItem title={pre[0].title} pn="이전글" />
            </div>
            <div
              onClick={() => {
                buttonClick1();
              }}
            >
              <ListItem pn={"다음글이 없습니다"} />
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => {
                buttonClick();
              }}
            >
              <ListItem title={pre[0].title} pn="이전글" />
            </div>
            <div
              onClick={() => {
                buttonClick1();
              }}
            >
              <ListItem title={next[0].title} pn="다음글" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DetailView;

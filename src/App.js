import React, { useState, useEffect } from "react";
import axios from "axios";
import UserListView from "./screen/UserListView";
import { Routes, Route, Link } from "react-router-dom";
import PostListView from "./screen/PostListView";
import DetailView from "./screen/DetailView";
import { useRecoilState } from "recoil";
import { commentListAtom } from "./atom";
import { userListAtom } from "./atom";
import { postListAtom } from "./atom";
import { computeHeadingLevel } from "@testing-library/react";
import { comment } from "postcss";

const App = () => {
  const [userList, setUserList] = useRecoilState(userListAtom);
  const [postList, setPostList] = useRecoilState(postListAtom);
  const [comment, setComment] = useRecoilState(commentListAtom);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setUserList(...[res.data]);
    });
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      setPostList(...[res.data]);
    });
    axios.get("https://jsonplaceholder.typicode.com/comments").then((res) => {
      setComment(...[res.data]);
    });
  }, []);

  if (userList === null) {
    return <h1>로딩중 . . .</h1>;
  }
  if (postList === null) {
    return <h1>로딩중 . . .</h1>;
  }
  if (comment === null) {
    return <h1>로딩중 . . .</h1>;
  }

  let filterId = postList.filter(function (item1, idx1) {
    return (
      postList.findIndex(function (item2, idx2) {
        return item1.userId === item2.userId;
      }) === idx1
    );
  });

  return (
    <>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="nav">Home</div>
      </Link>
      <Routes>
        <Route path="/" element={<UserListView />} />
        <Route path="/:id" element={<PostListView filterId={filterId} />} />
        <Route
          path="/:id/detail/:postid"
          element={<DetailView filterId={filterId} />}
        />
      </Routes>
    </>
  );
};

export default App;

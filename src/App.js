import React, { useState, useEffect } from "react";
import axios from "axios";
import UserListView from "./screen/UserListView";
import { Routes, Route, Link } from "react-router-dom";
import PostListView from "./screen/PostListView";
import DetailView from "./screen/DetailView";
import { computeHeadingLevel } from "@testing-library/react";
import { comment } from "postcss";

const App = () => {
  const [users2, setUsers2] = useState([]);
  const [users, setUsers] = useState([]);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setUsers2(...[res.data]);
    });
    axios.get("https://jsonplaceholder.typicode.com/todos").then((response) => {
      setUsers(...[response.data]);
    });
    axios
      .get("https://jsonplaceholder.typicode.com/comments?postId=1")
      .then((a) => {
        setComment(...[a.data]);
      });
  }, []);

  let filterId = users.filter(function (item1, idx1) {
    return (
      users.findIndex(function (item2, idx2) {
        return item1.userId === item2.userId;
      }) === idx1
    );
  });

  // console.log("users", users);
  return (
    <>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="nav">Home</div>
      </Link>
      <Routes>
        <Route
          path="/"
          element={
            <UserListView users2={users2} users={users} filterId={filterId} />
          }
        />
        <Route
          path="/:id"
          element={<PostListView users={users} filterId={filterId} />}
        />
        <Route
          path="/:id/detail/:postid"
          element={
            <DetailView users={users} filterId={filterId} comment={comment} />
          }
        />
      </Routes>
    </>
  );
};

export default App;

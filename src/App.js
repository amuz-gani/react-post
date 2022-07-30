import React, { useState, useEffect } from "react";
import axios from "axios";
import UserListView from "./screen/UserListView";
import { Routes, Route, Link } from "react-router-dom";
import PostListView from "./screen/PostListView";
import DetailView from "./screen/DetailView";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((response) => {
      setUsers(...[response.data]);
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
          element={<UserListView users={users} filterId={filterId} />}
        />
        <Route
          path="/:id"
          element={<PostListView users={users} filterId={filterId} />}
        />
        <Route
          path="/:id/detail/:postid"
          element={<DetailView users={users} filterId={filterId} />}
        />
      </Routes>
    </>
  );
};

export default App;

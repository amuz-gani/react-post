import React from "react";
import { useNavigate } from "react-router-dom";
import ListItem from "../component/ListItem";
import "../main.css";

const UserListView = ({ filterId, users }) => {
  let navigate = useNavigate();

  return (
    <div className="detail-box">
      <h1>UserList : {filterId.length}명</h1>
      {filterId.map((user) => {
        return (
          <div
            key={user.id}
            onClick={() => {
              navigate(`/${user.userId}`);
            }}
          >
            <ListItem userId={user.userId} />
          </div>
        );
      })}
    </div>
  );
};

export default UserListView;

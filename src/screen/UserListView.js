import React from "react";
import { useNavigate } from "react-router-dom";
import ListItem from "../component/ListItem";
import "../main.css";

const UserListView = ({ filterId, users2 }) => {
  let navigate = useNavigate();

  console.log("users2", users2);
  return (
    <div className="detail-box">
      <h1>UserList : {filterId.length}명</h1>
      {users2.map((user) => {
        return (
          <div
            key={user.id}
            onClick={() => {
              navigate(`/${user.id}`);
            }}
          >
            <ListItem userId={user.id} title={user.name} email={user.email} />
          </div>
        );
      })}
    </div>
  );
};

export default UserListView;

import React from "react";
import { useNavigate } from "react-router-dom";
import ListItem from "../component/ListItem";
import "../main.css";
import { useRecoilState } from "recoil";
import { userListAtom } from "../atom";

const UserListView = () => {
  let navigate = useNavigate();
  const [userList, setUserList] = useRecoilState(userListAtom);

  return (
    <div className="detail-box">
      <h1>UserList : {userList.length}명</h1>
      {userList.map((user) => {
        return (
          <div
            key={user.id}
            onClick={() => {
              navigate(`/${user.id}`);
            }}
          >
            <ListItem
              userId={user.id}
              title={user.name}
              email={user.email}
              img={true}
            />
          </div>
        );
      })}
    </div>
  );
};

export default UserListView;

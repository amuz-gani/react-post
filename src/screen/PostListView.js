import { tab } from "@testing-library/user-event/dist/tab";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ListItem from "../component/ListItem";
import { useRecoilState } from "recoil";
import { userListAtom } from "../atom";
import { postListAtom } from "../atom";

const PostListView = ({ filterId }) => {
  let navigate = useNavigate();

  const [userList, setUserList] = useRecoilState(userListAtom);
  const [postListdata, setPostList] = useRecoilState(postListAtom);

  let [tabState, setTabState] = useState(0);

  let { id } = useParams();
  const userIdName = filterId[id - 1].userId;
  const postList = postListdata.filter((users) => users.userId === userIdName);

  const completedTure = postList.filter((users) => users.completed !== false);
  const completedFalse = postList.filter((users) => users.completed !== true);

  const tabs = [
    { name: "전체", href: "#", current: true },
    { name: "작성중", href: "#", current: false },
    { name: "완료", href: "#", current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="detail-box">
      <div className="pb-5 border-b border-gray-200 sm:pb-0">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          유저 : {userIdName}
        </h3>
        <div className="mt-3 sm:mt-4">
          <div className="sm:hidden">
            <label htmlFor="current-tab" className="sr-only">
              Select a tab
            </label>
            <select
              id="current-tab"
              name="current-tab"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              defaultValue={tabs.find((tab) => tab.current).name}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab, index) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tabState === index
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                  )}
                  onClick={() => {
                    setTabState(index);
                  }}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

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
                <ListItem userId={user.userId} title={user.title} img={true} />
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
                <ListItem userId={user.userId} title={user.title} img={true} />
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
                <ListItem userId={user.userId} title={user.title} img={true} />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default PostListView;

import React, { useState, Fragment, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../main.css";
import ListItem from "../component/ListItem";
import {
  EmojiHappyIcon,
  EmojiSadIcon,
  FireIcon,
  HeartIcon,
  PaperClipIcon,
  ThumbUpIcon,
  XIcon,
} from "@heroicons/react/solid";
import { Listbox, Transition } from "@headlessui/react";
import { useRecoilState } from "recoil";
import { commentListAtom } from "../atom";
import { userListAtom } from "../atom";
import { postListAtom } from "../atom";

const DetailView = ({ filterId }) => {
  const [userList, setUserList] = useRecoilState(userListAtom);
  const [postList, setPostList] = useRecoilState(postListAtom);
  const [comment, setComment] = useRecoilState(commentListAtom);

  let { id, postid } = useParams();
  let navigate = useNavigate();
  const [commentPlus, setCommentPlus] = useState();
  const IdName = postList[postid - 1].id;
  const postDetail = postList.filter((postList) => postList.id === IdName);
  const userIdName = filterId[id - 1].userId;
  const pageList = postList.filter(
    (postList) => postList.userId === userIdName
  );

  const min = pageList[0].id;
  const max = pageList[pageList.length - 1].id;

  const nowDetail = postDetail[0].id;
  const pre = pageList.filter((pageList) => pageList.id + 1 === nowDetail);
  const next = pageList.filter((pageList) => pageList.id - 1 === nowDetail);

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

  const filterComment = comment.filter(
    (comment) => comment.postId === nowDetail
  );

  const plusComment = [];

  const addComment = () => {
    let value = document.querySelector("#new-content").value;
    const plusComment = [
      {
        body: value,
        email: "유저 이메일",
        id: filterComment.length + 1,
        name: "gani",
        postId: nowDetail,
      },
    ];
    setComment(comment.concat(plusComment));
  };

  const commentResult = filterComment.concat(plusComment);

  const getReplyList = () => {
    return (
      <>
        <div className="pb-8">
          {commentResult.length === 0 ? (
            <p className="mt-2 max-w-4xl text-sm">댓글이 없습니다</p>
          ) : (
            <p className="mt-2 max-w-4xl text-sm">
              댓글 {commentResult.length}개
            </p>
          )}
          <div className="flow-root mt-3">
            <ul role="list" className="-my-5 divide-y divide-gray-200">
              {commentResult.map((comment, index) => (
                <li key={index} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {comment.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {comment.body}
                      </p>
                    </div>
                    <div>
                      <a
                        href="#"
                        className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="detail-box">
        <div className="pb-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            현재글: {postDetail[0].title}
          </h3>
          <p className="mt-2 max-w-4xl text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div>{getReplyList()}</div>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <form action="#" className="relative">
              <div className="px-4 border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <label htmlFor="comment" className="sr-only">
                  Add your comment
                </label>
                <textarea
                  rows={3}
                  id="new-content"
                  className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
                  placeholder="Add your comment..."
                  defaultValue={""}
                />

                <div className="py-2" aria-hidden="true">
                  <div className="py-px">
                    <div className="h-9" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between">
                <div className="flex items-center space-x-5">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="-m-2.5 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500"
                    >
                      <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">Attach a file</span>
                    </button>
                  </div>
                  <div className="flex items-center">
                    <Listbox>
                      {({ open }) => (
                        <>
                          <Listbox.Label className="sr-only">
                            Your mood
                          </Listbox.Label>
                          <div className="relative">
                            <Listbox.Button className="relative -m-2.5 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500">
                              <span className="flex items-center justify-center">
                                <span>
                                  <EmojiHappyIcon
                                    className="flex-shrink-0 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  <span className="sr-only">Add your mood</span>
                                </span>
                              </span>
                            </Listbox.Button>
                          </div>
                        </>
                      )}
                    </Listbox>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => {
                      addComment();
                    }}
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <p className="mt-6"></p>
        {postDetail[0].id === pageList[0].id ? (
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
        ) : postDetail[0].id === pageList[pageList.length - 1].id ? (
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

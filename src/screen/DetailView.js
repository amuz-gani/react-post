import React, { useState, Fragment } from "react";
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

const DetailView = ({ users, filterId, comment }) => {
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

  let filterComment = comment.filter((comment) => comment.postId === nowDetail);

  console.log("filterComment", filterComment);

  const moods = [
    {
      name: "Excited",
      value: "excited",
      icon: FireIcon,
      iconColor: "text-white",
      bgColor: "bg-red-500",
    },
    {
      name: "Loved",
      value: "loved",
      icon: HeartIcon,
      iconColor: "text-white",
      bgColor: "bg-pink-400",
    },
    {
      name: "Happy",
      value: "happy",
      icon: EmojiHappyIcon,
      iconColor: "text-white",
      bgColor: "bg-green-400",
    },
    {
      name: "Sad",
      value: "sad",
      icon: EmojiSadIcon,
      iconColor: "text-white",
      bgColor: "bg-yellow-400",
    },
    {
      name: "Thumbsy",
      value: "thumbsy",
      icon: ThumbUpIcon,
      iconColor: "text-white",
      bgColor: "bg-blue-500",
    },
    {
      name: "I feel nothing",
      value: null,
      icon: XIcon,
      iconColor: "text-gray-400",
      bgColor: "bg-transparent",
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [selected, setSelected] = useState(moods[5]);
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
        <div className="pb-8">
          {filterComment.length === 0 ? (
            <p className="mt-2 max-w-4xl text-sm">댓글이 없습니다</p>
          ) : (
            <p className="mt-2 max-w-4xl text-sm">
              댓글 {filterComment.length}개
            </p>
          )}
          <div className="flow-root mt-3">
            <ul role="list" className="-my-5 divide-y divide-gray-200">
              {filterComment.map((comment) => (
                <li key={comment.handle} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={comment.imageUrl}
                        alt=""
                      />
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
        //댓글달기
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <img
              className="inline-block h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1">
            <form action="#" className="relative">
              <div className="px-4 border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <label htmlFor="comment" className="sr-only">
                  Add your comment
                </label>
                <textarea
                  rows={3}
                  name="comment"
                  id="comment"
                  className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
                  placeholder="Add your comment..."
                  defaultValue={""}
                />

                {/* Spacer element to match the height of the toolbar */}
                <div className="py-2" aria-hidden="true">
                  {/* Matches height of button in toolbar (1px border + 36px content height) */}
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
                    <Listbox value={selected} onChange={setSelected}>
                      {({ open }) => (
                        <>
                          <Listbox.Label className="sr-only">
                            Your mood
                          </Listbox.Label>
                          <div className="relative">
                            <Listbox.Button className="relative -m-2.5 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-500">
                              <span className="flex items-center justify-center">
                                {selected.value === null ? (
                                  <span>
                                    <EmojiHappyIcon
                                      className="flex-shrink-0 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                    <span className="sr-only">
                                      Add your mood
                                    </span>
                                  </span>
                                ) : (
                                  <span>
                                    <span
                                      className={classNames(
                                        selected.bgColor,
                                        "w-8 h-8 rounded-full flex items-center justify-center"
                                      )}
                                    >
                                      <selected.icon
                                        className="flex-shrink-0 h-5 w-5 text-white"
                                        aria-hidden="true"
                                      />
                                    </span>
                                    <span className="sr-only">
                                      {selected.name}
                                    </span>
                                  </span>
                                )}
                              </span>
                            </Listbox.Button>

                            {/* <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            > */}
                            {/* <Listbox.Options className="absolute z-10 mt-1 -ml-6 w-60 bg-white shadow rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                                {moods.map((mood) => (
                                  <Listbox.Option
                                    key={mood.value}
                                    className={({ active }) =>
                                      classNames(
                                        active ? "bg-gray-100" : "bg-white",
                                        "cursor-default select-none relative py-2 px-3"
                                      )
                                    }
                                    value={mood}
                                  >
                                    <div className="flex items-center">
                                      <div
                                        className={classNames(
                                          mood.bgColor,
                                          "w-8 h-8 rounded-full flex items-center justify-center"
                                        )}
                                      >
                                        <mood.icon
                                          className={classNames(
                                            mood.iconColor,
                                            "flex-shrink-0 h-5 w-5"
                                          )}
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <span className="ml-3 block font-medium truncate">
                                        {mood.name}
                                      </span>
                                    </div>
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options> */}
                            {/* </Transition> */}
                          </div>
                        </>
                      )}
                    </Listbox>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <p className="mt-6"></p>
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

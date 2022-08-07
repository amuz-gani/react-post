import React from "react";
import "../main.css";

const ListItem = (props) => {
  return (
    // <>
    //   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    //     {props.userId} {props.pn} {props.title}
    //   </div>
    // </>
    <div className="py-2">
      <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
        {/* <img
          className="flex-shrink-0 w-10 rounded-full"
          src={
            props.img
            // "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          }
          alt=""
        /> */}
        <div className="flex-1 min-w-0">
          <a href="#" className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">
              {props.userId} {props.pn} {props.title}
            </p>
            <p className="text-sm text-gray-500 truncate">{props.email}</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ListItem;

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
        {props.img === true ? (
          <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
            <svg
              className="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        ) : (
          ""
        )}
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

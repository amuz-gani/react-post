import React from "react";
import "../main.css";

const ListItem = (props) => {
  return (
    <>
      <div className="list-Item">
        {props.userId} {props.pn} {props.title}
      </div>
    </>
  );
};

export default ListItem;

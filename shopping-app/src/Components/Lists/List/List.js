import React from "react";
import list_avatar from "../../../list_avatar.png";
import "./List_style.css";
const List = (props) => {
  return (
    <div className="list_container">
      <img src={list_avatar} alt="list_image" />
      <div className="list_details">
        <p className="list_name">List name</p>
        <p className="created_by">Created By: Sergei</p>
      </div>
    </div>
  );
};

export default List;

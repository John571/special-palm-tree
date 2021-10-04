import React from "react";
import list_avatar from "../../../src/list_avatar.png";
import "./List_style.css";
const List = ({ data, key, setList }) => {
  return (
    <div className="list_container" onClick={() => setList()}>
      <img src={list_avatar} alt="list_image" />
      <div className="list_details">
        <p className="list_name">{data.list_name}</p>
        <p className="created_by">{data.list_description}</p>
      </div>
    </div>
  );
};

export default List;

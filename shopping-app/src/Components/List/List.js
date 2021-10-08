import React from "react";
import list_avatar from "../../../src/list_avatar.png";
import "./List_style.css";
const List = ({ data, key, setList, delete_list, invite_open, info_open }) => {
  return (
    <div className="list_container" onClick={() => setList()}>
      <img src={list_avatar} alt="list_image" />
      <div className="list_details">
        <p className="list_name">{data.list_name}</p>
        <p className="created_by">{data.list_description}</p>
      </div>
      <button
        className="list_invite"
        onClick={() => {
          setList();
          info_open();
        }}
      >
        Info
      </button>
      <button
        className="list_invite"
        onClick={() => {
          setList();
          invite_open();
        }}
      >
        Invite
      </button>
      <button className="list_delete" onClick={async () => await delete_list()}>
        Delete
      </button>
    </div>
  );
};

export default List;

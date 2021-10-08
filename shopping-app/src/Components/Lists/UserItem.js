import React from "react";
import "./UserItem.css";
const UserItem = ({ item_data, addUser }) => {
  return (
    <div className="user_item_container" onClick={async () => await addUser()}>
      <hr />
      <span className="user_name">{item_data.user_name} </span>{" "}
      <span className="user_description">{item_data.user_bio}</span>
      <span className="user_details">
        {item_data.user_city} {item_data.user_country}
      </span>
    </div>
  );
};

export default UserItem;

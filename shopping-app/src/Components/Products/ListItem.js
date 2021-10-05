import React from "react";
import "./ListItem.css";
const ListItem = ({ item_data, addItem }) => {
  return (
    <div className="list_item_container" onClick={async () => await addItem()}>
      <img
        className="item_pic"
        src={item_data.item_picture}
        alt={item_data.item_description}
      />
      <hr />
      <span className="item_name">
        {item_data.item_name}{" "}
        <span className="item_description">{item_data.item_quantity}</span>
      </span>
      <span className="item_description">{item_data.item_description}</span>
      <span className="item_details">
        {item_data.item_brand} {item_data.item_country}
      </span>
    </div>
  );
};

export default ListItem;

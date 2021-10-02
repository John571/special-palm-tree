import React from "react";
import "./Item.css";
import list_avatar from "../../../src/list_avatar.png";
const Item = (props) => {
  return (
    <div className="item_container">
      <img src={list_avatar} alt="list_image" />
      <div className="item_details">
        <p className="product_name">Product Name</p>
        <p className="product_details">Product Details</p>
      </div>
      <button className="item_v_button">V</button>
      <button className="item_x_button">X</button>
    </div>
  );
};

export default Item;

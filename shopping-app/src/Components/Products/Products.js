import React from "react";
import "./Products.css";
import Item from "../Item/Item";

const Products = (props) => {
  return (
    <div className="products_container">
      <div className="products_list_chat">
        <div className="products_list">
          <h2>Item List</h2>
        </div>
        <div className="products_chat">
          <h2>List Chat</h2>
        </div>
      </div>
      <div className="products_items_list">
        <Item />
      </div>
      <div className="products_add_product">
        {/* Replace button with icon */}
        <button className="products_add_button">
          <span>Add Item</span>
        </button>
      </div>
    </div>
  );
};

export default Products;

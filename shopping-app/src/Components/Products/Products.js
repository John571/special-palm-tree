import React from "react";
import "./Products.css";

const Products = (props) => {
  return (
    <div className="products_container">
      <div className="products_list_chat">
        <div className="products_list">
          <h2>Your List</h2>
        </div>
        <div className="products_chat">
          <h2>Your Chat</h2>
        </div>
      </div>
    </div>
  );
};

export default Products;

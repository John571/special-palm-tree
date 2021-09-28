import React from "react";
import List from "./List/List";
import "./Lists.css";
const Lists = (props) => {
  return (
    <div className="lists-container">
      <h2>
        Your lists <hr />
      </h2>
      <List />
      <List />
      <List />
      <List />
      <List />
      <List />
    </div>
  );
};

export default Lists;

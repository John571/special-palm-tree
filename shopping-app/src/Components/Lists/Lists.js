import { React, useEffect, useState } from "react";
import List from "./List/List";
import "./Lists.css";
let lists = null;
let fetchListsById = (u_id) => {
  return;
};
const Lists = (props) => {
  useEffect(fetchListsById);
  return (
    <div className="lists-container">
      <h2>
        Your lists <hr />
      </h2>
      <List />
      <List />
      <List />
      <List />
    </div>
  );
};

export default Lists;

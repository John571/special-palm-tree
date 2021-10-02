import { React, useEffect, useState } from "react";
import List from "../List/List";
import "./Lists.css";
let lists = null;
let fetchListsById = (u_id) => {
  return;
};
const Lists = (props) => {
  useEffect(fetchListsById);
  return (
    <div className="lists_grid">
      <div className="lists-container">
        <h2 style={{ borderBottom: "1px solid black" }}>Your lists</h2>
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
      </div>
      <div className="lists_add">
        <button className="add_list_button">Add List</button>
      </div>
    </div>
  );
};

export default Lists;

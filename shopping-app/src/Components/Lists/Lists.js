import { React, useEffect, useState } from "react";
import axios from "axios";
import List from "../List/List";
import "./Lists.css";

const Lists = ({ id }) => {
  const [lists, setLists] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const result = await axios({
      url: "http://localhost:4000/lists",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      data: { usr_id: id },
    });
    setLists(result.data.content);
  }, [id]);
  return (
    <div className="lists_grid">
      <div className="lists-container">
        <h2 style={{ borderBottom: "1px solid black" }}>Your lists</h2>
        {console.log(lists)}
        {lists.map((l) =>
          l ? <List data={l._id} key={l._id._id} /> : "No lists yet"
        )}
      </div>
      <div className="lists_add">
        {/* Replace button with icon */}
        <button className="add_list_button">Add List</button>
      </div>
    </div>
  );
};

export default Lists;

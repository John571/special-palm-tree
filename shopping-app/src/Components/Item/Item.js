import React, { useState } from "react";
import axios from "axios";
import "./Item.css";
import list_avatar from "../../../src/list_avatar.png";
const Item = ({ data, reload, l_id }) => {
  const [completed1, setCompleted] = useState(data.completed);
  const [amount1, setAmount] = useState(data._id.amount);
  const update = async (status) => {
    if (status === completed1) return;
    setCompleted(status);
    console.log(
      `sending update to list ${l_id} to item ${data._id._id} with ${status}`
    );
    const result = await axios({
      url: "http://localhost:4000/lists_items",
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      data: {
        list_id: l_id,
        item_id: data._id._id,
        state: {
          amount: amount1,
          completed: status,
        },
      },
    });
    await reload();
  };
  return (
    <div className="item_container">
      <img src={data._id.item_picture} alt="list_image" />
      <div className="item_details">
        <p className="product_name">{data._id.item_name}</p>
        <p className="product_details">
          {data._id.item_description} {data._id.item_quantity}
        </p>
        <p className="product_brand">
          {data._id.item_brand} {data._id.item_country}
        </p>
      </div>
      <button
        className={`item_v_button ${completed1 && "marked green"}`}
        onClick={() => {
          update(true);
        }}
      >
        V
      </button>
      <button
        className={`item_x_button ${!completed1 && "marked red"}`}
        onClick={() => update(false)}
      >
        X
      </button>
    </div>
  );
};

export default Item;

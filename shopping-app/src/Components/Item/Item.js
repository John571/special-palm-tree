import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Item.css";
import list_avatar from "../../../src/list_avatar.png";
const Item = ({ data, reload, l_id }) => {
  const [completed1, setCompleted] = useState(data.completed);
  const [amount1, setAmount] = useState(data.amount);
  console.log(data.amount);
  const update = async (status, amnt = amount1, b = false) => {
    console.log("UPDATINGGGG");
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
          amount: b ? (amnt <= 0 ? 0 : amnt) : amount1,
          completed: status,
        },
      },
    });
    await reload();
  };
  const delete_list = async () => {
    const result = await axios({
      url: "http://localhost:4000/lists_items",
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
      data: {
        list_id: l_id,
        item_id: data._id._id,
      },
    });
    await reload();
  };
  const amount_handler = async (sign) => {
    let cur = amount1;
    if (sign === "+") {
      setAmount(cur + 1);
      await update(completed1, cur + 1, true);
    } else {
      setAmount(cur <= 0 ? 0 : cur - 1);
      await update(completed1, cur - 1, true);
    }
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
      <div className="item_amount">
        <button onClick={() => amount_handler("+")}>+</button>
        <span>{amount1}</span>
        <button onClick={() => amount_handler("-")}>-</button>
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
      <button
        className={`item_delete_button`}
        onClick={() => {
          delete_list(true);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Item;

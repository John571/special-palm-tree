import React, { useState, useEffect } from "react";
import axios from "axios";
import ListItem from "./ListItem";
import send_to_chat from "../../helpers/chat";
import "./AddProduct.css";
const AddProduct = ({ u_id, l_id, reload, u_name }) => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  let s_ref = React.createRef();
  const get_items = async () => {
    const result = await axios({
      url: "http://shoppingcontroller.eastus.azurecontainer.io:4000/lists_items_search",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      data: {
        item_name: search,
      },
    });
    if (result.data.content.length) setItems(result.data.content);
    else setItems([]);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    search === "" ? setLoading(false) : setLoading(true);
    await get_items();
  }, [search]);

  const add_item_to_list = async (i_id, i_name) => {
    const result = await axios({
      url: "http://shoppingcontroller.eastus.azurecontainer.io:4000/lists_items",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      data: {
        usr_id: u_id,
        list_id: l_id,
        item_id: i_id,
      },
    });
    if (result.data.content.status === "already_in")
      setStatus(`${i_name} is already in list`);
    else {
      setStatus(`${i_name} added to list`);
      send_to_chat(
        l_id,
        "System",
        `${localStorage.getItem("user_name")} added ${i_name}`
      );
      await reload();
    }
  };

  return (
    <div className="add_product_container">
      <h2>Add Item</h2>
      <span className="add_product_status">{status}</span>
      <input
        ref={s_ref}
        type="text"
        className="product_search"
        placeholder=" Type your search here..."
        value={search}
        onInput={() => setSearch(s_ref.current.value)}
      />
      <div className="items_container">
        {items.length === 0 ? (
          <>
            <h2></h2>
            <h2>{loading ? "Searching for items..." : "Type item name"}</h2>
            <h2></h2>
          </>
        ) : (
          items.map((i) => (
            <ListItem
              item_data={i}
              key={i._id}
              addItem={async () => add_item_to_list(i._id, i.item_name)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AddProduct;

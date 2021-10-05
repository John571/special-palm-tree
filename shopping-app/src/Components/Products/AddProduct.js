import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProduct.css";
const AddProduct = (props) => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  let s_ref = React.createRef();
  const get_items = async () => {
    const result = await axios({
      url: "http://localhost:4000/lists_items_search",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      data: {
        item_name: search,
      },
    });
    if (result.data.content.length) console.log(result.data.content);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await get_items();
  }, [search]);
  return (
    <div className="add_product_container">
      <h2>Add Item</h2>
      <input
        ref={s_ref}
        type="text"
        className="product_search"
        placeholder=" Type your search here..."
        value={search}
        onInput={() => setSearch(s_ref.current.value)}
      />
      <div className="items_container"></div>
    </div>
  );
};

export default AddProduct;

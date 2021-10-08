import { React, useState, useEffect } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import AddProduct from "./AddProduct";
import "./Products.css";
import Item from "../Item/Item";

const Products = ({ l_id, u_id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [addItemModal, setaddItemModal] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getLists = async (list_id) => {
    console.log("reloading");
    setIsLoading(true);
    const result = await axios({
      url: "http://localhost:4000/lists_items_get",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      data: { list_id: list_id },
    });
    if (result.data.content && "list_items" in result.data.content) {
      console.log(
        `setting items to ${JSON.stringify(result.data.content.list_items)}`
      );
      setItems(result.data.content.list_items);
    } else if (result.data.content === null) setItems([]);
    setIsLoading(false);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await getLists(l_id);
  }, [l_id]);
  return (
    <>
      <ReactModal
        isOpen={addItemModal}
        onRequestClose={() => setaddItemModal(false)}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            height: "50%",
          },
        }}
      >
        <AddProduct
          l_id={l_id}
          u_id={u_id}
          reload={async () => await getLists(l_id)}
        />
      </ReactModal>
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
          {isLoading ? (
            <div>Loading items...</div>
          ) : items.length === 0 ? (
            "No items here yet"
          ) : (
            items.map((i) => (
              <Item
                data={i}
                key={i._id._id}
                reload={async () => await getLists(l_id)}
                l_id={l_id}
              />
            ))
          )}
        </div>
        <div className="products_add_product">
          {/* Replace button with icon */}
          <button
            className="products_add_button"
            onClick={() => setaddItemModal(true)}
            disabled={!l_id}
          >
            <span>Add Item</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Products;

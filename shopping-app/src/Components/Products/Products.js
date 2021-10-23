import { React, useState, useEffect } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import AddProduct from "./AddProduct";
import "./Products.css";
import Item from "../Item/Item";

const Products = ({ l_id, u_id, u_name, msg, chatMsg }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [addItemModal, setaddItemModal] = useState(false);
  const [chat, setChat] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getLists = async (list_id) => {
    console.log("reloading");
    setIsLoading(true);
    const result = await axios({
      url: "http://shoppingcontroller.eastus.azurecontainer.io:4000/lists_items_get",
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

  const getMessages = async (list_id) => {
    setIsChatLoading(true);
    try {
      const result = await axios({
        url: `http://messagescontainer.uaenorth.azurecontainer.io/api/Chat/${list_id}`,
        method: "GET",
      });
      if (result && result.data) {
        console.log(`setting messages to ${JSON.stringify(result.data.msg)}`);
        setMessages(result.data.msg);
      } else {
        console.log("ERROR");
        setMessages([]);
      }
    } catch (err) {
      console.log(err);
      setMessages([]);
    }
    setIsChatLoading(false);
    console.log(messages);
    let d = document.getElementsByClassName("chat_messages")[0];
    d.scrollTop = d.scrollHeight;
  };

  const sendMsg = async (e) => {
    const result = await axios({
      url: `http://messagescontainer.uaenorth.azurecontainer.io/api/Chat`,
      method: "POST",
      data: {
        id: l_id,
        msg: [
          {
            userName: u_name,
            msg: message,
          },
        ],
      },
    });

    const result2 = await axios({
      url: `http://shoppingcontroller.eastus.azurecontainer.io:4000/lists_chat`,
      method: "POST",
      data: {
        l_id: l_id,
      },
    });

    setMessage("");

    await getMessages(l_id);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await getLists(l_id);
  }, [l_id]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (chat === false) return;
    await getMessages(l_id);
  }, [chat]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (chat === false) return;
    await getMessages(l_id);
  }, [chatMsg]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (msg === (l_id || sessionStorage.getItem("list_id")))
      await getMessages(l_id);
    await getLists(l_id);
  }, [msg]);

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
          <div
            className={`products_list ${!chat ? "active" : ""}`}
            onClick={() => setChat(false)}
          >
            <h2>Item List</h2>
          </div>
          <div
            className={`products_chat ${chat ? "active" : ""}`}
            onClick={() => setChat(true)}
          >
            <h2>List Chat</h2>
          </div>
        </div>
        {!chat ? (
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
                  i_id={i._id._id}
                  l_id={l_id}
                />
              ))
            )}
          </div>
        ) : (
          <div className="products_items_chat">
            <div className="chat_messages">
              {isChatLoading
                ? "Loading Messages"
                : messages
                ? messages.map((m) => (
                    <div
                      className={`message ${
                        m.userName !== u_name ? "right" : ""
                      }`}
                    >
                      <span>
                        <b>{m.userName}</b>
                      </span>
                      <span>{m.msg}</span>
                      <span>{m.date}</span>
                    </div>
                  ))
                : "No Messages yet"}
            </div>
            <div>
              <input
                type="text"
                placeholder="Type Your Message"
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
              />
            </div>
          </div>
        )}
        <div className="products_add_product">
          {/* Replace button with icon */}
          <button
            className="products_add_button"
            onClick={
              !chat
                ? () => {
                    setaddItemModal(true);
                  }
                : (e) => sendMsg(e)
            }
            disabled={!l_id || (chat && message === "") || isChatLoading}
          >
            <span>{!chat ? `Add Item` : `Send Message`}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Products;

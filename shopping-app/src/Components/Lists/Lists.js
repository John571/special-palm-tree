import { React, useEffect, useState } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import AddList from "./AddList";
import List from "../List/List";
import "./Lists.css";

const Lists = ({ id, setList }) => {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addListmodal, setaddListModal] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setIsLoading(true);
    const result = await axios({
      url: "http://localhost:4000/lists",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      data: { usr_id: id },
    });
    setLists(result.data.content);
    setIsLoading(false);
  }, [id]);
  return (
    <>
      <ReactModal
        isOpen={addListmodal}
        onRequestClose={() => setaddListModal(false)}
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
          },
        }}
      >
        <AddList />
      </ReactModal>
      <div className="lists_grid">
        <div className="lists-container">
          <h2 style={{ borderBottom: "1px solid black" }}>Your lists</h2>
          {!isLoading ? (
            lists.map((l) =>
              l ? (
                <List
                  data={l._id}
                  key={l._id._id}
                  setList={() => setList(l._id._id)}
                />
              ) : (
                "No lists yet"
              )
            )
          ) : (
            <div>Loading Lists...</div>
          )}
        </div>
        <div className="lists_add">
          {/* Replace button with icon */}
          <button
            className="add_list_button"
            onClick={() => setaddListModal(true)}
          >
            Add List
          </button>
        </div>
      </div>
    </>
  );
};

export default Lists;

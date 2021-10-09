import { React, useEffect, useState } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import AddList from "./AddList";
import List from "../List/List";
import Invite from "./Invite";
import ListInfo from "./ListInfo";
import "./Lists.css";

const Lists = ({ id, setList, l_id, msg }) => {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addListmodal, setaddListModal] = useState(false);
  const [inviteModal, setinviteModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [curList, setCurList] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reload = async () => {
    console.log("reloading");
    setIsLoading(true);
    const result = await axios({
      url: "http://localhost:4000/lists_get",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      data: {
        usr_id: id,
        token: sessionStorage.getItem("user_token"),
      },
    });
    setLists(result.data.content);
    setIsLoading(false);
  };

  const delete_list = async (l_id) => {
    const result = await axios({
      url: "http://localhost:4000/lists",
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
      data: { list_id: l_id, token: sessionStorage.getItem("user_token") },
    });
    await reload();
    setList(0);
  };

  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    reload();
  }, [id]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (msg === id) await reload();
  }, [msg]);

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
            width: "50%",
            height: "50%",
          },
        }}
      >
        <AddList id={id} reload={reload} close={() => setaddListModal(false)} />
      </ReactModal>
      <ReactModal
        //Invite to List
        isOpen={inviteModal}
        onRequestClose={() => setinviteModal(false)}
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
        <Invite
          id={curList}
          reload={reload}
          close={() => setinviteModal(false)}
        />
      </ReactModal>
      <ReactModal // List info
        isOpen={infoModal}
        onRequestClose={() => setInfoModal(false)}
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
        <ListInfo id={curList} />
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
                  setList={() => {
                    setList(l._id._id);
                    sessionStorage.setItem("list_id", l._id._id);
                  }}
                  delete_list={() => delete_list(l._id._id)}
                  invite_open={() => {
                    setinviteModal(true);
                    setCurList(l._id._id);
                    setList(l._id._id);
                    sessionStorage.setItem("list_id", l._id._id);
                  }}
                  info_open={() => {
                    setInfoModal(true);
                    setCurList(l._id._id);
                    setList(l._id._id);
                    sessionStorage.setItem("list_id", l._id._id);
                  }}
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

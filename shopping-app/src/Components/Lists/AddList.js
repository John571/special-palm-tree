import React, { useState } from "react";
import axios from "axios";
import "./AddList.css";
const AddList = ({ id, reload, close }) => {
  let list_name = React.createRef();
  let list_desc = React.createRef();
  let status_msg = React.createRef();
  let [s_msg, sets_msg] = useState("Type List Name & Description");
  let [b_dis, setb_dis] = useState(true);
  const check_inputs = () => {
    let msg = "";
    if (list_name.current.value === "") msg += " Type List Name";
    if (list_desc.current.value === "") msg += " Type List Description";
    if (msg !== "") {
      setb_dis(true);
      status_msg.current.value = msg;
    } else {
      msg = "Create List";
      setb_dis(false);
    }
    sets_msg(msg);
  };
  const create_list = async () => {
    if (b_dis) {
      return;
    }
    const result = await axios({
      url: "http://localhost:4000/lists",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      data: {
        usr_id: id,
        list_name: list_name.current.value,
        list_description: list_desc.current.value,
        token: localStorage.getItem("user_token"),
      },
    });
    await reload();
    close();
  };
  return (
    <div className="add_list_container">
      <div>
        <h2>Create List</h2>
        <hr />
      </div>
      <div>
        <p>
          List Name:{" "}
          <input type="text" onChange={check_inputs} ref={list_name} />
        </p>
        <p>
          List Description:{" "}
          <input type="text" onChange={check_inputs} ref={list_desc} />
        </p>
      </div>
      <button
        disabled={b_dis}
        style={{ cursor: "pointer" }}
        onClick={create_list}
      >
        <p ref={status_msg}>{s_msg}</p>
      </button>
    </div>
  );
};

export default AddList;

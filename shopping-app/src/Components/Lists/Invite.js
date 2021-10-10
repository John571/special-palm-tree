import React, { useState, useEffect } from "react";
import axios from "axios";
import UserItem from "./UserItem";
import "./Invite.css";
const Invite = ({ id, reload, close }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  let s_ref = React.createRef();
  const get_users = async () => {
    const result = await axios({
      url: "http://shoppingcontroller.eastus.azurecontainer.io:4000/users_search",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      data: {
        item_name: search,
        token: sessionStorage.getItem("user_token"),
      },
    });
    if (result.data.content.length) setUsers(result.data.content);
    else setUsers([]);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    search === "" ? setLoading(false) : setLoading(true);
    await get_users();
  }, [search]);

  const add_user_to_list = async (u_id, i_name) => {
    const result = await axios({
      url: "http://shoppingcontroller.eastus.azurecontainer.io:4000/lists_invite",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      data: {
        usr_id: u_id,
        list_id: id,
        token: sessionStorage.getItem("user_token"),
      },
    });
    if (result.data.content.status === "already_in")
      setStatus(`${i_name} is already in list`);
    else {
      setStatus(`${i_name} added to list`);
      await reload();
    }
  };

  return (
    <div className="add_user_container">
      <h2>Add User</h2>
      <span className="add_user_status">{status}</span>
      <input
        ref={s_ref}
        type="text"
        className="user_search"
        placeholder=" Type your search here..."
        value={search}
        onInput={() => setSearch(s_ref.current.value)}
      />
      <div className="users_container">
        {users.length === 0 ? (
          <>
            <h2></h2>
            <h2>{loading ? "Searching for users..." : "Type user name"}</h2>
            <h2></h2>
          </>
        ) : (
          users.map((i) => (
            <UserItem
              item_data={i}
              key={i._id}
              addUser={async () => add_user_to_list(i._id, i.user_name)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Invite;

import React, { useEffect, useState } from "react";
import axios from "axios";
const ListInfo = ({ id }) => {
  const [info, setInfo] = useState({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const result = await axios({
      url: "http://localhost:4000/lists_info",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      data: { list_id: id },
    });
    setInfo(result.data.content);
  }, [id]);

  return (
    <div>
      <h2>List Info</h2>
      <hr />
      <div>
        <p>List Name: {info.list_name}.</p>
        <p> List Description: {info.list_description}</p>
      </div>
      <div className="list_participants">
        Users in list:
        {info.list_participants
          ? info.list_participants.map((i) => {
              return (
                <p>
                  <b>{i._id.user_name}</b>
                </p>
              );
            })
          : "No users in this list"}
      </div>
    </div>
  );
};

export default ListInfo;

import axios from "axios";

let send_to_chat = async (l_id, u_name, message) => {
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
  return result;
};

export default send_to_chat;

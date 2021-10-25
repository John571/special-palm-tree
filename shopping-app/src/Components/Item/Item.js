import React, { useState } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import send_to_chat from "../../helpers/chat";
import "./Item.css";
import list_avatar from "../../../src/list_avatar.png";
const Item = ({ data, reload, l_id, i_id, u_name }) => {
  const [completed1, setCompleted] = useState(data.completed);
  const [amount1, setAmount] = useState(data.amount);
  const [open, setOpen] = useState(false);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [error, setError] = useState("");

  const update = async (status, amnt = amount1, b = false, i_name) => {
    // console.log("UPDATINGGGG");
    setCompleted(status);
    // console.log(
    //   `sending update to list ${l_id} to item ${data._id._id} with ${status}`
    // );
    const result = await axios({
      url: "http://shoppingcontroller.eastus.azurecontainer.io:4000/lists_items",
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      data: {
        list_id: l_id,
        item_id: data._id._id,
        state: {
          amount: b ? (amnt <= 0 ? 0 : amnt) : amount1,
          completed: status,
        },
      },
    });
    send_to_chat(l_id, "System", `${u_name} updated ${data._id.item_name}`);
    await reload();
  };
  const delete_list = async (i_name) => {
    const result = await axios({
      url: "http://shoppingcontroller.eastus.azurecontainer.io:4000/lists_items",
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
      data: {
        list_id: l_id,
        item_id: data._id._id,
      },
    });
    send_to_chat(l_id, "System", `${u_name} deleted ${i_name}`);
    await reload();
  };
  const amount_handler = async (sign) => {
    let cur = amount1;
    if (sign === "+") {
      setAmount(cur + 1);
      await update(completed1, cur + 1, true);
    } else {
      setAmount(cur <= 0 ? 0 : cur - 1);
      await update(completed1, cur - 1, true);
    }
    send_to_chat(
      l_id,
      "System",
      `${u_name} changed ${data._id.item_name}'s amount`
    );
  };
  const changeHandler = (e) => {
    if (
      !(
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpeg"
      )
    ) {
      console.log(e.target.files[0]);

      console.log("Please choose a valid image");
      setIsFilePicked(false);
      setSelectedFile(null);
      setError("Please choose an image file");
      return;
    } else {
      setSelectedFile(e.target.files[0]);
      setIsFilePicked(true);
      setError("");
      console.log(e.target.files[0]);
    }
  };
  const guid = () => {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000);
    };
    return `${s4()}-${s4()}`;
  };
  const handleUpload = async () => {
    if (!isFilePicked) return;
    const formData = new FormData();
    formData.append("photo", selectedFile);
    formData.append("id", guid());
    setError("Uploading...");
    setIsFilePicked(false);
    const result = await axios({
      url: "http://imageservicecontainer.eastus.azurecontainer.io/Images/",
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
      method: "POST",
      data: formData,
    });
    if (result.status !== 201) {
      setError("Error uploading. Try again later.");
      setIsFilePicked(false);
      setSelectedFile(null);
      return;
    }
    let photo = result.data.photo;

    const result2 = await axios({
      url: "http://shoppingcontroller.eastus.azurecontainer.io:4000/lists_items_photo",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      data: {
        list_id: l_id,
        item_id: data._id._id,
        photo_url: photo,
      },
    });
    setError("");
    setSelectedFile(null);
    await reload();
    setOpen(false);
  };
  return (
    <div className="item_container">
      <ReactModal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
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
        <div className="modal_img_container">
          <h2>
            Item Image
            <hr />
          </h2>

          <img
            src={data.usr_img.url || data._id.item_picture}
            alt="list_image"
            className="modal_img"
          />
          <p>{error}</p>
          <input type="file" name="img_file" onChange={changeHandler} />
          <button disabled={!isFilePicked} onClick={handleUpload}>
            Change Image
          </button>
        </div>
      </ReactModal>
      <img
        src={data.usr_img.url || data._id.item_picture}
        alt="item_image"
        onClick={() => setOpen(true)}
      />
      <div className="item_details">
        <p className="product_name">{data._id.item_name}</p>
        <p className="product_details">
          {data._id.item_description} {data._id.item_quantity}
        </p>
        <p className="product_brand">
          {data._id.item_brand} {data._id.item_country}
        </p>
      </div>
      <div className="item_amount">
        <button onClick={() => amount_handler("+")}>+</button>
        <span>{amount1}</span>
        <button onClick={() => amount_handler("-")}>-</button>
      </div>
      <button
        className={`item_v_button ${completed1 && "marked green"}`}
        onClick={() => {
          update(true);
          send_to_chat(
            l_id,
            "System",
            `${u_name} marked ${data._id.item_name} green`
          );
        }}
      >
        V
      </button>
      <button
        className={`item_x_button ${!completed1 && "marked red"}`}
        onClick={() => {
          update(false);
          send_to_chat(
            l_id,
            "System",
            `${u_name} marked ${data._id.item_name} red`
          );
        }}
      >
        X
      </button>
      <button
        className={`item_delete_button`}
        onClick={() => {
          delete_list(data._id.item_name);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Item;

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import ReactModal from "react-modal";
const Login = ({ set_id, set_name }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);

  const handle_close = () => {
    setOpen(true);
  };
  const submit = async (e) => {
    e.preventDefault();
    const result = await axios({
      url: "http://localhost:4000/login",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      data: {
        email,
        password: pass,
      },
    });
    console.log(result.data);
    set_id(result.data._id);
    localStorage.setItem("user_id", result.data._id);
    localStorage.setItem("user_name", result.data.user_name);
    localStorage.setItem("user_token", result.data.token);
    set_name(result.data.user_name);
    setLogin(true);
  };
  if (login) return <Redirect to="/" />;
  return (
    <div>
      {!open ? (
        <ReactModal
          isOpen={true}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          onRequestClose={handle_close}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              height: "60%",
            },
          }}
        >
          <h2>Login</h2>
          <form className="login_form" onSubmit={submit}>
            <span>Email:</span>
            <input
              placeholder="email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <span>Password:</span>
            <input
              placeholder="password"
              required={true}
              type="password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <button type="submit" className="submit">
              Login
            </button>
          </form>
        </ReactModal>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

export default Login;

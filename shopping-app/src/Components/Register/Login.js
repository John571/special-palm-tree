import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import ReactModal from "react-modal";
const Login = ({ set_id, set_name }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);

  const handle_close = () => {
    setOpen(true);
  };
  const submit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const result = await axios({
      url: "http://shoppingcontroller.eastus.azurecontainer.io:4000/login",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      data: {
        email,
        password: pass,
      },
    });
    console.log(result.data);
    set_id(result.data._id);
    sessionStorage.setItem("user_id", result.data._id);
    sessionStorage.setItem("user_name", result.data.user_name);
    sessionStorage.setItem("user_token", result.data.token);
    set_name(result.data.user_name);
    setLogin(true);
    setLoading(false);
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
            <input
              placeholder="email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <input
              placeholder="password"
              required={true}
              type="password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <img
              src="https://cdn.dribbble.com/users/590596/screenshots/6200385/a--_converted_.gif"
              alt="Login"
            />
            <button type="submit" className="submit" disabled={loading}>
              {`${loading ? "Logging in..." : "Login"}`}
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

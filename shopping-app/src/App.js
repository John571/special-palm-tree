import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import io from "socket.io-client";
import "./App.css";
import Register from "./Components/Register/Register";
import Login from "./Components/Register/Login";
import Nav from "./Components/Nav/Nav";
import Home from "./acon";
import React from "react";
const SOC_END = "http://shoppingcontroller.eastus.azurecontainer.io:4000";
const socket = io(SOC_END);
function App() {
  const [message, setMessage] = useState(null);
  const [chat, setChat] = useState(null);
  const [l_id, setl_id] = useState(sessionStorage.getItem("list_id"));
  const [u_id, setu_id] = useState(sessionStorage.getItem("user_id"));
  const [u_name, setU_name] = useState(sessionStorage.getItem("user_name"));

  useEffect(() => {
    socket.on("message", (msg) => {
      if (
        msg === l_id ||
        msg === sessionStorage.getItem("list_id") ||
        msg === u_id ||
        msg === sessionStorage.getItem("user_id")
      ) {
        console.log("SETTING MESSAGE!!!");
        setMessage(null);
        setMessage(msg);
      }
    });
    socket.on("chat", (msg) => {
      if (msg === l_id || msg === sessionStorage.getItem("list_id")) {
        setChat(null);
        setChat(msg);
      }
    });
  }, []);

  useEffect(() => {
    console.log(`SOCKET: ${message}, LIST:${l_id}, USER:${u_id}`);
  }, [message]);

  return (
    <>
      <Nav
        set_id={setu_id}
        setl_id={setl_id}
        u_id={u_id}
        u_name={u_name}
        set_name={setU_name}
      />

      <div className="App">
        <BrowserRouter>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                u_id={u_id}
                setl_id={setl_id}
                l_id={l_id}
                msg={message}
                u_name={u_name}
                chat={chat}
              />
            )}
          />
          <Route
            path="/login"
            render={() => <Login set_id={setu_id} set_name={setU_name} />}
          />
          <Route exact path="/register" component={Register} />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

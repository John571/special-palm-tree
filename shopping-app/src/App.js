import { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import socketio from "socket.io-client";
import "./App.css";
import Register from "./Components/Register/Register";
import Login from "./Components/Register/Login";
import Nav from "./Components/Nav/Nav";
import Home from "./acon";
import React from "react";
const SOC_END = "http://127.0.0.1:4000";
function App() {
  // const socket = socketio(SOC_END);
  // socket.on("connection", () => {
  //   console.log("I'm connected");
  // });
  const [l_id, setl_id] = useState(null);
  const [u_id, setu_id] = useState(sessionStorage.getItem("user_id") || -1);
  const [u_name, setU_name] = useState(null);

  // let u_id = "613e393948e88d77ff784bba";
  return (
    <>
      <Nav set_id={setu_id} u_id={u_id} u_name={u_name} set_name={setU_name} />

      <div className="App">
        <BrowserRouter>
          <Route
            exact
            path="/"
            render={() => <Home u_id={u_id} setl_id={setl_id} l_id={l_id} />}
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

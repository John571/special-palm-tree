/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
const Nav = ({ set_id, u_id, u_name, set_name }) => {
  return (
    <ul>
      <li>
        <a href="/">Home</a>
      </li>
      {u_name === "null" || u_name === "" ? (
        <li>
          <a href="/login">Login</a>
        </li>
      ) : (
        ""
      )}
      {u_name === "null" || u_name === "" ? (
        <li>
          <a href="/register">Register</a>
        </li>
      ) : (
        ""
      )}
      {u_name !== "null" && u_name !== "" ? (
        <li className="name">
          <a href="#">Hello {u_name}</a>
        </li>
      ) : (
        ""
      )}
      {u_name !== "null" && u_name !== "" ? (
        <li className="logout">
          <a
            href="#"
            onClick={() => {
              sessionStorage.setItem("user_token", -1);
              sessionStorage.setItem("user_id", -1);
              sessionStorage.setItem("user_name", null);
              set_id(-1);
              set_name("");
              console.log("logout", sessionStorage.getItem("user_id"));
            }}
          >
            Log Out
          </a>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};

export default Nav;

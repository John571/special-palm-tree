/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
const Nav = ({ set_id, setl_id, u_id, u_name, set_name }) => {
  return (
    <ul>
      <li>
        <a href="/">Home</a>
      </li>
      {u_id === null ? (
        <li>
          <a href="/login">Login</a>
        </li>
      ) : (
        ""
      )}
      {u_name === null || u_name === null ? (
        <li>
          <a href="/register">Register</a>
        </li>
      ) : (
        ""
      )}
      {u_name !== null && u_name !== "" && u_id !== -1 ? (
        <li className="name">
          <a href="#">Hello {u_name}</a>
        </li>
      ) : (
        ""
      )}
      {u_name !== null && u_name !== "" ? (
        <li className="logout">
          <a
            href="#"
            onClick={() => {
              sessionStorage.removeItem("user_token");
              sessionStorage.removeItem("user_id");
              sessionStorage.removeItem("user_name");
              sessionStorage.removeItem("list_id");
              set_id(null);
              setl_id(null);
              set_name(null);
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

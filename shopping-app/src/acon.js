import React from "react";
import Lists from "./Components/Lists/Lists";
import Products from "./Components/Products/Products";
import "./acon.css";
const Home = ({ u_id, setl_id, l_id, msg, u_name, chat }) => {
  if (u_id === null || sessionStorage.getItem("user_id") === null) {
    console.log(sessionStorage.getItem("user_id"), u_id, u_name);
    return (
      <>
        <div className="home_cont">
          <h2>Welcome to Shopping App!</h2>
          <h2>Please Login or Register</h2>
          <h2>to continue</h2>
        </div>
        <div>
          <img
            className="home_img"
            src="https://uploads-ssl.webflow.com/5e3ce2ec7f6e53c045fe7cfa/603debd83291d9a8f92383ce_1.png"
            alt="logo"
          />
        </div>
      </>
    );
  } else {
    console.log(sessionStorage.getItem("user_id"), u_id, u_name);
    return (
      <>
        <Lists
          id={u_id}
          setList={setl_id}
          l_id={l_id}
          msg={msg}
          u_name={u_name}
        />
        <Products
          l_id={l_id}
          u_id={u_id}
          u_name={u_name}
          msg={msg}
          chatMsg={chat}
        />
      </>
    );
  }
};

export default Home;

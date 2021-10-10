import React from "react";
import Lists from "./Components/Lists/Lists";
import Products from "./Components/Products/Products";
import "./acon.css";
const Home = ({ u_id, setl_id, l_id, msg }) => {
  if (u_id === "-1" || u_id === -1) {
    console.log(sessionStorage.getItem("user_id"), u_id);
    return (
      <>
        <div className="home_cont">
          <h2>Welcome to Shopping App!</h2>;<h2>Please Login or Register</h2>
          <h2> in order to use this app.</h2>
        </div>
        <div>
          <img
            className="home_img"
            src="https://uploads-ssl.webflow.com/5e3ce2ec7f6e53c045fe7cfa/603debd83291d9a8f92383ce_1.png"
          />
        </div>
      </>
    );
  } else {
    console.log(sessionStorage.getItem("user_id"), u_id);
    return (
      <>
        <Lists id={u_id} setList={setl_id} l_id={l_id} msg={msg} />
        <Products l_id={l_id} u_id={u_id} msg={msg} />
      </>
    );
  }
};

export default Home;

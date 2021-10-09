import React, { useState } from "react";
import Lists from "./Components/Lists/Lists";
import Products from "./Components/Products/Products";

const Home = ({ u_id, setl_id, l_id, msg }) => {
  if (sessionStorage.getItem("user_id") === -1 || u_id === -1)
    return <h2>Please Login/Register to continue</h2>;
  else
    return (
      <>
        <Lists id={u_id} setList={setl_id} l_id={l_id} msg={msg} />
        <Products l_id={l_id} u_id={u_id} msg={msg} />
      </>
    );
};

export default Home;

import React from "react";
import Lists from "./Components/Lists/Lists";
import Products from "./Components/Products/Products";

const Home = ({ u_id, setl_id, l_id }) => {
  if (localStorage.getItem("user_id") == -1)
    return <h2>Please Login/Register to continue</h2>;
  else
    return (
      <>
        <Lists id={u_id} setList={setl_id} />
        <Products l_id={l_id} u_id={u_id} />
      </>
    );
};

export default Home;

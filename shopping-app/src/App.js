import { useState } from "react";
import "./App.css";
import Lists from "./Components/Lists/Lists";
import Products from "./Components/Products/Products";
import React from "react";
function App() {
  const [l_id, setl_id] = useState(null);

  let u_id = "613e393948e88d77ff784bba";
  return (
    <div className="App">
      <Lists id={u_id} setList={setl_id} />
      <Products l_id={l_id} />
    </div>
  );
}

export default App;

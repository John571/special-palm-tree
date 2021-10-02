import "./App.css";
import Lists from "./Components/Lists/Lists";
import Products from "./Components/Products/Products";
function App() {
  let u_id = "613e393948e88d77ff784bba";
  return (
    <div className="App">
      <Lists id={u_id} />
      <Products />
    </div>
  );
}

export default App;

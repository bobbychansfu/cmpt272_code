import "./App.css";
import { useState } from "react";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";

function App() {
  const [isOn, setToggle] = useState(false);

  return (
    <div className={`${isOn ? "app-on" : ""}`}>
      <Header />
      <Main />
      <h1>DARK MODE</h1>
      <button onClick={() => setToggle(prev => !prev)}>
        {isOn ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
  );
}

export default App;

import "./App.css";
import { useState } from "react";
import { Header, Main, Footer } from "./components";

function App() {
  const [isOn, setToggle] = useState(false);

  return (
    <div className={`${isOn ? "app-on" : ""}`}>
      <Header />
      <Main />
      <Footer isOn={isOn} setToggle={setToggle} />
    </div>
  );
}

export default App;

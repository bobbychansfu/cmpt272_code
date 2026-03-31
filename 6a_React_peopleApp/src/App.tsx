import "./App.css";
import { useState } from "react";
import { Header, Main, Footer } from "@components";
import { Route, Routes } from "react-router-dom";
import PersonModal from "./components/PersonModal/PersonModal";

function ListPage() {
  const [isOn, setToggle] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className={`${isOn ? "app-on" : ""}`}>
      <Header setQuery={setQuery} />
      <Main query={query} />
      <Footer isOn={isOn} setToggle={setToggle} />
    </div>
  );
}

function App() {
  

  return (
    <Routes>
      <Route path="/people" element={<ListPage />}>
        <Route path=":id" element={<PersonModal />} />
      </Route>
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;

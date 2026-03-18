import "./App.css";
import image from "./assets/react.svg";
import { useState } from "react";

type Person = {
  id: number;
  name: string;
  age: number;
  profilePic?: string;
  fav: boolean;
};

function Main({ peopleList, toggleFav }: { peopleList: Person[]; toggleFav: (id: number) => void }) {
  return (
    <div className="card">
      {peopleList.map((person) => (
        <PersonCard
          key={person.id}
          id={person.id}
          name={person.name}
          age={person.age}
          profilePic={person.profilePic}
          fav={person.fav}
          onToggleFav={toggleFav}
        />
      ))}
    </div>
  );
}

function PersonCard({
  name,
  age,
  profilePic,
  fav,
  onToggleFav,
  id

}: {
  name: string;
  age: number;
  profilePic?: string;
  fav: boolean;
  id: number;
  onToggleFav: (id: number) => void;

}) {
  return (
    <>
      Name: {name} <br />
      Age: {age} <br />
      <img src={profilePic} alt={`${name}'s profile`} /> <br />
      <span className="heart" onClick={() => onToggleFav(id)}>
        {fav ? "❤️" : "🤍"}
      </span>
      <hr />
    </>
  );
}

function App() {
  const people: Person[] = [
    {
      id: 1,
      name: "Alice",
      age: 20,
      profilePic: "https://randomuser.me/api/portraits/women/59.jpg",
      fav: false
    },
    {
      id: 2,
      name: "Bob",
      age: 44,
      profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
      fav: false
    },
    {
      id: 3,
      name: "Carol",
      age: 50,
      profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
      fav: false
    },
  ];
  const [isOn, setToggle] = useState(false);
  const [peopleList, setPeople] = useState(people);

  function toggleFav(id: number) {
    setPeople(prev => prev.map(p => p.id === id ? { ...p, fav: !p.fav } : p));
  }
  return (
    <div className={`${isOn ? "app-on" : ""}`}>
      <h1>
        People
        <img className="logo" src={image} alt="REACT LOGO" />
      </h1>
      <Main peopleList={peopleList} toggleFav={toggleFav} />
      <h1>DARK MODE</h1>
      <button onClick={() => setToggle(prev => !prev)}>
        {isOn ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

    </div>
  );
}

export default App;

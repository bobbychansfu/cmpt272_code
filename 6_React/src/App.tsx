/* Ex1: increasing and decreasing temperature
// ---------------------------------------- //
// adding functionality to increase and decrease temperature
import './App.css'
import { useState } from "react";
function App() {
  const [temperature, setTemperature] = useState(20);

  const increaseTemp = () => setTemperature((temp) => {return temp + 1}); // (temp) => temp + 1
  const decreaseTemp = () => setTemperature((temp) => {return temp - 1});

  return (
    <div>
      <h1>Temperature: {temperature}°C</h1>
      <button onClick={increaseTemp}>Increase</button>
      <button onClick={decreaseTemp}>Decrease</button>
    </div>
  );
}

*/




/* Ex2: temperature with useReducer()
// ---------------------------------------- //
import "./App.css";
import { useReducer } from "react";

type State = { temp: number; user: { name: string; age: number } };
type Action = { type: "inc" } | { type: "dec" };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "inc":
      return state.user && state.user.age > 40
        ? { ...state, temp: state.temp + 2 }
        : { ...state, temp: state.temp + 1 };
    case "dec":
      return state.user && state.user.age > 40
        ? { ...state, temp: state.temp - 2 }
        : { ...state, temp: state.temp - 1 };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    temp: 20,
    user: { name: "Alice", age: 44 },
  });

  return (
    <>
      <h1>Tempurature: {state.temp}</h1>
      <button onClick={() => dispatch({ type: "inc" })}>
        INCREMENT
      </button>
      <button onClick={() => dispatch({ type: "dec" })}>
        DECREMENT
      </button>
    </>
  );
}
*/

/*
import "./App.css";
import {useRef, useState} from 'react';

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const nextIdRef = useRef<number>(1);

  const addUser = (name:string) => {
    const newUser: User = { id: nextIdRef.current, name };
    setUsers(prev => [...prev, newUser]);
    nextIdRef.current += 1;
  };
  
  return (
    <>
      <h1>User List</h1>
      <button onClick={() => addUser(`User ${nextIdRef.current}`)}>
        Add User
      </button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} (ID: {user.id})</li>
        ))}
      </ul>
    </>
  );
}

*/





/* Ex3: fetching data with useEffect()
// ---------------------------------------- //
import "./App.css"
import { useEffect,useState } from 'react';

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>User List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name} (ID: {user.id})</li>
          ))}
        </ul>
      )}
    </div>
  )

}

export default App;

*/


/* Ex4: useState() and useEffect() to fetch data 
// ---------------------------------------- //
import "./App.css";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [numUsers, setNumUsers] = useState(0);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const response = await fetch(
        `https://randomuser.me/api/`
      );
      const data = await response.json();
      const id = data.results[0].id.value;
      const name = data.results[0].name.first;
      setUsers(prevUsers => [...prevUsers, { id, name }]);
      setLoading(false);
    }
    fetchUsers();
  }, [numUsers]);

  return (
    <div className="App">
      <h1>User List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name} (ID: {user.id})</li>
          ))}
        </ul>
      )}
      <button onClick={() => setNumUsers(prev => prev + 1)}>
        Add User
      </button>
    </div>
  );
}

*/

/* Routing
*/

import { Routes, Route } from "react-router-dom";
import MapDemo from "./LeafletDemo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/about" element={<h1>About Page</h1>} />
      <Route path="/leaflet" element={<MapDemo />} />
    </Routes>
  )
}

export default App

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

/* Ex. 5 - Routing 

import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import MapDemo from "./LeafletDemo";
import { useParams, Link } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  price: number;
};

function App() {
  const products: Product[] = [
    { id: "1", name: "Product 1", price: 10 },
    { id: "2", name: "Product 2", price: 20 },
    { id: "3", name: "Product 3", price: 30 },
  ];
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/about" element={<About />}>
        <Route index element={<h2>Company Overview</h2>} />
        <Route path="team" element={<h2>Our Team</h2>} />
        <Route path="contact" element={<h2>Contact Us</h2>} />
      </Route>
      <Route path="/leaflet" element={<MapDemo />} />
      <Route path="/products" element={<AllProducts products={products} />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  )
}

function AllProducts({ products }: { products: Product[] }) {
  const navigate = useNavigate();
  return (
    <div>
      <h1>All Products</h1>

      {products.map(product => (
        <button key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
          {product.name} - ${product.price}
        </button>
      ))}

    </div>
  );
}

function About() {
  return (
    <div>
      <nav>
        <Link to="/"> HOME </Link> <br />
        <Link to="/about"> ABOUT </Link> <br />
        <Link to="/about/team"> TEAM </Link> <br />
        <Link to="/about/contact"> CONTACT </Link> <br />
      </nav>
      <h1>About Page</h1>
      <Outlet />
    </div>
  );
}

function Product() {
  const { id } = useParams();

  return (
    <div>
      <h1>Product Page</h1>
      <p>Product ID: {id}</p>
    </div>
  );
}
*/



/* Ex. 6 - useOutletContext() and React-Bootstrap

import "./App.css";
import { useState } from "react";
import { Routes, Route, Outlet, useOutletContext } from "react-router-dom";
import Button from "./Button";
import { Col, Container, Row } from "react-bootstrap";

interface User {
  name: string;
  age: number;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}

// Parent
function DashboardLayout() {
  const [user] = useState<User>({ name: "Alice", age: 30 });
  return (
    <div>
      <h1 className="label">Dashboard</h1>
      <Outlet context={user} />
    </div>
  );
}

// Child
function Profile() {
  const user = useOutletContext<User>();
  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <Button text="Click Me" onClick={() => alert("Button Clicked")}></Button>
    </div>
  );
}

function Main() {
  return (
    <>
      <h1>Main Page</h1>
      <Container>
        <Row>
          <Col md={12} lg={6}>
            <h2>Welcome to the Main Page</h2>
            <p>This is a simple main page.</p>
          </Col>
          <Col md={12} lg={6}>
            <h2>Another Section</h2>
            <p>This is another section of the main page.</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
*/


/* Ex. 7. useContext, useSearchParams() and query parameters 

import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


interface User {
  id: number;
  name: string;
}

const UserContext = createContext<User | null>(null);

function App() {
  const [user] = useState<User>({ id: 1, name: "Alice" }); // login simulation
  return (<>
    <UserContext.Provider value={user}>
     
      <Header></Header>
      <Dashboard></Dashboard>
      <People></People>
    </UserContext.Provider>
  </>)
}

function People() {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  return (<div>
    <h2>People</h2>
    <ul>
      {filteredUsers.map(user => (
        <li key={user.id}>{user.name} (ID: {user.id})</li>
      ))}
    </ul>
  </div>
  );
}

function Header() {
  const user = useContext(UserContext);
  return (
    <header>
      <h1>Welcome, {user ? user.name : "Guest"}</h1>
    </header>
  );
}

function Dashboard() {
  const user = useContext(UserContext);
  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <p>User ID: {user.id}, Name: {user.name}</p>
      ) : (
        <p>Please log in to see your dashboard.</p>
      )}
    </div>
  );
}

*/

/* Ex. 8. useLocation() for navigation and state passing */

import { Link, Route, Routes, useLocation } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={<Home />}
        ></Route>
        <Route
          path="/about"
          element={<About />}
        ></Route>
      </Routes>
    </>
  )
}

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/about" state={{ from: "home" }}>
        Go to About
      </Link>
    </div>
  );
}

function About() {
  const location = useLocation();
  const from = location.state?.from || "unknown";
  return (
    <div>
      <h1>About Page</h1>
      <p>Navigated from: {from}</p>
    </div>
  );
}


export default App

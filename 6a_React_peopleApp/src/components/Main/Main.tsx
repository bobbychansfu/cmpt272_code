import { useState } from "react";
import useFetchRandomPerson from "@hooks/useFetchRandomPerson";
import PersonCard from "./PersonCard/PersonCard";
import { Container, Row } from "react-bootstrap";
import type { Person } from "@models/PersonType";
import { Outlet } from "react-router-dom";

function Main({ query }: { query: string }) {
    const [numPeople, setNumPeople] = useState(0);
    const { peopleList, loading, setPeople } = useFetchRandomPerson(numPeople);
    function toggleFav(id: number) {
        setPeople(prev => prev.map(p => p.id === id ? { ...p, fav: !p.fav } : p));
    }
    const handleDelete = (personToDelete: Person) => {
        // Implement delete logic here, e.g., call a prop function to remove the user from the list
        setPeople(prev => prev.filter(p => p.id !== personToDelete.id));
    };
    const filteredPeople = peopleList.filter(person => person.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <>

            <Container>
                <Row>
                    {filteredPeople.map((person, index) => (
                        <PersonCard key={index} person={person} onToggleFav={toggleFav} onDelete={handleDelete} />
                    ))}

                    {loading && <PersonCard person={{ id: -1, name: "Loading...", profilePic: "", age: 0, fav: false, seed: "" }} onToggleFav={toggleFav} onDelete={handleDelete} />}
                </Row>
            </Container>
            <button onClick={() => setNumPeople(prev => prev + 1)}>
                Fetch Random Person
            </button>
            <Outlet context={{ peopleList }} />
        </>
    );
}

export default Main;
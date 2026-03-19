import { useState } from "react";
import useFetchRandomPerson from "../../hooks/useFetchRandomPerson";
import PersonCard from "./PersonCard/PersonCard";

function Main() {
    const [numPeople, setNumPeople] = useState(0);
    const { peopleList, loading, setPeople } = useFetchRandomPerson(numPeople);
    function toggleFav(id: number) {
        setPeople(prev => prev.map(p => p.id === id ? { ...p, fav: !p.fav } : p));
    }
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
            {loading && <p>Loading...</p>}
            <button onClick={() => setNumPeople(prev => prev + 1)}>
                Fetch Random Person
            </button>
        </div>
    );
}

export default Main;
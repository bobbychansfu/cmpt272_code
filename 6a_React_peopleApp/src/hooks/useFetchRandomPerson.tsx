import { useState, useEffect, useRef } from "react";
import type { Person } from "../types/PersonType";

function useFetchRandomPerson(trigger: number) {
    const [peopleList, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState(false);
    const nextIdRef = useRef(1);

    useEffect(() => {
        async function fetchPerson() {
            try {
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500));
                const response = await fetch("https://randomuser.me/api/");
                const data = await response.json();
                const name = data.results[0].name.first;
                const age = data.results[0].dob.age;
                const profilePic = data.results[0].picture.large;
                const seed = data.results[0].login.seed;
                setPeople(prev => [...prev, { id: nextIdRef.current++, name, age, profilePic, seed, fav: false }]);
            } catch (error) {
                console.error("Error fetching person:", error);
            } finally {
                setLoading(false);
            }
        }
        if (trigger > 0) {
            fetchPerson();
        }
    }, [trigger]);
    return { peopleList, loading, setPeople };
}

export default useFetchRandomPerson;
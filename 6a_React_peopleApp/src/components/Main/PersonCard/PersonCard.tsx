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

export default PersonCard;
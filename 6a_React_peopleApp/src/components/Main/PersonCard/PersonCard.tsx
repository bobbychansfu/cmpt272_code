import { Col, Card, Spinner } from "react-bootstrap";
import styles from "./PersonCard.module.css";
import type { Person } from "../../../types/PersonType";

function PersonCard({
    
    person,
    onToggleFav,
    onDelete,
}: {

    person: Person;
    onToggleFav: (id: number) => void;
    onDelete: (person: Person) => void;
}) {
    return (
        <>
            <Col sm={12} md={4} lg={3} className="mb-4">
                {person.id === -1 ? (
                    <div className={styles.loadingContainer}>
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <Card>
                        <Card.Img variant="top" src={person.profilePic} />
                        <Card.Body>
                            <Card.Title>{person.name}</Card.Title> <br />
                            <span className="heart" onClick={() => onToggleFav(person.id)}>
                                {person.fav ? "❤️" : "🤍"}
                            </span>
                        </Card.Body>

                        <i
                            className={`bi bi-x-circle-fill ${styles.deleteIcon}`}
                            onClick={() => onDelete(person)}
                        />
                    </Card>
                )}
            </Col>
        </>
    );
}

export default PersonCard;
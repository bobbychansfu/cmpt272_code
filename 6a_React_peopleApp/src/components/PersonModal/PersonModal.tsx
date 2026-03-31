import { Col, Modal, Placeholder, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import type { Person } from "../../models/PersonType";
import type { FullPersonType } from "../../models/FullPersonType";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function PersonModal() {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const { peopleList } = useOutletContext<{ peopleList: Person[] }>(); // Get the people data from the outlet context

  const person = peopleList.find((p) => p.id === Number(id));

  const [loading, setLoading] = useState(true);
  const [fullPerson, setFullPerson] = useState<FullPersonType | null>(null);

  // fetch the person data based on seed

  const hasFetched = useRef(false); // To prevent multiple fetches

  useEffect(() => {
    async function fetchUser() {
      if (hasFetched.current) return; // If this effect has already run, do nothing
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const response = await fetch(
          `https://randomuser.me/api/?seed=${person?.seed}`,
        );
        const data = await response.json();
        const fullName = `${data.results[0].name.first} ${data.results[0].name.last}`;
        const email = data.results[0].email;
        const phone = data.results[0].phone;
        const age = Number(data.results[0].dob.age);
        const country = data.results[0].location.country;
        const fullPersonData = {
          ...person!,
          name: fullName,
          email: email,
          phone: phone,
          age: age,
          country: country,
        };
        setFullPerson(fullPersonData);

        // console.log("Fetched person data:", fullPersonData);
      } catch (error) {
        console.error("Error fetching person data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
    hasFetched.current = true; // Mark that we've fetched the data
  }, [person]);

  // Redirect back to parent when closing
  const handleClose = () => {
    navigate("/people");
  };

  return (
    <Modal show={true} onHide={handleClose} centered>
      {loading ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title as="div" style={{ width: "100%" }}>
              <Placeholder animation="glow">
                <Placeholder as="h4" xs={6} />
              </Placeholder>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={12} md={4}>
                <Placeholder as="div" animation="glow">
                  <Placeholder
                    as="img"
                    style={{ height: "128px", width: "128px" }}
                  ></Placeholder>
                </Placeholder>
              </Col>
              <Col sm={12} md={8}>
                <Placeholder as="p" animation="glow">
                  <Placeholder as="span" xs={3} />{" "}
                  <Placeholder as="span" xs={4} />
                  <br />
                  <Placeholder as="span" xs={3} />{" "}
                  <Placeholder as="span" xs={3} />
                  <br />
                  <Placeholder as="span" xs={2} />{" "}
                  <Placeholder as="span" xs={1} />
                  <br />
                  <Placeholder as="span" xs={4} />{" "}
                  <Placeholder as="span" xs={3} />
                </Placeholder>
              </Col>
            </Row>
          </Modal.Body>
        </>
      ) : fullPerson ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{fullPerson?.name || "Person Details"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={12} md={4}>
                <img src={fullPerson.profilePic} alt={fullPerson.name} />
              </Col>
              <Col sm={12} md={8}>
                <p>
                  <strong>Email:</strong> {fullPerson.email}
                  <br />
                  <strong>Phone:</strong> {fullPerson.phone}
                  <br />
                  <strong>Age:</strong> {fullPerson.age}
                  <br />
                  <strong>Country:</strong> {fullPerson.country}
                </p>
              </Col>
            </Row>
          </Modal.Body>
        </>
      ) : (
        <p>Person not found</p>
      )}
    </Modal>
  );
}

export default PersonModal;

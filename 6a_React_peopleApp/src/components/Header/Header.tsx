import type React from "react";
import logo from "../../assets/react.svg";
import Col from "react-bootstrap/esm/Col";
import { Form } from "react-bootstrap";

function Header({ setQuery }: { setQuery: React.Dispatch<React.SetStateAction<string>> }) {
    return (
        <header>
            <h1>Random People App <img src={logo} className="logo" alt="React Logo" /></h1>
            <Col sm={12}>
                <Form.Control size="lg" type="text" placeholder="Search by name..." onChange={(e) => setQuery(e.target.value)} />
            </Col>
        </header>
    );
}

export default Header;
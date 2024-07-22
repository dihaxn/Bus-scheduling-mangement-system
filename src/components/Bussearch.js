import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import "./Bussearch.css"; // Import the CSS file
import Sort from "../pages/Sort";

export default function Bussearch({ bustable, SortByCity }) {
  const [selectedDestination, setSelectedDestination] = useState("");

  const handleSelect = (eventKey) => {
    setSelectedDestination(eventKey);
  };

  return (
    <>
      <div className="bussearch">
        <Navbar expand="lg" className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto align-items-center navbar-nav">
                <Nav.Link href="#action1">From: Matara</Nav.Link>
                <Nav.Link href="#action2">To:</Nav.Link>
                <NavDropdown
                  title="Select Destination"
                  id="navbarScrollingDropdown"
                  onSelect={handleSelect}
                >
                  <NavDropdown.Item eventKey="Galle">Galle</NavDropdown.Item>
                  <NavDropdown.Item eventKey="Mathugama">
                    Mathugama
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="Colombo">
                    Colombo
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="Kurunegala">
                    Kurunegala
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="Other">Other</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex align-items-center">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={selectedDestination}
                  readOnly
                />
                <Button
                  className="custom-button"
                  onClick={() => {
                    SortByCity(bustable, selectedDestination);
                  }}
                >
                  Find Bus
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

// Bussearch.jsx
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import "./Bussearch.css"; // Updated CSS

export default function Bussearch({ destination, setDestination, onSearch }) {
  const handleSelect = (eventKey) => {
    setDestination(eventKey);
  };

  return (
      <div className="bussearch">
        <Navbar expand="lg" className="navbar-custom">
          <Container fluid>
            <Navbar.Toggle aria-controls="navbarScroll" className="toggler-custom" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto align-items-center navbar-nav-custom">
                <Nav.Link href="#from" className="nav-link-custom">
                  From: Matara
                </Nav.Link>
                <Nav.Link href="#to" className="nav-link-custom">
                  To:
                </Nav.Link>
                <NavDropdown
                    title={<span className="nav-link-custom">Select Destination</span>}
                    id="navbarScrollingDropdown"
                    onSelect={handleSelect}
                    menuVariant="dark"
                >
                  <NavDropdown.Item eventKey="Galle">Galle</NavDropdown.Item>
                  <NavDropdown.Item eventKey="Mathugama">Mathugama</NavDropdown.Item>
                  <NavDropdown.Item eventKey="Colombo">Colombo</NavDropdown.Item>
                  <NavDropdown.Item eventKey="Kurunegala">Kurunegala</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="Other">Other</NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <Form className="d-flex align-items-center form-custom">
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2 search-input-custom"
                    aria-label="Search"
                    value={destination}
                    readOnly
                />
                <Button className="btn-custom" onClick={onSearch}>
                  Find Bus
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
  );
}

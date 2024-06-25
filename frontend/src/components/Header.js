import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import AddBookModal from "./AddBookModal";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const [modalShow, setModalShow] = useState(false);
  const [navExpanded, setNavExpanded] = useState(false);

  const closeNav = () => {
    setNavExpanded(false);
  };

  return (
    <Navbar
      expand="lg"
      expanded={navExpanded}
      className="bg-body-tertiary"
      fixed="top"
    >
      <Container className="justify-content-start gap-1">
        <Navbar.Toggle
          className="border-0"
          onClick={() => setNavExpanded(!navExpanded)}
        />
        <Navbar.Brand as={Link} to="/" id="nav-brand" onClick={closeNav}>
          Lacey Bee's Book Inventory
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/categories" onClick={closeNav}>
              Categories
            </Nav.Link>
            <Nav.Link as={Link} to="/books" onClick={closeNav}>
              Books
            </Nav.Link>
          </Nav>
          <div onClick={closeNav}>
            <Button variant="success" onClick={() => setModalShow(true)}>
              Add Book
            </Button>
            <AddBookModal show={modalShow} onHide={() => setModalShow(false)} />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

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

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      fixed="top"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand as={Link} to="/" id="nav-brand">
          Lacey Bee's Book Inventory
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="text-end">
            <Nav.Link as={Link} to="/categories" eventKey="1">
              Categories
            </Nav.Link>
            <Nav.Link as={Link} to="/books" eventKey="2">
              Books
            </Nav.Link>
          </Nav>
          <div className="text-end">
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

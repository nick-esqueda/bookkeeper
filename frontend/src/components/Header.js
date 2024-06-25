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
      <Container className="justify-content-start gap-1">
        <Navbar.Toggle className="border-0" />
        <Navbar.Brand as={Link} to="/" id="nav-brand">
          Lacey Bee's Book Inventory
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/categories" eventKey="1">
              Categories
            </Nav.Link>
            <Nav.Link as={Link} to="/books" eventKey="2">
              Books
            </Nav.Link>
          </Nav>
          <div>
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

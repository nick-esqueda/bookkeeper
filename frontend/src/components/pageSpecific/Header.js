import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddBookModal from "../modals/AddBookModal";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [navExpanded, setNavExpanded] = useState(false);

  const closeNav = () => {
    setNavExpanded(false);
  };

  return (
    <Navbar
      expand="lg"
      expanded={navExpanded}
      className="bg-success text-light shadow-sm"
      fixed="top"
    >
      <Container>
        <Navbar.Toggle
          className="border-0"
          onClick={() => setNavExpanded(!navExpanded)}
        />
        <Navbar.Brand
          as={Link}
          to="/"
          id="nav-brand"
          onClick={closeNav}
          className="text-light"
        >
          Lacey Bee's Book Inventory
        </Navbar.Brand>
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="d-flex justify-content-end"
        >
          <Nav className="d-flex gap-4 me-1">
            <Nav.Link
              as={Link}
              to="/tags"
              onClick={closeNav}
              className="text-light"
            >
              Manage Tags
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/categories"
              onClick={closeNav}
              className="text-light"
            >
              Categories
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/books"
              onClick={closeNav}
              className="text-light"
            >
              Books
            </Nav.Link>
          </Nav>
          <div onClick={closeNav} className="ms-4">
            <Button variant="primary" onClick={() => setShowAddBookModal(true)}>
              <FontAwesomeIcon icon={faPlus} className="me-1" /> Add Book
            </Button>
          </div>
        </Navbar.Collapse>
        <AddBookModal
          show={showAddBookModal}
          onHide={() => setShowAddBookModal(false)}
        />
      </Container>
    </Navbar>
  );
};

export default Header;

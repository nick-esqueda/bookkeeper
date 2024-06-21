import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import AddBookModal from "./AddBookModal";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const navRef = useRef(null);
  const [modalShow, setModalShow] = useState(false);
  const [navExpanded, setNavExpanded] = useState(false);

  const handleAddBookClick = () => {
    setModalShow(true);
    setNavExpanded(false);
  };

  const handleClickOutsideNav = (e) => {
    if (navRef.current && !navRef.current.contains(e.target)) {
      setNavExpanded(false);
    }
  };

  useEffect(() => {
    // use event listeners and useRef to close navbar collapse menu when
    // clicking anywhere outside the nav menu on mobile viewports.
    document.addEventListener("click", handleClickOutsideNav, true);
    return () =>
      document.removeEventListener("click", handleClickOutsideNav, true);
  }, []);

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      fixed="top"
      expanded={navExpanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" id="nav-brand">
          Lacey Bee's Book Inventory
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setNavExpanded(!navExpanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav" ref={navRef}>
          {/* set Add Book button at end of navbar on non-mobile viewports. */}
          <Nav className={navExpanded ? "text-end" : "me-auto"}>
            <Nav.Link
              as={Link}
              to="/categories"
              onClick={() => setNavExpanded(!navExpanded)}
            >
              Categories
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/books"
              onClick={() => setNavExpanded(!navExpanded)}
            >
              Books
            </Nav.Link>
          </Nav>
          <div className="text-end">
            <Button variant="success" onClick={handleAddBookClick}>
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

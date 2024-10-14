import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { readStatusButtonColorMap } from "../utils/dataTransformationUtils";
import { Badge, Fade } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookOpen,
  faPenNib,
  faTag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import EditBookModal from "./EditBookModal";

const BookCard = ({ bookId }) => {
  const badgeContainerRef = useRef(null);
  const book = useSelector((state) => state.books.entities[bookId]);
  const [isMounted, setIsMounted] = useState(false);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);
  const [editBookModalShow, setEditBookModalShow] = useState(false);

  useEffect(() => {
    // control the Fade component to fade the Card in.
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // control visual fade out on both sides of the book tag badge row
    // when there are too many badges.

    if (!book) {
      return;
    }

    const badgeContainer = badgeContainerRef.current;

    const updateFadeVisibility = () => {
      const canScrollRight =
        badgeContainer.scrollWidth > badgeContainer.clientWidth;
      const isScrolledToEnd =
        badgeContainer.scrollLeft + badgeContainer.clientWidth >=
        badgeContainer.scrollWidth;
      const isScrolledToStart = badgeContainer.scrollLeft === 0;

      setShowRightFade(canScrollRight && !isScrolledToEnd);
      setShowLeftFade(canScrollRight && !isScrolledToStart);
    };

    updateFadeVisibility(); // Initial check

    badgeContainer.addEventListener("scroll", updateFadeVisibility);
    window.addEventListener("resize", updateFadeVisibility); // Update on resize

    return () => {
      badgeContainer.removeEventListener("scroll", updateFadeVisibility);
      window.removeEventListener("resize", updateFadeVisibility);
    };
  }, [book]);

  if (!book) {
    return <p>Error: book does not exist</p>;
  }

  const bookTagBadges = book.bookTags.map((bookTag) => (
    <Badge key={bookTag.id} bg="secondary" className="me-2">
      <FontAwesomeIcon icon={faTag} className="me-2" />
      {bookTag.name}
    </Badge>
  ));

  return (
    <Fade in={isMounted}>
      <Card
        border={readStatusButtonColorMap[book.readStatus]}
        className="h-100 border-2 border-top-0 border-bottom-0 border-end-0 shadow"
      >
        <EditBookModal
          show={editBookModalShow}
          onHide={() => setEditBookModalShow(false)}
          book={book}
        />
        <Card.Header className="w-100 d-flex align-items-center justify-content-between">
          <div>
            <FontAwesomeIcon icon={faBook} className="me-2" />
            {book.bookCategory.name}
          </div>

          <Button variant="link" onClick={() => setEditBookModalShow(true)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </Card.Header>
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title className="mb-3">{book.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              {book.author}
            </Card.Subtitle>
            {book.edition && (
              <Card.Text className="fw-lighter fst-italic">
                <FontAwesomeIcon icon={faPenNib} className="me-2 text-muted" />
                {book.edition}
              </Card.Text>
            )}
          </div>
          <div className="mt-5">
            <Card.Text className="overflow-hidden position-relative">
              {showLeftFade && <div className="fade-out-left"></div>}
              <div ref={badgeContainerRef} className="one-line-hidden-scroll">
                {bookTagBadges}
              </div>
              {showRightFade && <div className="fade-out-right"></div>}
            </Card.Text>
            <Card.Text>
              <Button
                as={Link}
                to={`/books/${bookId}`}
                variant="outline-primary"
                className="w-100"
              >
                <FontAwesomeIcon icon={faBookOpen} className="me-2" />
                View Book
              </Button>
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </Fade>
  );
};

export default BookCard;

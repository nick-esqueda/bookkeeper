import {
  faBook,
  faEllipsis,
  faTag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Fade } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BookCardCompact = ({ bookId }) => {
  const book = useSelector((state) => state.books.entities[bookId]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // control the Fade component to fade the Card in.
    setIsMounted(true);
  }, []);

  return (
    <Fade in={isMounted}>
      <Card className="mb-2 mt-2 p-3 flex-row shadow-sm">
        <div className="pt-2 me-4">
          <FontAwesomeIcon icon={faBook} className="fs-4" />
        </div>
        <div>
          <div className="fs-5 me-4 mb-1">{book.title}</div>
          <div className="fst-italic text-muted">
            <FontAwesomeIcon icon={faUser} className="fs-6 me-2" />
            by {book.author}
          </div>
        </div>
        <div>
          {book.bookTags.map((tag) => (
            <Badge key={tag.id} bg="secondary" className="me-2">
              <FontAwesomeIcon icon={faTag} className="me-2" />
              {tag.name}
            </Badge>
          ))}
        </div>
        <Button
          as={Link}
          to={`/books/${bookId}`}
          variant="link"
          className="ms-auto m-2"
        >
          <FontAwesomeIcon icon={faEllipsis} />
        </Button>
      </Card>
    </Fade>
  );
};

export default BookCardCompact;

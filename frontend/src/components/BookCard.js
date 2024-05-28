import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getReadStatusStyle } from "../utils/styleUtils";

const BookCard = ({ bookId }) => {
  const book = useSelector((state) => state.books.entities[bookId]);

  return book && (
    <Link
      to={`/books/${bookId}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card
        border={getReadStatusStyle(book.readStatus)}
        className="h-100 border-top-0 border-bottom-0 border-end-0 border-2"
      >
        <Card.Header>{book.bookCategory.name}</Card.Header>
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title>{book.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {book.author}
            </Card.Subtitle>
          </div>
          <Card.Text className="fw-lighter fst-italic">
            {book.edition}
          </Card.Text>
          <div>
            <Button variant="primary">Edit Book</Button>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default BookCard;

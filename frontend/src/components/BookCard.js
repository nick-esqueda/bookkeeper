import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { readStatusButtonColorMap } from "../utils/dataTransformationUtils";

const BookCard = ({ bookId }) => {
  const book = useSelector((state) => state.books.entities[bookId]);

  return (
    book && (
      <Card
        border={readStatusButtonColorMap[book.readStatus]}
        className="h-100 border-2 border-top-0 border-bottom-0 border-end-0 shadow"
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
          <Card.Text>
            <Button
              as={Link}
              to={`/books/${bookId}`}
              variant="outline-primary"
              className="w-100"
            >
              View Book
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  );
};

export default BookCard;

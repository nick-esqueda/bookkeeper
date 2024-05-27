import React from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BookCard = ({ bookId }) => {
  const book = useSelector((state) => state.books.entities[bookId]);

  let borderColor;
  switch (book.readStatus) {
    case "READ": {
      borderColor = "success";
      break;
    }
    case "UNREAD": {
      borderColor = "danger";
      break;
    }
    case "DID_NOT_FINISH": {
      borderColor = "warning";
      break;
    }
  }

  return (
    <Link
      to={`/books/${bookId}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card
        border={borderColor}
        className="h-100 border-bottom-0 border-start-0 border-end-0 border-2"
      >
        <Card.Body>
          <Card.Title>
            {book.edition ? book.title + " (" + book.edition + ")" : book.title}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {book.author}
          </Card.Subtitle>
          <Card.Text>Category: {book.bookCategory.name}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button variant="primary">Edit Book</Button>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default BookCard;

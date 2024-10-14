import {
  faBook,
  faEllipsis,
  faTag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BookCardCompact = ({ bookId }) => {
  const book = useSelector((state) => state.books.entities[bookId]);

  return (
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
          <Badge bg="secondary" className="me-2">
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

      {/* edit and delete buttons */}
      {/* <ButtonGroup className="ms-auto">
        <EditBookModal
          show={editBookModalShow}
          onHide={() => setEditBookModalShow(false)}
          book={book}
        />
        <Button
          variant="outline-info"
          onClick={() => setEditBookModalShow(true)}
        >
          <FontAwesomeIcon icon={faPencil} className="me-2" />
        </Button>
        <Button variant="outline-danger" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} className="me-2" />
        </Button>
      </ButtonGroup> */}
    </Card>
  );
};

export default BookCardCompact;

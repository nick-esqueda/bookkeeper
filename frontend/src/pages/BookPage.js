import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchBookAsync } from "../features/books/booksSlice";

const BookPage = () => {
  // view and edit book details.
  // MVP: display all book fields and allow to edit/delete the book
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const book = useSelector((state) => state.books.entities[bookId]);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);

  useEffect(() => {
    dispatch(fetchBookAsync(bookId));
  }, [dispatch, bookId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  let updatedAt;
  if (book) {
    updatedAt = new Date(book.updatedAt * 1000).toDateString();
  }

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
    default: {
      borderColor = "";
    }
  }

  return (
    <Container>
      <Row className="m-4 p-4 h-100 ">
        <Col
          xs={12}
          sm={12}
          md={5}
          lg={5}
          className="border-end border-3 rounded-end d-flex flex-column justify-content-center"
        >
          <h2 className="fs-1 fw-bold mb-4">{book.title}</h2>
          <h3 className="fs-2 fw-normal mb-3">{book.author}</h3>
          {book.edition && (
            <h4 className="fw-lighter fst-italic">{book.edition}</h4>
          )}
        </Col>
        <Col xs={12} sm={12} md={7} lg={7} className="p-4">
          <div className="d-flex flex-column justify-content-around gap-4">
            <Card className="text-center">
              <Card.Header>Category</Card.Header>
              <Card.Body>
                <Card.Title>{book.bookCategory.name}</Card.Title>
                <Card.Link as={Link} to={`/categories/${book.bookCategory.id}`}>
                  View Category
                </Card.Link>
              </Card.Body>
            </Card>
            <Button variant={"outline-" + borderColor} size="md" disabled>
              {book.readStatus}
            </Button>
            <Card>
              <Card.Header>Notes</Card.Header>
              <Card.Body>
                {book.notes ? (
                  <Card.Text>{book.notes}</Card.Text>
                ) : (
                  <Card.Text className="text-muted">
                    Edit to add notes...
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </div>
          <Row className="mt-5">
            <Col className="text-muted d-flex align-items-end">
              <small className="">Last update: {updatedAt}</small>
            </Col>
            <Col className="d-flex justify-content-end gap-4 ">
              <Button variant="outline-info">Edit Book</Button>
              <Button variant="outline-danger">Delete Book</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default BookPage;

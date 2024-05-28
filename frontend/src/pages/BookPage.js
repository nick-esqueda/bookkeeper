import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBookAsync, fetchBookAsync } from "../features/books/booksSlice";
import { getReadStatusStyle } from "../utils/styleUtils";

const BookPage = () => {
  // view and edit book details.
  // MVP: display all book fields and allow to edit/delete the book

  const { bookId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const book = useSelector((state) => state.books.entities[bookId]);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);

  useEffect(() => {
    dispatch(fetchBookAsync(bookId));
  }, [dispatch, bookId]);

  const handleDelete = async (e) => {
    if (!window.confirm(`Delete '${book.title}'? This cannot be undone.`)) {
      return;
    }

    try {
      await dispatch(deleteBookAsync(bookId));
      navigate(`/books`);
    } catch (error) {
      alert("Uh-oh, something went wrong. Please tell Nick Bug! \n\n" + error);
    }
  };

  if (loading || !book) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const readStatusStyle = getReadStatusStyle(book.readStatus);
  let updatedAt = new Date(book.updatedAt * 1000).toDateString();

  return (
    <Container>
      <Row className="m-4 p-4 h-100 ">
        <Col
          xs={12}
          sm={12}
          md={6}
          lg={6}
          className="border-end border-3 rounded-end d-flex flex-column justify-content-center"
        >
          <h2 className="fs-1 fw-bold mb-4">{book.title}</h2>
          <h3 className="fs-2 fw-normal mb-3">{book.author}</h3>
          {book.edition && (
            <h4 className="fw-lighter fst-italic">{book.edition}</h4>
          )}
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} className="p-4">
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
            <Button variant={`outline-${readStatusStyle}`} size="md" disabled>
              {book.readStatus}
            </Button>
            <Card>
              <Card.Header>My Notes</Card.Header>
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
              <Button variant="outline-danger" onClick={handleDelete}>
                Delete Book
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default BookPage;

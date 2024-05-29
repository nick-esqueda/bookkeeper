import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBookAsync, fetchBookAsync } from "../features/books/booksSlice";
import { getReadStatusStyle } from "../utils/styleUtils";
import EditBookModal from "../components/EditBookModal";

const BookPage = () => {
  // view and edit book details.
  // MVP: display all book fields and allow to edit/delete the book

  const { bookId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const book = useSelector((state) => state.books.entities[bookId]);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);
  const [editBookModalShow, setEditBookModalShow] = useState(false);

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
      <Row className="m-5 h-100">
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={6}
          className="d-flex flex-column justify-content-center mb-4 border-end border-3 rounded-end"
        >
          <h2 className="fs-1 fw-bold mb-4">{book.title}</h2>
          <h3 className="fs-2 fw-normal mb-3">{book.author}</h3>
          {book.edition && (
            <h4 className="fw-lighter fst-italic">{book.edition}</h4>
          )}
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="p-4">
          <Row>
            <Col className="d-flex flex-column justify-content-around gap-4 mb-4">
              <Card className="text-center">
                <Card.Header>Category</Card.Header>
                <Card.Body>
                  <Card.Title>{book.bookCategory.name}</Card.Title>
                  <Card.Link
                    as={Link}
                    to={`/categories/${book.bookCategory.id}`}
                    className="fw-lighter"
                  >
                    See Category
                  </Card.Link>
                </Card.Body>
              </Card>
              <Button variant={`outline-${readStatusStyle}`} size="md" disabled>
                {book.readStatus}
              </Button>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col
              xs={12}
              sm={12}
              md={4}
              lg={4}
              className="text-muted d-flex align-items-end d-md-block d-none"
            >
              <small className="">
                Last update: <br />
                {updatedAt}
              </small>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={8}
              className="d-flex justify-content-end gap-4 "
            >
              <EditBookModal
                show={editBookModalShow}
                onHide={() => setEditBookModalShow(false)}
                book={book}
              />
              <Button
                variant="outline-info"
                onClick={() => setEditBookModalShow(true)}
              >
                Edit Book
              </Button>
              <Button variant="outline-danger" onClick={handleDelete}>
                Delete Book
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
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
        </Col>
      </Row>
    </Container>
  );
};

export default BookPage;

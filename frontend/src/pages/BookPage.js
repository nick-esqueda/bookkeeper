import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearAllBooks,
  deleteBookAsync,
  fetchBookAsync,
} from "../features/books/booksSlice";
import {
  readStatusButtonColorMap,
  readStatusIconMap,
  readStatusTextMap,
} from "../utils/dataTransformationUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faLayerGroup,
  faPencil,
  faPenNib,
  faTag,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faNoteSticky } from "@fortawesome/free-regular-svg-icons";
import LoadingSpinner from "../components/utils/LoadingSpinner";
import EditBookModal from "../components/modals/EditBookModal";

const BookPage = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const book = useSelector((state) => state.books.entities[bookId]);
  const { loading, error } = useSelector((state) => state.books);

  const [editBookModalShow, setEditBookModalShow] = useState(false);

  useEffect(() => {
    dispatch(fetchBookAsync(bookId));
    return () => dispatch(clearAllBooks());
  }, [dispatch, bookId]);

  const handleDelete = async () => {
    if (!window.confirm(`Delete '${book.title}'? This cannot be undone.`)) {
      return;
    }

    try {
      await dispatch(deleteBookAsync(bookId));
      navigate(`/books`);
    } catch (error) {
      alert("Uh-oh, something went wrong. \n\n" + error);
    }
  };

  if (loading || !book) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  let createdAt = new Date(book.createdAt * 1000).toDateString();
  let updatedAt = new Date(book.updatedAt * 1000).toDateString();

  const bookTagBadges = book.bookTags.map((bookTag) => (
    <Badge key={bookTag.id} bg="secondary" className="me-2">
      <FontAwesomeIcon icon={faTag} className="me-2" />
      {bookTag.name}
    </Badge>
  ));

  return (
    <Container>
      <Row className="m-5">
        <Col
          xs={12}
          lg={5}
          className="d-flex flex-column justify-content-between p-4"
        >
          <div>
            <p>
              <FontAwesomeIcon icon={faBook} className="me-2" />
              Book
            </p>
            <h2 className="fs-1 fw-bold mb-4">{book.title}</h2>
            <h3 className="fs-2 fw-normal mb-4">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              {book.author}
            </h3>
            {book.edition && (
              <h4 className="fw-lighter fst-italic">
                <FontAwesomeIcon icon={faPenNib} className="me-2" />
                {book.edition}
              </h4>
            )}
          </div>
          <div className="mt-5">
            <Button
              variant={`outline-${readStatusButtonColorMap[book.readStatus]}`}
              size="md"
              disabled
              className="w-100"
            >
              <FontAwesomeIcon
                icon={readStatusIconMap[book.readStatus]}
                className="me-2"
              />
              {readStatusTextMap[book.readStatus]}
            </Button>
          </div>
        </Col>
        <Col
          xs={12}
          lg={7}
          className="d-flex flex-column justify-content-between p-4"
        >
          <Row className="mb-5">
            <Col>
              <Card className="shadow">
                <Card.Header>
                  <FontAwesomeIcon icon={faLayerGroup} className="me-2" />
                  Category
                </Card.Header>
                <Card.Body>
                  <Card.Title>{book.bookCategory.name}</Card.Title>
                  <Card.Text>{bookTagBadges}</Card.Text>
                  <Card.Link
                    as={Link}
                    to={`/categories/${book.bookCategory.id}`}
                    className="fw-lighter"
                  >
                    Go to category
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs={12} md={6} className="text-muted">
              <small>Last edited: {updatedAt}</small>
              <br />
              <small>Added on: {createdAt}</small>
            </Col>
            <Col xs={12} md={6} className="d-flex justify-content-end gap-4 ">
              <EditBookModal
                show={editBookModalShow}
                onHide={() => setEditBookModalShow(false)}
                book={book}
              />
              <ButtonGroup>
                <Button
                  variant="outline-info"
                  onClick={() => setEditBookModalShow(true)}
                >
                  <FontAwesomeIcon icon={faPencil} className="me-2" />
                  Edit Book
                </Button>
                <Button variant="outline-danger" onClick={handleDelete}>
                  <FontAwesomeIcon icon={faTrash} className="me-2" />
                  Delete Book
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="m-5 shadow">
            <Card.Header>
              <FontAwesomeIcon icon={faNoteSticky} className="me-2" />
              Notes
            </Card.Header>
            <Card.Body>
              {book.notes ? (
                <Card.Text className="preserve-newlines">
                  {book.notes}
                </Card.Text>
              ) : (
                <Card.Text className="text-muted">
                  Edit book to add notes...
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

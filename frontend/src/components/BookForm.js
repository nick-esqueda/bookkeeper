import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookCategoriesAsync } from "../features/bookCategories/bookCategoriesSlice";
import { createBookAsync, editBookAsync } from "../features/books/booksSlice";
import { useNavigate } from "react-router-dom";
import BookFormData from "../models/BookFormData";

const BookForm = ({ onHide, book }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookCategories = useSelector((state) => state.bookCategories.entities);
  const bookCategoryIds = useSelector((state) => state.bookCategories.ids);
  const loading = useSelector((state) => state.bookCategories.loading);
  const error = useSelector((state) => state.bookCategories.error);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(
    book ? BookFormData.createFromBook(book) : BookFormData.createEmpty()
  );

  useEffect(() => {
    dispatch(fetchBookCategoriesAsync());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (book) {
      handleEdit();
    } else {
      handleCreate();
    }
  };

  const handleCreate = async () => {
    try {
      const createdBook = await dispatch(createBookAsync(formData));
      onHide();
      navigate(`/books/${createdBook.id}`);
    } catch (error) {
      alert("Uh-oh, something went wrong. Please tell Nick Bug! \n\n" + error);
    }
  };

  const handleEdit = async () => {
    try {
      await dispatch(editBookAsync(formData));
      onHide();
    } catch (error) {
      alert("Uh-oh, something went wrong. Please tell Nick Bug! \n\n" + error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formAddBookTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide a title.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formAddBookAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter author"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide an author.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formAddBookEdition">
            <Form.Label>Edition</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter edition (optional)"
              name="edition"
              value={formData.edition}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formAddBookCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select
              required
              name="bookCategoryId"
              value={formData.bookCategoryId}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select a category
              </option>
              {bookCategoryIds.map((id) => (
                <option key={id} value={bookCategories[id].id}>
                  {bookCategories[id].name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please choose a category.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="formAddBookReadStatus">
        <Form.Label>Read Status</Form.Label>
        <div>
          <Form.Check
            required
            type="radio"
            id="read-status-read"
            name="readStatus"
            value="READ"
            label="Read"
            checked={formData.readStatus === "READ"}
            onChange={handleChange}
            inline
          />
          <Form.Check
            required
            type="radio"
            id="read-status-unread"
            name="readStatus"
            value="UNREAD"
            label="Unread"
            checked={formData.readStatus === "UNREAD"}
            onChange={handleChange}
            inline
          />
          <Form.Check
            required
            type="radio"
            id="read-status-dnf"
            name="readStatus"
            value="DID_NOT_FINISH"
            label="DNF"
            checked={formData.readStatus === "DID_NOT_FINISH"}
            onChange={handleChange}
            inline
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAddBookNotes">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter book notes (optional)"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </Form.Group>

      <div className="d-flex justify-content-end mt-4">
        <Button variant="outline-danger" onClick={onHide}>
          Exit
        </Button>
        <Button variant="success" type="submit" className="ms-3">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default BookForm;

import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookCategoriesAsync } from "../../features/bookCategories/bookCategoriesSlice";
import {
  createBookAsync,
  editBookAsync,
} from "../../features/books/booksSlice";
import { useNavigate } from "react-router-dom";
import BookFormData from "../../models/BookFormData";
import { handleFormChange } from "../../utils/formUtils";
import LoadingSpinner from "../utils/LoadingSpinner";
import { fetchBookTagsAsync } from "../../features/bookTags/bookTagsSlice";
import BookTagMultiSelectInput from "./BookTagMultiSelectInput";
import {
  faBook,
  faCircleHalfStroke,
  faLayerGroup,
  faPenNib,
  faTags,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faNoteSticky } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BookForm = ({ onHide, book }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    entities: bookCategories,
    ids: bookCategoryIds,
    loading,
    error,
  } = useSelector((state) => state.bookCategories);

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(
    book ? BookFormData.createFromBook(book) : BookFormData.createEmpty()
  );

  useEffect(() => {
    dispatch(fetchBookCategoriesAsync());
    dispatch(fetchBookTagsAsync());
  }, [dispatch]);

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

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row>
        <Col lg={6} className="mb-3">
          <Form.Group controlId="formAddBookTitle">
            <Form.Label>
              <FontAwesomeIcon icon={faBook} className="me-2" />
              Title
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter title"
              name="title"
              value={formData.title}
              onChange={handleFormChange(setFormData)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide a title.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col lg={6} className="mb-3">
          <Form.Group controlId="formAddBookAuthor">
            <Form.Label>
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Author
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter author"
              name="author"
              value={formData.author}
              onChange={handleFormChange(setFormData)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide an author.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col lg={6} className="mb-3">
          <Form.Group controlId="formAddBookEdition">
            <Form.Label>
              <FontAwesomeIcon icon={faPenNib} className="me-2" />
              Edition
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter edition (optional)"
              name="edition"
              value={formData.edition}
              onChange={handleFormChange(setFormData)}
            />
          </Form.Group>
        </Col>
        <Col lg={6} className="mb-3">
          <Form.Group controlId="formAddBookCategory">
            <Form.Label>
              <FontAwesomeIcon icon={faLayerGroup} className="me-2" />
              Category
            </Form.Label>
            <Form.Select
              required
              name="bookCategoryId"
              value={formData.bookCategoryId}
              onChange={handleFormChange(setFormData)}
            >
              <option value="" disabled>
                Select a category
              </option>
              {bookCategoryIds.map((id) => (
                <option key={id} value={id}>
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

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formAddBookReadStatus">
            <Form.Label>
              <FontAwesomeIcon icon={faCircleHalfStroke} className="me-2" />
              Read Status
            </Form.Label>
            <div>
              <Form.Check
                required
                type="radio"
                id="read-status-read"
                name="readStatus"
                value="READ"
                label="Read"
                checked={formData.readStatus === "READ"}
                onChange={handleFormChange(setFormData)}
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
                onChange={handleFormChange(setFormData)}
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
                onChange={handleFormChange(setFormData)}
                inline
              />
            </div>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formAddBookTags">
            <Form.Label>
              <FontAwesomeIcon icon={faTags} className="me-2" />
              Tags
            </Form.Label>
            <BookTagMultiSelectInput
              valueIds={formData.bookTagIds}
              setFormData={setFormData}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="formAddBookNotes">
        <Form.Label>
          <FontAwesomeIcon icon={faNoteSticky} className="me-2" />
          Notes
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter book notes (optional)"
          name="notes"
          value={formData.notes}
          onChange={handleFormChange(setFormData)}
        />
      </Form.Group>

      <div className="d-flex justify-content-end mt-4">
        <Button variant="outline-danger" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="success" type="submit" className="ms-3">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default BookForm;

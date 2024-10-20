import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TagFormData from "../../models/TagFormData";
import {
  createBookTagAsync,
  editBookTagAsync,
} from "../../features/bookTags/bookTagsSlice";
import { Button, Col, Form, Row } from "react-bootstrap";
import { handleFormChange } from "../../utils/formUtils";

const TagForm = ({ onHide, booktag: bookTag }) => {
  const dispatch = useDispatch();

  const [isValidated, setIsValidated] = useState(false);
  const [formData, setFormData] = useState(
    bookTag ? TagFormData.createFromTag(bookTag) : TagFormData.createEmpty()
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setIsValidated(true);
      return;
    }

    if (bookTag) {
      handleEdit(formData);
    } else {
      handleCreate(formData);
    }
  };

  const handleCreate = async (bookTag) => {
    try {
      await dispatch(createBookTagAsync(bookTag));
      onHide();
    } catch (error) {
      alert("Uh-oh, something went wrong. Please tell Nick Bug! \n\n" + error);
    }
  };

  const handleEdit = async (bookTag) => {
    try {
      await dispatch(editBookTagAsync(bookTag));
      onHide();
    } catch (error) {
      alert("Uh-oh, something went wrong. Please tell Nick Bug! \n\n" + error);
    }
  };

  return (
    <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group controlId="formCreateTagName">
            <Form.Control
              required
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleFormChange(setFormData)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide a name.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
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

export default TagForm;

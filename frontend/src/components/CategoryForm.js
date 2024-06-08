import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { handleFormChange } from "../utils/formUtils";
import { useDispatch } from "react-redux";
import { createBookCategoryAsync } from "../features/bookCategories/bookCategoriesSlice";

const CategoryForm = ({ onHide }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: "" });
  const [isValidated, setIsValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setIsValidated(true);
      return;
    }

    handleCreate(formData);
  };

  const handleCreate = async (category) => {
    try {
      await dispatch(createBookCategoryAsync(category));
      onHide();
    } catch (error) {
      alert("Uh-oh, something went wrong. Please tell Nick Bug! \n\n" + error);
    }
  };

  return (
    <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group controlId="formCreateCategoryName">
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

export default CategoryForm;

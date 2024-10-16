import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { handleFormChange } from "../utils/formUtils";
import { useDispatch } from "react-redux";
import {
  createBookCategoryAsync,
  editBookCategoryAsync,
} from "../features/bookCategories/bookCategoriesSlice";
import CategoryFormData from "../models/CategoryFormData";

const CategoryForm = ({ onHide, category }) => {
  const dispatch = useDispatch();

  const [isValidated, setIsValidated] = useState(false);
  const [formData, setFormData] = useState(
    category
      ? CategoryFormData.createFromCategory(category)
      : CategoryFormData.createEmpty()
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setIsValidated(true);
      return;
    }

    if (category) {
      handleEdit(formData);
    } else {
      handleCreate(formData);
    }
  };

  const handleCreate = async (category) => {
    try {
      const createdCategory = await dispatch(createBookCategoryAsync(category));
      onHide();
    } catch (error) {
      alert("Uh-oh, something went wrong. Please tell Nick Bug! \n\n" + error);
    }
  };

  const handleEdit = async (category) => {
    try {
      await dispatch(editBookCategoryAsync(category));
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

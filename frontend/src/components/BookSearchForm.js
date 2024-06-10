import React, { useEffect } from "react";
import { Col, Form, FormLabel, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { readStatusTextMap } from "../utils/dataTransformationUtils";
import { fetchBookCategoriesAsync } from "../features/bookCategories/bookCategoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { handleFormChange } from "../utils/formUtils";
import LoadingSpinner from "./LoadingSpinner";

const BookSearchForm = ({ formData, setFormData }) => {
  const dispatch = useDispatch();

  const {
    entities: bookCategories,
    ids: bookCategoryIds,
    loading,
    error,
  } = useSelector((state) => state.bookCategories);

  useEffect(() => {
    dispatch(fetchBookCategoriesAsync());
  }, [dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (loading) {
    return <LoadingSpinner fixed={false} />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Form onSubmit={onSubmit}>
      <Row className="align-items-center">
        <Col xs="auto" className="mb-3">
          <Form.Group controlId="formSearchQuery">
            <FormLabel className="text-muted fw-lighter">Search</FormLabel>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control
                required
                type="search"
                placeholder="Search here..."
                name="query"
                value={formData.query}
                onChange={handleFormChange(setFormData)}
              />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col xs="auto" className="mb-3">
          <Form.Group controlId="formSearchBookCategoryId">
            <FormLabel className="text-muted fw-lighter">
              Category filter
            </FormLabel>
            <Form.Select
              name="bookCategoryId"
              value={formData.bookCategoryId}
              onChange={handleFormChange(setFormData)}
            >
              <option value="" className="text-muted">
                Any
              </option>
              {bookCategoryIds.map((id) => (
                <option key={id} value={id}>
                  {bookCategories[id].name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs="auto" className="mb-3">
          <Form.Group controlId="formSearchReadStatus">
            <FormLabel className="text-muted fw-lighter">Read status</FormLabel>
            <Form.Select
              name="readStatus"
              value={formData.readStatus}
              onChange={handleFormChange(setFormData)}
            >
              <option value="" className="text-muted">
                Any
              </option>
              {Object.keys(readStatusTextMap).map((readStatus) => (
                <option key={readStatus} value={readStatus}>
                  {readStatusTextMap[readStatus]}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs="auto" className="mb-3">
          <Form.Group controlId="formSearchSortBy">
            <FormLabel className="text-muted fw-lighter">Sort by</FormLabel>
            <Form.Select
              name="sortBy"
              value={formData.sortBy}
              onChange={handleFormChange(setFormData)}
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="edition">Edition</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs="auto" className="mb-3">
          <Form.Group controlId="formSearchSortDir">
            <FormLabel className="text-muted fw-lighter">Sort order</FormLabel>
            <Form.Select
              name="sortDir"
              value={formData.sortDir}
              onChange={handleFormChange(setFormData)}
            >
              <option value="asc">Normal</option>
              <option value="desc">Reverse</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default BookSearchForm;

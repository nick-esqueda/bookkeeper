import React, { useEffect } from "react";
import { Button, Col, Form, FormLabel, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownAZ,
  faCircleHalfStroke,
  faLayerGroup,
  faRotate,
  faSearch,
  faSort,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { readStatusTextMap } from "../utils/dataTransformationUtils";
import { fetchBookCategoriesAsync } from "../features/bookCategories/bookCategoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { handleFormChange } from "../utils/formUtils";
import LoadingSpinner from "./LoadingSpinner";
import SearchFormData from "../models/SearchFormData";
import BookTagMultiSelectInput from "./BookTagMultiSelectInput";
import { fetchBookTagsAsync } from "../features/bookTags/bookTagsSlice";

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
    dispatch(fetchBookTagsAsync());
  }, [dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const resetFormData = () => {
    setFormData(SearchFormData.createDefault());
  };

  if (loading) {
    return <LoadingSpinner fixed={false} />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formSearchQuery" className="mb-3">
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
      <Form.Group controlId="formSearchBookCategoryId" className="mb-3">
        <FormLabel className="text-muted fw-lighter">
          <FontAwesomeIcon icon={faLayerGroup} className="me-2" />
          Category
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
      <Form.Group controlId="formSearchReadStatus" className="mb-3">
        <FormLabel className="text-muted fw-lighter">
          <FontAwesomeIcon icon={faCircleHalfStroke} className="me-2" />
          Read status
        </FormLabel>
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
      <Form.Group controlId="formSearchBookTagIds" className="mb-3">
        <FormLabel className="text-muted fw-lighter">
          <FontAwesomeIcon icon={faTags} className="me-2" />
          Tags
        </FormLabel>
        <BookTagMultiSelectInput
          valueIds={formData.bookTagIds}
          setFormData={setFormData}
        />
      </Form.Group>
      <Form.Group controlId="formSearchSortBy" className="mb-3">
        <FormLabel className="text-muted fw-lighter">
          <FontAwesomeIcon icon={faSort} className="me-2" />
          Sort by
        </FormLabel>
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
      <Form.Group controlId="formSearchSortDir" className="mb-3">
        <FormLabel className="text-muted fw-lighter">
          <FontAwesomeIcon icon={faArrowDownAZ} className="me-2" />
          Sort order
        </FormLabel>
        <Form.Select
          name="sortDir"
          value={formData.sortDir}
          onChange={handleFormChange(setFormData)}
        >
          <option value="asc">Normal</option>
          <option value="desc">Reverse</option>
        </Form.Select>
      </Form.Group>
      <Button
        variant="link"
        className="fw-light text-decoration-none"
        onClick={resetFormData}
      >
        <FontAwesomeIcon icon={faRotate} className="me-2" />
        Reset
      </Button>
    </Form>
  );
};

export default BookSearchForm;

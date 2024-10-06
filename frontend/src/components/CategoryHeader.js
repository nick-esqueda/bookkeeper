import {
  faCircleCheck,
  faCircleHalfStroke,
  faCircleNotch,
  faListOl,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Badge, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookCategoryAsync } from "../features/bookCategories/bookCategoriesSlice";
import LoadingSpinner from "./LoadingSpinner";
import EditCategoryModal from "./EditCategoryModal";

const CategoryStats = ({ id }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const category = useSelector((state) => state.bookCategories.entities[id]);
  const { loading, error } = useSelector((state) => state.bookCategories);

  useEffect(() => {
    dispatch(fetchBookCategoryAsync(id));
  }, [dispatch, id]);

  if (loading || !category) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Col className="text-center">
      <h2>{category.name}</h2>
      <p>All books in the {category.name} category.</p>

      <div>
        <p className="d-flex justify-content-center gap-3">
          <Badge bg="success">
            <FontAwesomeIcon icon={faCircleCheck} className="me-2" />
            {category.readBookCount} Read
          </Badge>
          <Badge bg="danger">
            <FontAwesomeIcon icon={faCircleNotch} className="me-2" />
            {category.unreadBookCount} Unread
          </Badge>
          <Badge bg="warning" text="dark">
            <FontAwesomeIcon icon={faCircleHalfStroke} className="me-2" />
            {category.didNotFinishBookCount} DNF
          </Badge>
        </p>

        <p className="d-flex justify-content-center gap-3">
          <Badge bg="primary">
            <FontAwesomeIcon icon={faListOl} className="me-2" />
            {category.totalBookCount} Total
          </Badge>
          <Badge bg="secondary">
            <FontAwesomeIcon icon={faUser} className="me-2" />
            {category.authorCount} Authors
          </Badge>
        </p>
      </div>

      <Button variant="link" size="sm" onClick={() => setShowModal(true)}>
        Edit name
      </Button>
      <EditCategoryModal
        show={showModal}
        onHide={() => setShowModal(false)}
        category={category}
      />
    </Col>
  );
};

export default CategoryStats;

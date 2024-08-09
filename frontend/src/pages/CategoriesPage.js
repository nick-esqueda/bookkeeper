import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";
import CreateCategoryModal from "../components/CreateCategoryModal";
import CategoryList from "../components/CategoryList";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CategoriesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const loading = useSelector((state) => state.bookCategories.loading);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="mb-4">Categories</h2>
        </Col>
        <Col className="text-end">
          <Button variant="outline-primary" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faCirclePlus} className="me-2" />
            Add Category
          </Button>
        </Col>
      </Row>

      <CategoryList />

      {!loading && (
        <Row>
          <Col className="d-flex justify-content-center">
            <Button
              variant="outline-primary"
              size="lg"
              className="w-50 m-5"
              onClick={() => setShowModal(true)}
            >
              <FontAwesomeIcon icon={faCirclePlus} className="me-2" />
              Add Category
            </Button>
          </Col>
        </Row>
      )}

      <CreateCategoryModal
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </Container>
  );
};

export default CategoriesPage;

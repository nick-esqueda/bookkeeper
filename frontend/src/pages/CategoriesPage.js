import React, { useState } from "react";
import { useSelector, } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";
import CreateCategoryModal from "../components/CreateCategoryModal";
import CategoryList from "../components/CategoryList";

const CategoriesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const loading = useSelector((state) => state.bookCategories.loading);

  return (
    <Container>
      <h2 className="text-center mb-4">Categories</h2>

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
              Create Category
            </Button>
            <CreateCategoryModal
              show={showModal}
              onHide={() => setShowModal(false)}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CategoriesPage;

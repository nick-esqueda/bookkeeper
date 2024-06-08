import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBookCategoriesAsync } from "../features/bookCategories/bookCategoriesSlice";
import CategoryCard from "../components/CategoryCard";
import { Button, Col, Container, Row } from "react-bootstrap";
import CreateCategoryModal from "../components/CreateCategoryModal";
import LoadingSpinner from "../components/LoadingSpinner";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const bookCategoryIds = useSelector((state) => state.bookCategories.ids);
  const loading = useSelector((state) => state.bookCategories.loading);
  const error = useSelector((state) => state.bookCategories.error);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchBookCategoriesAsync());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      <h2>Book Categories</h2>
      <p className="text-muted">Click a category to view it's books.</p>
      <Row>
        {bookCategoryIds.map((id) => (
          <Col key={id} xs={12} sm={12} md={6} lg={6} className="mt-4 p-3">
            <CategoryCard key={id} categoryId={id} />
          </Col>
        ))}
      </Row>

      <Row>
        <Col className="d-flex justify-content-center">
          <Button
            variant="outline-primary"
            size="lg"
            className="w-50 m-5 shadow-lg"
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
    </Container>
  );
};

export default CategoriesPage;

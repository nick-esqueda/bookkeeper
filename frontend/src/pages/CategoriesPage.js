import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBookCategoriesAsync } from "../features/bookCategories/bookCategoriesSlice";
import CategoryCard from "../components/CategoryCard";
import { Col, Container, Row } from "react-bootstrap";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const bookCategoryIds = useSelector((state) => state.bookCategories.ids);
  const loading = useSelector((state) => state.bookCategories.loading);
  const error = useSelector((state) => state.bookCategories.error);

  useEffect(() => {
    dispatch(fetchBookCategoriesAsync());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
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
          <Col key={id} xs={12} sm={12} md={6} lg={6} className="mt-4 p-4">
            <CategoryCard key={id} categoryId={id} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoriesPage;

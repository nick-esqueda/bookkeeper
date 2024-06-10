import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import CategoryCard from "./CategoryCard";
import { fetchBookCategoriesAsync } from "../features/bookCategories/bookCategoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";

const CategoryList = () => {
  const dispatch = useDispatch();
  const {
    ids: bookCategoryIds,
    loading,
    error,
  } = useSelector((state) => state.bookCategories);

  useEffect(() => {
    dispatch(fetchBookCategoriesAsync());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Row>
      {bookCategoryIds.map((id) => (
        <Col key={id} xs={12} sm={12} md={6} lg={6} className="mt-4 p-3">
          <CategoryCard key={id} categoryId={id} />
        </Col>
      ))}
    </Row>
  );
};

export default CategoryList;

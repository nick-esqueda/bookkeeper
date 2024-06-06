import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBookCategoryAsync } from "../features/bookCategories/bookCategoriesSlice";
import BookList from "../components/BookList";

const CategoryPage = () => {
  // show all the books in a category. edit the category
  // MVP: list all books in a grid. edit/delete category functionality.
  // GOAL: page through books. sort books by title/author/etc.

  const { categoryId } = useParams();
  const dispatch = useDispatch();

  const { entities, loading, error } = useSelector(
    (state) => state.bookCategories
  );
  const category = entities[categoryId];

  useEffect(() => {
    dispatch(fetchBookCategoryAsync(categoryId));
  }, [dispatch, categoryId]);

  if (loading || !category) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      <h2 className="text-center">{category.name}</h2>
      <p className="text-center">All books in the {category.name} category.</p>

      <Row>
        <BookList queryParams={{ bookCategoryId: categoryId }} />
      </Row>
    </Container>
  );
};

export default CategoryPage;

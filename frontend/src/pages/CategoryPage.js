import React from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import BookList from "../components/BookList";
import CategoryHeader from "../components/CategoryHeader";

const CategoryPage = () => {
  // show all the books in a category. edit the category
  // MVP: list all books in a grid. edit/delete category functionality.
  // GOAL: page through books. sort books by title/author/etc.

  const { categoryId } = useParams();

  return (
    <Container className="mt-5">
      <Row>
        <CategoryHeader id={categoryId} />
      </Row>

      <Row>
        <BookList queryParams={{ bookCategoryId: categoryId }} />
      </Row>
    </Container>
  );
};

export default CategoryPage;

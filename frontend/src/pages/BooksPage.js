import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooksAsync } from "../features/books/booksSlice";
import { Col, Container, Row } from "react-bootstrap";
import BookCard from "../components/BookCard";

const BooksPage = () => {
  // show and find books in the inventory.
  // MVP: list all books, search through books, filter by category & read status
  // GOAL: searching, sorting, filtering, pagination, page sizes

  const dispatch = useDispatch();
  const bookIds = useSelector((state) => state.books.ids);
  const loading = useSelector((state) => state.bookCategories.loading);
  const error = useSelector((state) => state.bookCategories.error);

  useEffect(() => {
    dispatch(fetchBooksAsync());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <h2>Books</h2>
      <p>Click a book to see it's details.</p>
      <Row>
        {bookIds.map((id) => (
          <Col key={id} xs={12} sm={6} md={4} lg={3} className="mt-4 p-3">
            <BookCard key={id} bookId={id} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BooksPage;

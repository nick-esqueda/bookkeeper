import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBookCategoryAsync } from "../features/bookCategories/bookCategoriesSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import BookCard from "../components/BookCard";
import {
  fetchBooksAsync,
  fetchBooksNextPageAsync,
} from "../features/books/booksSlice";

const CategoryPage = () => {
  // show all the books in a category. edit the category
  // MVP: list all books in a grid. edit/delete category functionality.
  // GOAL: page through books. sort books by title/author/etc.

  // TODO: test going from books page to this page.
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const category = useSelector(
    (state) => state.bookCategories.entities[categoryId]
  );
  const loading = useSelector((state) => state.bookCategories.loading);
  const error = useSelector((state) => state.bookCategories.error);
  const {
    ids: bookIds,
    nextPageNum,
    hasNextPage,
  } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBookCategoryAsync(categoryId));
    dispatch(fetchBooksAsync({ bookCategoryId: categoryId }));
  }, [dispatch, categoryId]);

  const fetchMoreData = () => {
    setTimeout(() => {
      dispatch(
        fetchBooksNextPageAsync({
          bookCategoryId: categoryId,
          pageNum: nextPageNum,
        })
      );
    }, 500);
  };

  if (loading || !category) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <h2>{category.name}</h2>
      <p>
        All books in the {category.name} category.
        <br />
        Click View Book to see it's details.
      </p>

      <Row>
        <InfiniteScroll
          dataLength={bookIds.length}
          next={fetchMoreData}
          hasMore={hasNextPage}
          loader={
            <p className="mt-5 mb-5 text-center text-muted">Loading...</p>
          }
          endMessage={
            <p className="mt-5 mb-5 text-center text-muted">
              Total results: {bookIds.length}
            </p>
          }
          style={{ overflow: "visible" }}
        >
          <Row>
            {bookIds.map((id) => (
              <Col key={id} xs={12} sm={6} md={4} lg={3} className="p-3">
                <BookCard key={id} bookId={id} />
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      </Row>
    </Container>
  );
};

export default CategoryPage;

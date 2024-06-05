import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBooksAsync,
  fetchBooksNextPageAsync,
} from "../features/books/booksSlice";
import BookCard from "../components/BookCard";
import BookSearchForm from "../components/BookSearchForm";
import { Col, Container, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

const BooksPage = () => {
  const dispatch = useDispatch();

  const {
    ids: bookIds,
    hasNextPage,
    nextPageNum,
    error,
  } = useSelector((state) => state.books);

  const [searchOptions, setSearchOptions] = useState({
    query: "",
    bookCategoryId: "",
    readStatus: "",
    sortBy: "title",
    sortDir: "asc",
  });

  useEffect(() => {
    dispatch(fetchBooksAsync({ ...searchOptions }));
  }, [dispatch, searchOptions]);

  const fetchMoreData = () => {
    setTimeout(() => {
      dispatch(
        fetchBooksNextPageAsync({
          ...searchOptions,
          pageNum: nextPageNum,
        })
      );
    }, 500);
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <Row className="mb-5 border-bottom">
        <h2>Books</h2>
        <p>
          Use the search, filter, and sort options to find books.
          <br />
          Click View Book to see it's details.
        </p>
      </Row>

      <Row>
        <BookSearchForm
          formData={searchOptions}
          setFormData={setSearchOptions}
        />
      </Row>

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

export default BooksPage;

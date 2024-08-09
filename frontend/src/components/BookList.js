import React, { useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import BookCard from "./BookCard";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllBooks,
  fetchBooksAsync,
  fetchBooksNextPageAsync,
} from "../features/books/booksSlice";

const BookList = ({ queryParams }) => {
  const dispatch = useDispatch();

  const {
    ids: bookIds,
    hasNextPage,
    nextPageNum,
    loading,
    error,
  } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooksAsync(queryParams));
    return () => dispatch(clearAllBooks());
  }, [dispatch, queryParams]);

  const fetchNextPage = () => {
    dispatch(
      fetchBooksNextPageAsync({
        ...queryParams,
        pageNum: nextPageNum,
      })
    );
  };

  const loadingSpinner = (
    <div className="w-100 text-center mt-3 p-5">
      <Spinner animation="border" />
    </div>
  );

  if (!bookIds.length && !loading) {
    return <small className="mt-4 text-center text-muted">No results</small>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <InfiniteScroll
      dataLength={bookIds.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={loadingSpinner}
      className="mb-5"
      style={{ overflow: "visible" }}
    >
      <Row>
        {bookIds.map((id) => (
          <Col key={id} xs={12} sm={6} md={4} lg={4} className="p-4">
            <BookCard key={id} bookId={id} />
          </Col>
        ))}
      </Row>
    </InfiniteScroll>
  );
};

export default BookList;

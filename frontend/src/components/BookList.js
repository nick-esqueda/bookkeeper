import React, { useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import BookCard from "./BookCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBooksAsync,
  fetchBooksNextPageAsync,
} from "../features/books/booksSlice";

const BookList = ({ queryParams }) => {
  const dispatch = useDispatch();

  const {
    ids: bookIds,
    hasNextPage,
    nextPageNum,
    error,
  } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooksAsync(queryParams));
  }, [dispatch, queryParams]);

  const fetchNextPage = () => {
    setTimeout(() => {
      dispatch(
        fetchBooksNextPageAsync({
          ...queryParams,
          pageNum: nextPageNum,
        })
      );
    }, 500);
  };

  const loadingSpinner = (
    <div className="w-100 text-center mt-5 mb-3 p-5">
      <Spinner animation="border" />
    </div>
  );

  const endMessage = (
    <p className="mt-5 mb-5 text-center text-muted">
      Total results: {bookIds.length}
    </p>
  );

  if (!bookIds.length) {
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
      endMessage={endMessage}
      style={{ overflow: "visible" }}
    >
      <Row>
        {bookIds.map((id) => (
          <Col key={id} xs={12} sm={6} md={4} lg={3} className="p-4">
            <BookCard key={id} bookId={id} />
          </Col>
        ))}
      </Row>
    </InfiniteScroll>
  );
};

export default BookList;

import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
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

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <InfiniteScroll
      dataLength={bookIds.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<p className="mt-5 mb-5 text-center text-muted">Loading...</p>}
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
  );
};

export default BookList;

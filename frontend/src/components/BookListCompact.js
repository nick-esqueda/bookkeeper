import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllBooks,
  fetchBooksAsync,
  fetchBooksNextPageAsync,
} from "../features/books/booksSlice";
import BookCardCompact from "./BookCardCompact";
import BookCardCompactPlaceholders from "./BookCardCompactPlaceholders";

const BookListCompact = ({ queryParams }) => {
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

  if (loading) {
    <BookCardCompactPlaceholders />;
  }

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
      loader={<BookCardCompactPlaceholders />}
      style={{ overflow: "visible" }}
    >
      <Row>
        {bookIds.map((id) => (
          <BookCardCompact key={id} bookId={id} />
        ))}
      </Row>
    </InfiniteScroll>
  );
};

export default BookListCompact;

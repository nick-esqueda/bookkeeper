import React, { useState } from "react";
import BookSearchForm from "../components/BookSearchForm";
import { Col, Container, Row } from "react-bootstrap";
import BookList from "../components/BookList";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";

const defaultSearchOptions = {
  query: "",
  bookCategoryId: "",
  readStatus: "",
  sortBy: "title",
  sortDir: "asc",
};

const BooksPage = () => {
  const { totalResults, loading } = useSelector((state) => state.books);
  const [searchOptions, setSearchOptions] = useState(defaultSearchOptions);

  const resultCount = (
    <small className="text-muted">
      {totalResults} {totalResults === 1 ? "result" : "results"}
    </small>
  );

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

      <Row style={{ minHeight: "86px" }}>
        <Col>
          <BookSearchForm
            formData={searchOptions}
            setFormData={setSearchOptions}
          />
        </Col>
      </Row>

      <Row className="ps-2" style={{ minHeight: "2em" }}>
        <Col className="d-flex align-items-end">
          {loading ? <LoadingSpinner fixed={false} size="sm" /> : resultCount}
        </Col>
      </Row>

      <Row>
        <BookList queryParams={searchOptions} />
      </Row>
    </Container>
  );
};

export default BooksPage;

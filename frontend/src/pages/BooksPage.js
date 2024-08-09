import React, { useState } from "react";
import BookSearchForm from "../components/BookSearchForm";
import { Col, Container, Row } from "react-bootstrap";
import BookList from "../components/BookList";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchFormData from "../models/SearchFormData";

const BooksPage = () => {
  const { totalResults, loading } = useSelector((state) => state.books);
  const [searchOptions, setSearchOptions] = useState(
    SearchFormData.createDefault()
  );

  const resultCount = (
    <small className="text-muted">
      {totalResults} {totalResults === 1 ? "result" : "results"}
    </small>
  );

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <h2>Books</h2>
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

import React, { useState } from "react";
import BookSearchForm from "../components/BookSearchForm";
import { Col, Container, Row } from "react-bootstrap";
import BookList from "../components/BookList";
import { useSelector } from "react-redux";

const defaultSearchOptions = {
  query: "",
  bookCategoryId: "",
  readStatus: "",
  sortBy: "title",
  sortDir: "asc",
};

const BooksPage = () => {
  const totalResults = useSelector((state) => state.books.totalResults);
  const [searchOptions, setSearchOptions] = useState(defaultSearchOptions);

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
        <Col>
          <BookSearchForm
            formData={searchOptions}
            setFormData={setSearchOptions}
          />
        </Col>
      </Row>

      <Row className="p-2">
        <Col className="text-start">
          <small className="text-muted">
            {totalResults} {totalResults === 1 ? "result" : "results"}
          </small>
        </Col>
      </Row>

      <Row>
        <BookList queryParams={searchOptions} />
      </Row>
    </Container>
  );
};

export default BooksPage;

import React, { useState } from "react";
import BookSearchForm from "../components/BookSearchForm";
import { Container, Row } from "react-bootstrap";
import BookList from "../components/BookList";

const defaultSearchOptions = {
  query: "",
  bookCategoryId: "",
  readStatus: "",
  sortBy: "title",
  sortDir: "asc",
};

const BooksPage = () => {
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
        <BookSearchForm
          formData={searchOptions}
          setFormData={setSearchOptions}
        />
      </Row>

      <Row>
        <BookList queryParams={searchOptions} />
      </Row>
    </Container>
  );
};

export default BooksPage;

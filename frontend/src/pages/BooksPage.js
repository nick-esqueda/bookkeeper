import React, { useState } from "react";
import BookSearchForm from "../components/BookSearchForm";
import { Card, Col, Container, Row } from "react-bootstrap";
import BookList from "../components/BookList";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchFormData from "../models/SearchFormData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import StatCards from "../components/StatCards";

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
      <Row>
        <Col>
          <div className="island">
            <Row>
              <h3>Books</h3>
            </Row>
            <StatCards />
          </div>
        </Col>
      </Row>

      <Row>
        <Col sm={3}>
          <div className="island">
            <h5 className="mb-3">Filters</h5>
            <BookSearchForm
              formData={searchOptions}
              setFormData={setSearchOptions}
            />

            <div>
              {loading ? (
                <LoadingSpinner fixed={false} size="sm" className="text-end" />
              ) : (
                <div className="w100 text-center">{resultCount}</div>
              )}
            </div>
          </div>
        </Col>

        <Col>
          <div className="island">
            <BookList queryParams={searchOptions} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BooksPage;

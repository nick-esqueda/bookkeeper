import React, { useState } from "react";
import { Button, Col, Container, Placeholder, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import BookList from "../components/lists/BookList";
import BookSearchForm from "../components/forms/BookSearchForm";
import SearchFormData from "../models/SearchFormData";
import BookPageStatCards from "../components/pageSpecific/BooksPageStatCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

const BooksPage = () => {
  const { totalResults, loading } = useSelector((state) => state.books);
  const [searchOptions, setSearchOptions] = useState(
    SearchFormData.createDefault()
  );

  const resetFormData = () => {
    setSearchOptions(SearchFormData.createDefault());
  };

  const resultCount = (
    <div className="text-end">
      <small className="text-muted">
        {totalResults} {totalResults === 1 ? "result" : "results"}
      </small>
    </div>
  );

  const resultCountPlaceholder = (
    <Placeholder animation="glow" as="div" className="text-end">
      <Placeholder sm={7} />
    </Placeholder>
  );

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <div className="island">
            <Row>
              <h3>Books</h3>
            </Row>
            <BookPageStatCards />
          </div>
        </Col>
      </Row>

      <Row>
        <Col sm={3} className="sticky-col">
          <div className="island">
            <Row>
              <h5 className="mb-3">Filters</h5>
            </Row>

            <Row>
              <BookSearchForm
                formData={searchOptions}
                setFormData={setSearchOptions}
              />
            </Row>

            <Row>
              <Col>
                <Button
                  variant="link"
                  className="fw-light text-decoration-none ps-0"
                  onClick={resetFormData}
                >
                  <FontAwesomeIcon icon={faRotate} className="me-2" />
                  Reset
                </Button>
              </Col>
              <Col className="m-auto">
                {loading ? resultCountPlaceholder : resultCount}
              </Col>
            </Row>
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

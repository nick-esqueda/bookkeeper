import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CategoryList from "../components/CategoryList";
import CategoryStatCards from "../components/CategoryStatCards";
import BookListCompact from "../components/BookListCompact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import CreateCategoryModal from "../components/CreateCategoryModal";
import BookCardCompactPlaceholders from "../components/BookCardCompactPlaceholders";

const CategoriesPage = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <Container className="mt-5">
      <CreateCategoryModal
        show={showModal}
        onHide={() => setShowModal(false)}
      />

      <Row>
        <Col>
          <h2>Categories</h2>
          <p>Select a category to view books & details</p>
        </Col>
        <Col className="text-end pt-1">
          <Button variant="outline-primary" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faCirclePlus} className="me-2" />
            Add Category
          </Button>
        </Col>
      </Row>

      <Row className="island mt-3">
        <Col sm={3} className="border-end border-2 mt-3">
          <CategoryList
            activeCategoryId={activeCategoryId}
            setActiveCategoryId={setActiveCategoryId}
          />
        </Col>

        <Col className="ps-5">
          <Row className="mb-3">
            <CategoryStatCards categoryId={activeCategoryId} />
          </Row>

          <Row>
            {!activeCategoryId ? (
              <BookCardCompactPlaceholders />
            ) : (
              <BookListCompact
                queryParams={{ bookCategoryId: activeCategoryId }}
              />
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoriesPage;

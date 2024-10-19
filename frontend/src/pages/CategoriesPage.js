import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CategoryList from "../components/lists/CategoryList";
import CategoryPageStatCards from "../components/pageSpecific/CategoryPageStatCards";
import BookListCompact from "../components/lists/BookListCompact";
import CreateCategoryModal from "../components/modals/CreateCategoryModal";
import CategoryHeader from "../components/pageSpecific/CategoryHeader";
import { fetchBookCategoriesAsync } from "../features/bookCategories/bookCategoriesSlice";
import { clearAllBooks, fetchBooksAsync } from "../features/books/booksSlice";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  let { categoryId } = useParams();
  categoryId = Number(categoryId || 0);

  const { ids, loading } = useSelector((state) => state.bookCategories);

  const [activeCategoryId, setActiveCategoryId] = useState(categoryId);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchBookCategoriesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (activeCategoryId) {
      dispatch(fetchBooksAsync({ bookCategoryId: activeCategoryId }));
    }
    return () => dispatch(clearAllBooks());
  }, [dispatch, activeCategoryId]);

  useEffect(() => {
    // set active category as the first in the list (after loading) if none was set
    // scenario: navigating to /categories from header (without path param)
    if (!activeCategoryId && !loading && ids.length > 0) {
      setActiveCategoryId(ids[0]);
    }
  }, [activeCategoryId, ids, loading]);

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
          <Row>
            <Col>
              <CategoryHeader categoryId={activeCategoryId} />
            </Col>
          </Row>

          <Row className="mb-3">
            <CategoryPageStatCards categoryId={activeCategoryId} />
          </Row>

          <Row>
            <BookListCompact
              queryParams={{ bookCategoryId: activeCategoryId }}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoriesPage;

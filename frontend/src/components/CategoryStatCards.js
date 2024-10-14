import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { readStatusIconMap } from "../utils/dataTransformationUtils";
import LoadingSpinner from "./LoadingSpinner";

const CategoryStatCards = ({ categoryId }) => {
  const category = useSelector(
    (state) => state.bookCategories.entities[categoryId]
  );

  if (!category) {
    return <LoadingSpinner fixed={false} />;
  }

  const {
    totalBookCount,
    readBookCount,
    unreadBookCount,
    didNotFinishBookCount,
  } = category;

  return (
    <Row>
      <Col sm={3}>
        <div className="stat-card bg-primary text-light shadow-sm">
          <p>Total Books</p>
          <div>
            <FontAwesomeIcon icon={faBook} className="fs-1" />
            <span className="fs-2 ms-4">{totalBookCount}</span>
          </div>
        </div>
      </Col>
      <Col sm={3}>
        <div className="stat-card bg-success text-light shadow-sm">
          <p>Read Books</p>
          <div className="fs-2">
            <FontAwesomeIcon icon={readStatusIconMap["READ"]} />
            <span className="ms-4">{readBookCount}</span>
          </div>
        </div>
      </Col>
      <Col sm={3}>
        <div className="stat-card border-danger text-danger shadow-sm">
          <p>Unread Books</p>
          <div className="fs-2">
            <FontAwesomeIcon icon={readStatusIconMap["UNREAD"]} />
            <span className="ms-4">{unreadBookCount}</span>
          </div>
        </div>
      </Col>
      <Col sm={3}>
        <div className="stat-card border-warning text-warning shadow-sm">
          <p>DNF Books</p>
          <div className="fs-2">
            <FontAwesomeIcon icon={readStatusIconMap["DID_NOT_FINISH"]} />
            <span className="ms-4">{didNotFinishBookCount}</span>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CategoryStatCards;

import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col } from "react-bootstrap";

const TotalBooksStatCard = ({ count, size = 2 }) => {
  return (
    <Col sm={size}>
      <div className="stat-card bg-primary text-light shadow-sm">
        <p>Total Books</p>
        <div>
          <FontAwesomeIcon icon={faBook} className="fs-1" />
          <span className="fs-2 ms-4">{count}</span>
        </div>
      </div>
    </Col>
  );
};

export default TotalBooksStatCard;

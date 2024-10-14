import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col } from "react-bootstrap";
import { readStatusIconMap } from "../../utils/dataTransformationUtils";

const ReadBooksStatCard = ({ count, size = 2 }) => {
  return (
    <Col sm={size}>
      <div className="stat-card bg-success text-light shadow-sm">
        <p>Read Books</p>
        <div className="fs-2">
          <FontAwesomeIcon icon={readStatusIconMap["READ"]} />
          <span className="ms-4">{count}</span>
        </div>
      </div>
    </Col>
  );
};

export default ReadBooksStatCard;

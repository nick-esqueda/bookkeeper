import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col } from "react-bootstrap";
import { readStatusIconMap } from "../../utils/dataTransformationUtils";

const UnreadBooksStatCard = ({ count, size = 2 }) => {
  return (
    <Col sm={size}>
      <div className="stat-card border-danger text-danger shadow-sm">
        <p>Unread Books</p>
        <div className="fs-2">
          <FontAwesomeIcon icon={readStatusIconMap["UNREAD"]} />
          <span className="ms-4">{count}</span>
        </div>
      </div>
    </Col>
  );
};

export default UnreadBooksStatCard;
